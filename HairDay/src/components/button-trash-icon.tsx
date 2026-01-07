import { cx, cva, type VariantProps } from "class-variance-authority";
import Icon from "./icon";
import React from "react";

export const ButtonTrashIconIconVariants = cva("fill-yellow hover:fill-yellow-dark")

interface ButtonTrashIconProps extends Omit<React.ComponentProps<"button">, 'size' | 'disabled'>, VariantProps<typeof ButtonTrashIconIconVariants> {
    icon: React.ComponentProps<typeof Icon>["svg"]
}

export default function ButtonTrashIcon({ className, icon: icon, ...props }: ButtonTrashIconProps) {
    return (
        <button className={cx("cursor-pointer", className)} type="button" {...props}>
            <Icon svg={icon} className={ButtonTrashIconIconVariants()} />
        </button>
    )
}