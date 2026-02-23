export function Card(props: { children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-slate-100 relative overflow-hidden min-h-[300px] flex flex-col justify-center transition-all duration-500">
      {props.children}
    </div>
  );
}
