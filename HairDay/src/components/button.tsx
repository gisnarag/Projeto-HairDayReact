import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Text from "./text";

export const buttonVariantsProps = cva("flex items-center justify-center cursor-pointer transition rounded-lg border", {
    variants: {
        variant: {
            primary: "bg-yellow border-yellow hover:border-yellow-light"
        },
        size: {
            md: "h-3 py-7 px-7"
        },
        disabled: {
            true: "opacity-50 border-transparent pointer-events-none "
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
        disabled: false
    }
})

interface ButtonProps extends Omit<React.ComponentProps<"button">, 'size' | 'disabled'>, VariantProps<typeof buttonVariantsProps> { }

// CVA sempre vai no className para aplicar estilo.
export default function Button({ variant, size, disabled, className, children, ...props }: ButtonProps) {

    return (

        <button
            {...props}
            className={buttonVariantsProps({ variant, size, disabled, className })} > {children} < Text variant="title-md" cursor="pointer"> AGENDAR</Text></button >
    )
}   