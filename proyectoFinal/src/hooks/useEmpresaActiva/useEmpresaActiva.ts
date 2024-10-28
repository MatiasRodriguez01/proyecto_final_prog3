import { useState } from "react";

export const useEmpresaActiva = () => {
  const [empresaActiva, setEmpresaActiva] = useState<number | null>(null);

  const mostrarEmpresaInfo = (id: number) => setEmpresaActiva(id);

  const cerrarEmpresaInfo = () => setEmpresaActiva(null);

  return {
    empresaActiva,
    mostrarEmpresaInfo,
    cerrarEmpresaInfo
  };
};
