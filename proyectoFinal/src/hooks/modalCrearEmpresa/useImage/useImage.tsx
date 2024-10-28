import { ChangeEvent, useState } from "react";

export const useImage = () => {

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageNull = () => {
        setSelectedImage(null)
    }

    return {
        selectedImage, 
        handleImageUpload,
        handleImageNull
    }
}