import { ChangeEvent, useState } from "react"
import { useEmpresas } from "../hooks/empresas/UseEmpresas"
import styles from "../styles/Listado.module.css"
import style from "../styles/PopUp.module.css"


export const Listado = () => {

  const [input, setInput] = useState<string>("");

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value)
  }

  const { empresas, handleAddEmpresa } = useEmpresas();

  const [button, setButton] = useState<string>("none");

  const agregarEmpresa = () => {
    const estado: string = "flex";
    setButton(estado)
  }
  const salir = () => {
    handleAddEmpresa(input)
    const estado: string = "none";
    setButton(estado)
  }
  const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <article className={styles.container}>

        <section className={styles.containerEmpresas}>
          <div className={styles.titulo}>
            <h2>Empresas</h2>
          </div>
          <button type="submit" onClick={agregarEmpresa}>AGREGAR EMPRESAS</button>
          <hr />
          <div className={styles.listaEmpresa}>
            <h4>Lista de Empresas</h4>
            {
              empresas.length !== 0 ? (
                empresas.map((e) => (
                  <div className={styles.empresas} key={e.id}>
                    <p>{e.nombre}</p>
                  </div>
                ))
              ) : (
                <p>No hay empresas</p>
              )
            }

          </div>
        </section>

        <section className={styles.containerSucursales}>
          <div className={styles.titulo}>
            <h2>Sucursales</h2>
          </div>
          {/* <button>AGREGAR SUCURSAL</button> */}
        </section>

      </article>
      <article
        className={style.containerPopUp}
        style={{ display: button }}>

        <div className={style.popUpContainer}>

          <div className={style.contenido}>
            <h2>Crear empresa</h2>

            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Ingrese el nombre de la empresa"
                value={input} onChange={handleChangeInput} />
            </form>
          </div>

          <button type="submit" onClick={salir}>enviar</button>
        </div>

      </article>
    </>
  )
}
