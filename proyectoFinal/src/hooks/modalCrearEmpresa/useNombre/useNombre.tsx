import { ChangeEvent, useState } from "react";

export const useNombre = () => {

    const [inputNombre, setInputNombre] = useState<string>("");

    const handleChangeNombre = (event: ChangeEvent<HTMLInputElement>) => {
        setInputNombre(event.target.value)
    }

    const handleNombreNull = () => {
        setInputNombre("")
    }

  return {
    inputNombre,
    handleChangeNombre,
    handleNombreNull
  }
}
