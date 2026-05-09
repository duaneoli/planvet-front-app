# Planvet Front-end — Diretrizes para o Claude

## Divisão de responsabilidades

### Não modificar `src/api/planvet/`
Essa pasta (serviços, DTOs, client axios) é mantida exclusivamente pelo Claude com acesso ao back-end (assas-gateway), que conhece o contrato real dos endpoints. Alterações feitas aqui pelo Claude do front podem entrar em conflito com o back-end.

Se uma tarefa exigir mudança em `src/api/planvet/`, apontar o que precisa mudar e pedir ao usuário que delegue ao Claude do back-end.

### Responsabilidade do front-end Claude
- `src/pages/`
- `src/components/`
- `src/context/`
- `src/hooks/` — incluindo `src/hooks/planvet/` que contém os React Query hooks (UseUser, UseAnimal, UseContract, UseInvoice, UsePayment, UseBreed, UseSpecies, Register)
