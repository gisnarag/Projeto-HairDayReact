import { useState } from "react";
import React from "react";
import dayjs from "dayjs";

export const today = dayjs().format("YYYY-MM-DD");

export default function useDateInput() {
    const [dateInput, setDateInput] = useState(today)

    function handleChangeDateInput(e: React.ChangeEvent<HTMLInputElement>) {
        const selectedDate = e.target.value

        console.log(selectedDate)

        setDateInput(selectedDate);
    }
    return {
        dateInput,
        setDateInput,
        handleChangeDateInput
    };
}

