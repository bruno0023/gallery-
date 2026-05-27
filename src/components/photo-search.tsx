import InputText from "./input-text";
import React from "react";

//Icone
import SearchIcon from "../assets/icons/search.svg?react";
import { debounce } from "../helpers/utils";

export default function PhotoSearch() {

    const [inputValue, SetInputValue] = React.useState("")

    const debouncedSetValue = React.useCallback(
        debounce((value: string) => {
            console.log("Valor buscado:", value);
        }, 200),
        []
    );

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value

        SetInputValue(value)
        debouncedSetValue(value)
    }

    return (
        <>
            <InputText
                icon={SearchIcon}
                placeholder="Buscar Fotos"
                className='flex-1'
                value={inputValue}
                onChange={handleInputChange}
            />
        </>
    )
}