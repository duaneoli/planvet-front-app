import { Loader2 } from "lucide-react";

type LoaderProps = {
  message: string;
};

export function Loader(props: LoaderProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="animate-spin text-azul-600 mx-auto" size={48} />
        <p className="text-slate-500 font-medium animate-pulse">{props.message}</p>
      </div>
    </div>
  );
}
