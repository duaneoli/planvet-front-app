import { forwardRef, SelectHTMLAttributes } from "react";

export const Select = forwardRef<
  HTMLSelectElement,
  {
    label: string;
    options: Array<{ label: string; value: string | number }>;
    placeholder: string;
    errorsMessage?: string;
  } & SelectHTMLAttributes<HTMLSelectElement>
>((props, ref) => {
  const { label, options, placeholder, errorsMessage, value, ...rest } = props;

  return (
    <div className="space-y-1 flex flex-col">
      <label className="text-xs font-bold text-slate-400 uppercase ml-1">{label}</label>
      <select
        ref={ref}
        className={`select w-full bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
          errorsMessage ? "border-rose-300" : "border-slate-200"
        }`}
        value={value !== undefined && value !== null ? String(value) : ""}
        {...rest}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={String(option.label) + String(option.value)}
            value={String(option.value)}
            className="text-slate-800"
          >
            {option.label}
          </option>
        ))}
      </select>
      {errorsMessage && (
        <p className="text-[10px] text-rose-500 font-medium ml-1">{errorsMessage}</p>
      )}
    </div>
  );
});
