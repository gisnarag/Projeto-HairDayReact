import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const InputVariants = cva("", {
    variants: {
        size: {
            md: "h-6 flex-1 min-w-25"
        },
    },
    defaultVariants: {
        size: "md"
    }
})

interface InputProps extends Omit<React.ComponentProps<"input">, 'size'>, VariantProps<typeof InputVariants> { }

export default function Input({ size, className, ...props }: InputProps) {
    return (
        <input className={InputVariants({ size, className })} {...props} />
    )
}

