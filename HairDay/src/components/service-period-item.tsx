import React from "react";
import { openingHours } from "../utils/opening-hours";
import ButtonItem from "./button-item";

type ServicePeriodItem = "morning" | "afternoon" | "night"
type OpeningHour = typeof openingHours[number]

interface ServicePeriodItemProps extends React.ComponentProps<"li"> {
    period: ServicePeriodItem,
    hour?: OpeningHour[]
}

export default function ServicePeriodItem({ period, className, ...props }: ServicePeriodItemProps) {
    return (
        <li {...props} data-period={period} className={className}>
            <ButtonItem disabled={true}>09:00</ButtonItem>
            <ButtonItem>10:00</ButtonItem>
            <ButtonItem selected={true}>11:00</ButtonItem>
        </li>
    )
}
