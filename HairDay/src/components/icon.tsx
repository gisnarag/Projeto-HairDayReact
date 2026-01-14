import { cx, cva, type VariantProps } from "class-variance-authority";
import React from "react";

export const IconVariants = cva("shrink-0", {
    variants: {
        animate: {
            false: "",
            true: "animate-pulse fill-yellow"
        },
    },
    defaultVariants: {
        animate: false
    }
})

interface IconProps extends React.ComponentProps<"svg">, VariantProps<typeof IconVariants> {
    svg: React.FC<React.ComponentProps<"svg">>
}

export default function Icon({ svg: SvgComponent, animate, className, ...props }: IconProps) {
    return <SvgComponent className={cx(IconVariants({ animate, className }), className)} {...props} />
}