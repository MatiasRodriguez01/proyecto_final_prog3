
import { useState } from "react";

export const useEmpresaInformacion = () => {
  const [empresaInfo, setEmpresaInfo] = useState<number | null>(null);

  const mostrarEmpresaInfo = (id: number) => setEmpresaInfo(id);

  const cerrarEmpresaInfo = () => setEmpresaInfo(null);

  return {
    empresaInfo,
    mostrarEmpresaInfo,
    cerrarEmpresaInfo
  };
};
