#!/usr/bin/env bash
set -euo pipefail

# =============================================================================
# deploy.sh — Build, upload to S3 and invalidate CloudFront
# =============================================================================
# Pré-requisitos:
#   - AWS CLI configurado (aws configure ou variáveis de ambiente)
#   - jq instalado (opcional, usado apenas para checar identidade)
#
# Uso:
#   chmod +x deploy.sh
#   ./deploy.sh
#
# Ou sobrescrevendo as variáveis:
#   S3_BUCKET=meu-bucket CLOUDFRONT_ID=ABCDEFG ./deploy.sh
# =============================================================================

# ── Configuração ──────────────────────────────────────────────────────────────
S3_BUCKET="${S3_BUCKET:-SEU_BUCKET_AQUI}"           # ex: planvet-front-app-prod
CLOUDFRONT_ID="${CLOUDFRONT_ID:-SEU_DISTRIBUTION_ID}" # ex: E1XXXXXXXXXXXXXXX
BUILD_DIR="${BUILD_DIR:-dist}"                        # pasta de saída do vite build
AWS_REGION="${AWS_REGION:-us-east-1}"
# ─────────────────────────────────────────────────────────────────────────────

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()   { echo -e "${CYAN}[INFO]${NC}  $*"; }
ok()    { echo -e "${GREEN}[OK]${NC}    $*"; }
warn()  { echo -e "${YELLOW}[WARN]${NC}  $*"; }
die()   { echo -e "${RED}[ERROR]${NC} $*" >&2; exit 1; }

# Validações básicas
[[ "$S3_BUCKET"      == "SEU_BUCKET_AQUI"          ]] && die "Defina a variável S3_BUCKET antes de continuar."
[[ "$CLOUDFRONT_ID"  == "SEU_DISTRIBUTION_ID"      ]] && die "Defina a variável CLOUDFRONT_ID antes de continuar."

command -v aws  >/dev/null 2>&1 || die "AWS CLI não encontrada. Instale com: pip install awscli"
command -v yarn >/dev/null 2>&1 || die "yarn não encontrado."

log "Identidade AWS:"
aws sts get-caller-identity --region "$AWS_REGION" 2>/dev/null || warn "Não foi possível verificar identidade AWS."

# ── 1. Build ──────────────────────────────────────────────────────────────────
log "Buildando aplicação..."
yarn build
ok "Build concluído → ./${BUILD_DIR}"

# ── 2. Upload para S3 ─────────────────────────────────────────────────────────
log "Enviando ./${BUILD_DIR} para s3://${S3_BUCKET}..."

# Arquivos com hash no nome: cache longo (1 ano)
aws s3 sync "./${BUILD_DIR}" "s3://${S3_BUCKET}" \
  --region "$AWS_REGION" \
  --delete \
  --cache-control "public, max-age=31536000, immutable" \
  --exclude "index.html" \
  --exclude "*.txt" \
  --exclude "*.json"

# index.html e arquivos sem hash: sem cache (sempre busca nova versão)
aws s3 sync "./${BUILD_DIR}" "s3://${S3_BUCKET}" \
  --region "$AWS_REGION" \
  --cache-control "no-cache, no-store, must-revalidate" \
  --include "index.html" \
  --include "*.txt" \
  --include "*.json"

ok "Upload concluído."

# ── 3. Invalidação do CloudFront ─────────────────────────────────────────────
log "Criando invalidação no CloudFront (${CLOUDFRONT_ID})..."

INVALIDATION_ID=$(aws cloudfront create-invalidation \
  --distribution-id "$CLOUDFRONT_ID" \
  --paths "/*" \
  --query "Invalidation.Id" \
  --output text)

ok "Invalidação criada: ${INVALIDATION_ID}"

# Aguarda a propagação (opcional — pode comentar se preferir não esperar)
log "Aguardando propagação da invalidação... (pode levar alguns minutos)"
aws cloudfront wait invalidation-completed \
  --distribution-id "$CLOUDFRONT_ID" \
  --id "$INVALIDATION_ID"

ok "Propagação concluída!"
echo ""
echo -e "${GREEN}✔ Deploy finalizado com sucesso!${NC}"
echo "  Bucket:        s3://${S3_BUCKET}"
echo "  Distribution:  ${CLOUDFRONT_ID}"
echo "  Invalidação:   ${INVALIDATION_ID}"
