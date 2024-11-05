
import { useState } from "react";

export const useInformacion = () => {
  const [informacion, setInformacion] = useState<number | null>(null);

  const mostrarInformacion = (id: number) => setInformacion(id);

  const cerrarInformacion= () => setInformacion(null);

  return {
    informacion,
    mostrarInformacion,
    cerrarInformacion
  };
};
