import { cn } from "@/lib/utils";
import { ReactElement } from "react";

interface ButtonProps {
  label: ReactElement;
  secondary?: boolean;
  fullWidh?: boolean;
  large?: boolean;
  disabled?: boolean;
  outline?: boolean;
  classNames?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const Button = ({
  label,
  disabled,
  secondary,
  fullWidh,
  large,
  onClick,
  outline,
  type,
  classNames,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type={type}
      className={cn(
        "rounded-full font-semibold border transition hover:opacity-80 disabled:opacity-70 disabled:cursor-not-allowed",
        fullWidh ? "w-full" : "w-fit",
        secondary ? "bg-white text-black" : "bg-sky-500 text-white",
        large ? "text-xl px-5 py-3" : " text-md px-4 py-3",
        outline
          ? "bg-transparent border-slate-600 text-sky-500 hover:bg-slate-800/40"
          : "",
        classNames
      )}
    >
      {label}
    </button>
  );
};

export default Button;
