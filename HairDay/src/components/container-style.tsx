import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const ContainerStyleVariants = cva("", {
    variants: {
        variant: {
            primary: "flex justify-between pr-6 border-b border-b-gray-400 rounded-sm w-190 bg-gray-600",
            secondary: "flex w-80 h-14 gap-3 px-3 py-4 bg-gray-600 rounded-md border border-gray-400 focus-within:border-yellow",
            sm: "flex w-40 h-14 gap-3 px-3 py-4 bg-gray-600 rounded-md border border-gray-400 focus-within:border-yellow",
        }
    },
    defaultVariants: {
        variant: "primary",
    }
})

interface ContainerStyleProps extends React.ComponentProps<"div">, VariantProps<typeof ContainerStyleVariants> { }

export default function ContainerStyle({ children, variant, className, ...props }: ContainerStyleProps) {
    return <div {...props} className={ContainerStyleVariants({ variant, className })}>{children}</div>
} 