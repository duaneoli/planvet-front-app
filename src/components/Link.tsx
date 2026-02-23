import { LinkProps, Link as LinkReactDom } from "react-router-dom";

export function Link(props: {} & LinkProps) {
  return (
    <LinkReactDom
      className="text-azul-600 font-black hover:underline tracking-tight ml-1"
      {...props}
    >
      {props.children}
    </LinkReactDom>
  );
}
