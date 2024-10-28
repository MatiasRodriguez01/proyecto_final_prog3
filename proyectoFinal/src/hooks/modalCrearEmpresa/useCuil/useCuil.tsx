import { ChangeEvent, useState } from "react";

export const useCuil = () => {

    const [inputCuil, setInputCuil] = useState<string>("");

    const handleChangeCuil = (event: ChangeEvent<HTMLInputElement>) => {
        setInputCuil(event.target.value)
    }

    const handleCuilNull = () => {
        setInputCuil("")
    }

  return {
    inputCuil,
    handleChangeCuil,
    handleCuilNull
  }
}