import { useState } from "react";

export default function useButtonHourSelected() {

    const [selectedHour, setSelectedHour] = useState<string>("")

    function handleButtonHourSelected(hour: string) {
        setSelectedHour(hour);
        console.log("você clicou:", hour)

    }

    return {
        selectedHour,
        handleButtonHourSelected,
    }
}

