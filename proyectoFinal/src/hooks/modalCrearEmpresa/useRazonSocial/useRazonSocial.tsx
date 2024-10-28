
import { ChangeEvent, useState } from "react";

export const useRazonSocial = () => {

    const [inputRazonSocial, setInputRazonSocial] = useState<string>("");

    const handleChangeRazonSocial = (event: ChangeEvent<HTMLInputElement>) => {
        setInputRazonSocial(event.target.value)
    }

    const handleRazonSocialNull = () => {
        setInputRazonSocial("")
    }


  return {
    inputRazonSocial,
    handleChangeRazonSocial,
    handleRazonSocialNull
  }
}
