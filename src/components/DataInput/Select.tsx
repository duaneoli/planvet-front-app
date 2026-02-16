import { SelectHTMLAttributes } from "react";

export function Select(
  props: {
    label: string;
    options: Array<{ label: string; value: string | number }>;
    placeholder: string;
    errorsMessage?: string;
  } & SelectHTMLAttributes<HTMLSelectElement>
) {
  return (
    <div className="space-y-1 flex flex-col">
      <label className="text-xs font-bold text-slate-400 uppercase ml-1">{props.label}</label>
      <select
        className={`select w-full bg-slate-50 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 ${props.errorsMessage ? "border-rose-300" : "border-slate-200"}`}
        {...props}
      >
        <option disabled selected className="text-slate-400" key="option-placehold" value="">
          {props.placeholder}
        </option>
        {props.options.map(({ label, value }) => (
          <option key={label + value} value={value} className="text-slate-800">
            {label}
          </option>
        ))}
      </select>
      {props.errorsMessage && (
        <p className="text-[10px] text-rose-500 font-medium ml-1">{props.errorsMessage}</p>
      )}
    </div>
  );
}
