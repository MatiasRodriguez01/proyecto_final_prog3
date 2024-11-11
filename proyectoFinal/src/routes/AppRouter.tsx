import { useState } from "react";
import { Route, Routes } from "react-router";
import { Listado } from "../components/UI/Listado/Listado";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const AppRouter = () => {
  const [isLoggin, setIsloggin] = useState(false);

  const changeRoute = () => {
    setIsloggin((prev) => !prev);
  };

  return (
    <>
      <Routes>
        {isLoggin ? (
          <Route path="/*" element={<ProtectedRoutes isBack={changeRoute} />} />
        ) : (
          <Route path="/*" element={<Listado onVistaAdmin={changeRoute} />} />
        )}
      </Routes>
    </>
  );
};
