import { Card } from "@/components/Card";
import { Link } from "@/components/Link";
import { Step } from "@/components/Step";
import { StepFive } from "@/pages/public/SignUp/StepFive";
import { StepFour } from "@/pages/public/SignUp/StepFour";
import { StepOne } from "@/pages/public/SignUp/StepOne";
import { StepSeven } from "@/pages/public/SignUp/StepSeven";
import { StepSix } from "@/pages/public/SignUp/StepSix";
import { StepThree } from "@/pages/public/SignUp/StepThree";
import { StepTwo } from "@/pages/public/SignUp/StepTwo";
import { DueDateType, PaymentMethodType } from "@/types";
import { Banknote, Check, Contact, Dog, FileText, ShieldCheck, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(7);
  const [isFinalizing, setIsFinalizing] = useState(true);
  const [info, setInfo] = useState<{
    email?: string;
    cpf?: string;
    fullName?: string;
    password?: string;
    confirmPassword?: string;
    petName?: string;
    petBirthDate?: string;
    petSpecies?: any;
    petBreed?: string;
    paymentMethod?: PaymentMethodType;
    dueDate?: DueDateType | undefined | null;
  }>({
    email: "duane@duane.com",
    cpf: "376.709.628-52",
    fullName: "Duane Silva",
    password: "Senha@123",
    confirmPassword: "Senha@123",
    petName: "Rex",
    petBirthDate: "2018-06-15",
    paymentMethod: "Boleto",
  });

  const onSubmit = async (data: typeof info) => {
    setIsFinalizing(true);
    setStep(5);
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const previousStep = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    if (step < 8) return;
    navigate("/dashboard");
  }, [step]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-3">
            <div className="bg-azul-600 p-2.5 rounded-2xl text-white shadow-xl rotate-3">
              <Dog size={28} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight">PlanVet</h2>
          </div>
        </div>

        {!isFinalizing ? (
          <Step
            steps={[
              { icon: <Dog size={20} />, label: "Tutor" },
              { icon: <ShieldCheck size={20} />, label: "Senha" },
              { icon: <Check size={20} />, label: "Pet" },
              { icon: <Check size={20} />, label: "Plano" },
            ]}
            currentStep={step}
          />
        ) : (
          <Step
            steps={[
              { icon: <FileText size={20} />, label: "Contrato" },
              { icon: <Contact size={20} />, label: "Endereço" },
              { icon: <Banknote size={20} />, label: "Pagamento" },
            ]}
            currentStep={step - 4}
          />
        )}

        <Card>
          {step === 1 && (
            <StepOne
              defaultValues={info}
              onNext={(data) => {
                setInfo({ ...info, ...data });
                nextStep();
              }}
            />
          )}
          {step == 2 && (
            <StepTwo
              defaultValues={info}
              onNext={(data) => {
                setInfo({ ...info, ...data });
                setStep(3);
              }}
              onPrevious={previousStep}
            />
          )}
          {step === 3 && (
            <StepThree
              defaultValues={info}
              onNext={(data) => {
                console.log(data);
                setInfo({ ...info, ...data });
                setStep(4);
              }}
              onPrevious={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <StepFour
              defaultValues={info as typeof info & { petName: string }}
              onNext={(data) => {
                setInfo({ ...info, ...data });
                onSubmit({ ...info, ...data });
              }}
              onPrevious={(data) => {
                setInfo({ ...info, ...data });
                setStep(3);
              }}
            />
          )}
          {step === 5 && (
            <StepFive data={info} onNext={() => setStep(6)} onPrevius={() => setStep(4)} />
          )}
          {step === 6 && <StepSix onNext={() => setStep(7)} />}
          {step === 7 && (
            <StepSeven
              onPrevious={() => setStep(6)}
              onNext={() => setStep(8)}
              paymentMethod={info.paymentMethod}
            />
          )}
          {step === 8 && (
            <div className="flex flex-col items-center justify-center space-y-8 py-12 animate-in zoom-in duration-700 text-center">
              <div className="relative">
                <div className="w-28 h-28 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-200 z-10 relative">
                  <Check
                    size={64}
                    strokeWidth={4}
                    className="animate-in zoom-in duration-500 delay-200"
                  />
                </div>
                <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-25 -z-10"></div>
                <div className="absolute inset-[-10px] bg-emerald-100 rounded-full animate-pulse -z-20"></div>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-800 tracking-tighter">PARABÉNS!</h2>
                <p className="text-slate-500 font-medium">
                  A proteção para <strong>{info.petName}</strong> foi ativada.
                </p>
              </div>

              <div className="bg-emerald-50 px-6 py-3 rounded-2xl flex items-center gap-3 text-emerald-700 font-bold border border-emerald-100">
                <Sparkles size={20} className="text-amber-500 animate-spin" />
                <span>Redirecionando para sua conta...</span>
              </div>
            </div>
          )}
        </Card>

        {!isFinalizing && (
          <div className="mt-8 text-center space-y-6">
            <div className="pt-6 border-slate-200">
              <p className="text-sm text-slate-600 font-medium">
                Já possui o plano? <Link to="/login">ENTRAR AGORA</Link>
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default SignUp;
