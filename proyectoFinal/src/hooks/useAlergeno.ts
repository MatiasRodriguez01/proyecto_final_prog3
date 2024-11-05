import React from 'react'

export const useAlergeno = () => {

    const [alergenos, setAlergenos] = useState<IAlergenos[]>([]);

  const handleAddAlergeno = (nombre: string, selectedImage: string) => {
    const nuevoAlergeno: IAlergeno = {
      id: new Date().toISOString(),
      nombre: nombre,
      imagen: selectedImage, 
      sucursales: [],
    };

    setAlergenos((prevAlergeno) => [...prevAlergeno, nuevoAlergeno]);
  };

  const handleDeleteAlergeno = (id: string) => { 
    setAlergenos((prev) =>  prev.filter(alergenos => alergenos.id !== id))
  }

  return (
    alergenos, handleAddAlergenos, handleDeleteAlergeno

   )
}
