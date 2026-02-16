import { UseContractService } from "@/api/use/UseContract";
import Button from "@/components/Button";
import { delay } from "@/hooks/functions";
import { CheckCircle2, ChevronLeft, CircleX, Dog, FileText, Loader2, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function StepFive(props: { data: any; onNext: () => void; onPrevius: () => void }) {
  const [status, setStatus] = useState<
    Record<"user" | "pet" | "contract", "idle" | "loading" | "success" | "error">
  >({
    user: "idle", // 'idle' | 'loading' | 'success' | 'error'
    pet: "idle",
    contract: "idle",
  });

  const stages: Array<{ id: keyof typeof status; label: string; icon: React.ReactNode }> = [
    { id: "user", label: "Criando conta do Tutor", icon: <User size={20} /> },
    { id: "pet", label: `Registrando o pet ${props.data.petName}`, icon: <Dog size={20} /> },
    { id: "contract", label: "Gerando contrato e apólice", icon: <FileText size={20} /> },
  ];

  const { mutateAsync } = UseContractService.useCreate();

  const handleFinalSubmit = async (formData: any) => {
    try {
      const backendPromise = mutateAsync(formData);

      setStatus((prev) => ({ ...prev, user: "loading" }));
      await delay(2000);
      setStatus((prev) => ({ ...prev, user: "success", pet: "loading" }));

      await delay(2000);
      setStatus((prev) => ({ ...prev, pet: "success", contract: "loading" }));

      await delay(2000);
      await backendPromise;
      setStatus((prev) => ({ ...prev, contract: "success" }));
      toast.success("Contrato criado com sucesso!", { id: "main-action-toast" });

      await delay(1000);
      props.onNext();
    } catch (error) {
      // Trata erro em qualquer etapa
      setStatus({ user: "error", pet: "error", contract: "error" });
      toast.error("Error ao criar o contrato", { id: "main-action-toast", closeButton: true });
    }
  };

  useEffect(() => {
    handleFinalSubmit({});
  }, []);

  return (
    <div className="space-y-12 py-6 animate-in fade-in duration-500">
      <div className="text-center space-y-4">
        <div className="inline-flex relative">
          <div className="w-28 h-28 bg-white rounded-[2.5rem] border-4 border-slate-50 flex items-center justify-center text-emerald-600 shadow-xl relative z-10 overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-50/50 animate-pulse"></div>
            <div className="relative z-20">
              {status.user === "loading" ? (
                <User size={48} className="animate-in slide-in-from-bottom-4" />
              ) : status.pet === "loading" ? (
                <Dog size={48} className="animate-in slide-in-from-bottom-4" />
              ) : (
                <FileText size={48} className="animate-in slide-in-from-bottom-4" />
              )}
            </div>
          </div>
          <div className="absolute -inset-2 rounded-[3rem] border-2 border-dashed border-emerald-200 animate-[spin_10s_linear_infinite]"></div>
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight italic">
            Segurança em primeiro lugar
          </h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-2">
            <Loader2 size={12} className="animate-spin" /> Processando dados vitais
          </p>
        </div>
      </div>

      <div className="space-y-4 max-w-sm mx-auto">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-1000 
              ${status[stage.id] === "idle" ? "bg-white border-slate-100 opacity-60" : ""} 
              ${status[stage.id] === "loading" ? "bg-emerald-50 border-emerald-200 shadow-md translate-x-2" : ""} 
              ${status[stage.id] === "success" ? "bg-emerald-200 border-emerald-500 shadow-md translate-x-2" : ""} 
              ${status[stage.id] === "error" ? "bg-rose-50 border-rose-200 shadow-md translate-x-2" : ""}
              `}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 
                ${status[stage.id] === "idle" ? "bg-slate-100 text-slate-400" : ""} 
              ${status[stage.id] === "loading" ? "bg-emerald-100 text-emerald-600 animate-bounce" : ""} 
              ${status[stage.id] === "success" ? "bg-emerald-600 text-white shadow-lg" : ""} 
              ${status[stage.id] === "error" ? "bg-rose-300 text-white shadow-lg" : ""}
              `}
            >
              {status[stage.id] === "success" ? (
                <CheckCircle2 size={24} />
              ) : status[stage.id] === "error" ? (
                <CircleX size={24} />
              ) : (
                stage.icon
              )}
            </div>
            <div className="flex-1">
              <span
                className={`text-sm font-black uppercase tracking-tight block
                  ${status[stage.id] === "idle" ? "text-emerald-400" : ""} 
                  ${status[stage.id] === "loading" ? "text-emerald-950" : ""} 
                  ${status[stage.id] === "success" ? "text-emerald-700" : ""} 
                  ${status[stage.id] === "error" ? "text-rose-500" : ""}
               `}
              >
                {stage.label}
              </span>
              {status[stage.id] === "loading" && (
                <div className="h-1.5 w-full bg-emerald-100 rounded-full mt-2 overflow-hidden shadow-inner">
                  <div className="h-full bg-emerald-600 animate-[progress_1s_ease-in-out_infinite]"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {Object.values(status).some((it) => it === "error") && (
        <Button icon={<ChevronLeft size={20} />} onClick={props.onPrevius}>
          Revisar Dados
        </Button>
      )}
    </div>
  );
}
