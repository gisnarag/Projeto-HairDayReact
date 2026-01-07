import { cx, cva, type VariantProps } from "class-variance-authority";

export const ServicePeriodListVariants = cva("text-gray-300")

type ServicePeriod = "morning" | "afternoon" | "night";

interface ServicePeriodListProps extends React.ComponentProps<"ul">, VariantProps<typeof ServicePeriodListVariants> {
    period?: ServicePeriod
    label: string
}

export default function ServicePeriodList({ period, label, className, ...props }: ServicePeriodListProps) {
    return (
        <ul {...props} data-period={period} className={cx(ServicePeriodListVariants(), className)}>
            {label}
        </ul>
    )
}