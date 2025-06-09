import React from "react";
type BotaoProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Botao({ children, ...props }: BotaoProps) {
  return (
    <button
      className={
        "bg-green-900 text-white rounded py-2 font-bold hover:bg-green-800 transition " +
        (props.className || "")
      }
      {...props}
    >
      {children}
    </button>
  );
}
