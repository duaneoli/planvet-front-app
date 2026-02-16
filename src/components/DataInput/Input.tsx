interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input(props: InputProps) {
  return (
    <div className="space-y-1 w-full flex flex-col">
      <label className="label uppercase text-xs font-bold text-slate-400 tracking-tight">
        {props.label}
      </label>
      <label className="input w-full bg-slate-50 outline-none focus:ring-2 transition-all text-slate-700">
        {props.icon}
        <input {...props} />
      </label>
      {props.error && <p className="text-[10px] text-rose-500 font-medium ml-1">{props.error}</p>}
    </div>
  );
}
