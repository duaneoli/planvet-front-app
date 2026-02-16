import React from "react";

interface StepProps {
  steps: Array<{
    icon: React.ReactNode;
    label: string;
  }>;
  currentStep: number;
}

export function Step(props: StepProps) {
  return (
    <div className="flex items-center justify-between mb-8 max-w-sm mx-auto">
      {props.steps.map((step, i) => (
        <React.Fragment key={"step" + i}>
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-500 ${
                props.currentStep > i
                  ? "bg-azul-600 text-white shadow-lg shadow-azul-200"
                  : "bg-slate-200 text-slate-400"
              }`}
            >
              {props.currentStep > i ? step.icon : i + 1}
            </div>
            <span
              className={`text-[10px] mt-2 font-bold uppercase tracking-tighter ${props.currentStep > i ? "text-azul-700" : "text-slate-400"}`}
            >
              {step.label}
            </span>
          </div>
          {i < props.steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 -mt-6 rounded-full transition-colors duration-500 ${
                props.currentStep - 1 > i ? "bg-azul-600" : "bg-slate-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
