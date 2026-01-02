import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const InputVariants = cva("", {
    variants: {
        size: {
            md: "w-70 h-6 rounded-sm"
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

