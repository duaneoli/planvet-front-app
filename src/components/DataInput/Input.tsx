import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, ...props }, ref) => {
    return (
      <div className="space-y-1 w-full flex flex-col">
        {label && (
          <label className="label uppercase text-xs font-bold text-slate-400 tracking-tight">
            {label}
          </label>
        )}
        <label className="input w-full bg-slate-50 outline-none focus:ring-2 transition-all text-slate-700">
          {icon}
          <input 
            ref={ref} 
            {...props}
            value={props.value === null ? "" : props.value} 
          />
        </label>
        {error && <p className="text-[10px] text-rose-500 font-medium ml-1">{error}</p>}
      </div>
    );
  }
);
