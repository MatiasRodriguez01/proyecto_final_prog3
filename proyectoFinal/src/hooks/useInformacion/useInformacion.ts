
import { useState } from "react";

export const useInformacion = () => {
  const [informacion, setInformacion] = useState<string | null>(null);

  const mostrarInformacion = (id: string) => setInformacion(id);

  const cerrarInformacion= () => setInformacion(null);

  return {
    informacion,
    mostrarInformacion,
    cerrarInformacion
  };
};
