import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

export const TextVariants = cva("font-sans", {
    variants: {
        variant: {
            "page-title": "text-2xl leading-6 font-bold",
            "title-md": "text-base leading-6 font-bold",
            "title-sm": "text-sm leading-5 font-bold",
            "body-text-md": "text-base leading-6",
            "body-text-sm": "text-sm leading-5",
        },
        appearance: {
            primary: "text-gray-900",
            secondary: "text-gray-200",
            tertiary: "text-gray-400",
            inverse: "text-white"
        },
        cursor: {
            default: "cursor-default",
            pointer: "cursor-pointer",
        }
    },
    defaultVariants: {
        variant: "body-text-md",
        appearance: "primary",
        cursor: "default",
    }
})

interface TextProps extends VariantProps<typeof TextVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode;
}

export default function Text({ as = "span", variant, cursor, className, children, appearance, ...props }: TextProps) {
    return React.createElement(
        as,
        {
            className: TextVariants({ variant, appearance, cursor, className }),
            ...props
        },
        children
    );
}