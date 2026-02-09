
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, icon, error, className = '', ...props }) => {
  return (
    <div className="space-y-1 w-full">
      {label && <label className="block text-xs font-bold text-slate-400 uppercase tracking-tight ml-1">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-slate-50 border rounded-xl outline-none focus:ring-2 transition-all text-slate-700
            ${icon ? 'pl-10 pr-4' : 'px-4'}
            ${error ? 'border-rose-300 focus:ring-rose-500' : 'border-slate-200 focus:ring-emerald-500'}
            ${props.disabled ? 'cursor-not-allowed opacity-60 bg-slate-100' : 'py-2.5'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-[10px] text-rose-500 font-medium ml-1">{error}</p>}
    </div>
  );
};

export default Input;
