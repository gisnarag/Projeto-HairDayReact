import React from "react";
import { openingHours } from "../utils/opening-hours";
import ButtonItem from "./button-item";

type ServicePeriodItem = "morning" | "afternoon" | "night"
type OpeningHour = typeof openingHours[number]

interface ServicePeriodItemProps extends React.ComponentProps<"li"> {
    period: ServicePeriodItem,
}

export default function ServicePeriodItem({ period, className, ...props }: ServicePeriodItemProps) {

    const hours = openingHours.filter(item => item.period === period).map(item => item.hour)

    console.log(hours)

    return (

        <li {...props} data-period={period} className={className}>
            {hours.map(hour => (
                <ButtonItem key={hour}>
                    {hour}
                </ButtonItem>
            ))}
        </li>

    )
}   
