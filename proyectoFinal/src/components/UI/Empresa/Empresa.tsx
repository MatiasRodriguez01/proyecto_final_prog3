import React, { FC, useState } from 'react'
import EmpresaCard from '../EmpresaCard/EmpresaCard';
import { EmpresaInfo } from '../EmpresaInfo/EmpresaInfo';
import { IEmpresa } from '../../../interfaces/IEmpresa';
import { useInformacion } from '../../../hooks/useInformacion/useInformacion';
import ModalCrearEmpresa from '../ModalCrearEmpresa/ModalCrearEmpresa';

interface IPropsEmpresa {
  empresa: IEmpresa;
  onMostrarInformacion: Function;
}

export const Empresa: FC<IPropsEmpresa> = ({ empresa }) => {

  const [isPopUpVisible, setIsPopUpVisible] = useState<boolean>(false);

  const {  informacion, mostrarInformacion, cerrarInformacion } = useInformacion()

  
  const handleAddSucursal = () => {
    setIsPopUpVisible(!isPopUpVisible)
    
  };

  return (
    <>
      <EmpresaCard
        empresa={empresa}
        onVerEmpresa={() => mostrarInformacion(empresa.id)} // Usar la función para mostrar EmpresaInfo
        deleteEmpresa={() => handleDeleteEmpresa(empresa.id)}
        onClick={() => handleEmpresaActiva(empresa.id)}

      />

      {informacion == empresa.id && (
        <EmpresaInfo
          nombre={empresa.nombre}
          razonSocial={empresa.razonSocial}
          cuil={empresa.cuil}
          imagen={empresa.imagen}
          onVerEmpresa={cerrarInformacion}
        />
      )
      }

      {/* Componente PopUp */}
      <ModalCrearEmpresa
        visible={isPopUpVisible}
        onClose={HandlePopUp}
        onAddEmpresa={agregarNuevaEmpresa}
      />
    </>
  )
}
