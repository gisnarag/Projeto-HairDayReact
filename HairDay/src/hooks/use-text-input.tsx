import React, { useState } from "react";

export default function useTextInput() {
    const [name, setName] = useState("")

    function handleTextInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = (e.target.value)
        console.log(value)
        setName(value)

    }
    return {
        name,
        handleTextInput
    }
}