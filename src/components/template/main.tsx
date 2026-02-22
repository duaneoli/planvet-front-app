import React from "react";

export function Main(props: { children: React.ReactNode; title: string; description: string }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">{props.title}</h2>
        <p className="text-slate-500 text-sm">{props.description}</p>
      </div>
      {props.children}
    </div>
  );
}
