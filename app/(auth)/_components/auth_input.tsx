import * as React from "react";

import { cn } from "@/lib/utils";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  id: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, register, id, errors, ...props }, ref) => {
    return (
      <input
        autoComplete={id}
        type={type}
        disabled={props.disabled}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
          errors ? errors[id] && "focus:ring-rose-600" : "",
          props.disabled && "opacity-50 cursor-default"
        )}
        {...props}
        {...register(id, { required: props.required })}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
