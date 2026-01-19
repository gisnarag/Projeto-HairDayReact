import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const ButtonItemVariants = cva("cursor-pointer", {
    variants: {
        appearance: {
            primary: "bg-gray-500 hover:bg-gray-400 border border-gray-400 rounded-sm",
        },
        size: {
            sm: "w-20 h-10",
        },
        selected: {
            true: "text-yellow border-yellow",
            false: "text-gray-200 border-gray-200",
        },
        disabled: {
            true: "pointer-events-none border-gray-200 text-shadow-gray-200 opacity-50",
        },
    },
    defaultVariants: {
        appearance: "primary",
        size: "sm",
        selected: false,
        disabled: false,
    }
})

interface ButtonItemProps extends Omit<React.ComponentProps<"button">, 'size'>, VariantProps<typeof ButtonItemVariants> {
    disabled?: boolean,
}

export default function ButtonItem({ appearance, size, selected, disabled, children, className, ...props }: ButtonItemProps) {
    return (
        <button type="button" disabled={disabled}
            {...props}
            className={ButtonItemVariants({ appearance, size, selected, disabled })}>{children}</button>
    )
}
