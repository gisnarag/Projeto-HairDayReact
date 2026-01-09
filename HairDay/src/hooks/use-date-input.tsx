import { useState } from "react";
import React from "react";
import dayjs from "dayjs";

const today = dayjs().format("YYYY-MM-DD");

export default function useDateInput() {
    const [dateInput, setDateInput] = useState(today)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = (e.target.value)
        setDateInput(value);
        console.log(value)

    }
    return {
        dateInput,
        handleChange

    }

}

