import type React from "react";
import Text from "./text";
import { cx, cva, type VariantProps } from "class-variance-authority";

export const ScheduleItemVariants = cva("flex px-5 gap-10 bg-gray-600")

interface ScheduleItemProps extends React.ComponentProps<"li">, VariantProps<typeof ScheduleItemVariants> { client?: string, hour?: string }

export default function ScheduleItem({ children, className, client, hour, ...props }: ScheduleItemProps) {
    return (
        <li {...props} className={cx(ScheduleItemVariants(), className)}>
            <Text appearance="secondary" variant="title-md" className="mt-5 mb-5">{hour}</Text>
            <Text as="p" appearance="secondary" className="mt-5 mb-5">{client}</Text>
            {children}
        </li>
    )
}