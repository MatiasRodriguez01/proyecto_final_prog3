import { ChangeEvent, useState } from "react"

// interface generica
interface FormValues {
    [key:string]:string | number | null | boolean
}

export const useForm = <T extends FormValues> (initialValues:T) => {
    const [values, setValues] = useState<T>(initialValues)

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setValues({
          ...values,
          [name]: value,
        });
      };

    const resetForm = () => {
        setValues(initialValues);
    }

    return {
        values,
        handleChange,
        resetForm,
        setValues
    }
}