import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const TextVariants = cva("font-sans", {
    variants: {
        variant: {
            "page-title": "text-3xl leading-6 font-bold",
            "title-md": "text-base leading-6 font-bold",
            "title-sm": "text-sm leading-5 font-bold",
            "body-text-md": "text-base leading-6",
            "body-text-sm": "text-sm leading-5",
        },
    },
    defaultVariants: {
        variant: "body-text-md",
    }
})

interface TextProps extends VariantProps<typeof TextVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
}

export default function Text({ as = "span", variant, className, children, ...props }: TextProps) {
    return React.createElement(
        as,
        {
            className: TextVariants({ variant, className }),
            ...props
        },
        children
    );
}