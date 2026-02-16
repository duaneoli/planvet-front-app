import Button from "@/components/Button";

export function Form(props: {
  handleSubmit: (data: any) => void;
  children: React.ReactNode;
  rigthButton?: {
    isLoading?: boolean;
    text: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    disabled?: boolean;
  };
  leftButton?: {
    text: string;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  };
}) {
  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.handleSubmit(e);
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-in fade-in duration-500">
      {props.children}
      <div className="flex gap-4 pt-4">
        {props.leftButton && (
          <Button
            type="button"
            variant="white"
            isLoading={props.leftButton.isLoading}
            onClick={props.leftButton.onClick}
            className="button flex-1 py-4 px-6 rounded-2xl border-2 border-slate-100 text-slate-500 font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            {props.leftButton.iconLeft}
            <span>{props.leftButton.text}</span>
            {props.leftButton.iconRight}
          </Button>
        )}
        {props.rigthButton && (
          <Button
            type="submit"
            isLoading={props.rigthButton.isLoading}
            variant="primary"
            size="lg"
            className="button flex-[2] font-bold transition-all flex items-center justify-center"
          >
            {props.rigthButton.iconLeft}
            <span>{props.rigthButton.text}</span>
            {props.rigthButton.iconRight}
          </Button>
        )}
      </div>
    </form>
  );
}
