import { useState } from 'react'
import CotizadorContext from '../context/CotizadorContext'
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from '../helpers/index'

const CotizadorProvider = ({children}) => {

  const [datos, setDatos] = useState({
    marca: '',
    year: '',
    plan: ''
  })

  const [error, setError] = useState('')
  const [resultado, setResultado] = useState(0)
  const [cargando, setCargando] = useState(false)

  const handleChangeDatos = e => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const cotizarSeguro = () => {
    // Una base
    let resultado = 2000

    // Obtener dieferencia de años
    const diferencia = obtenerDiferenciaYear(datos.year)

    // Hay que restar el 3% por cada año
    resultado -= ((diferencia * 3) * resultado) / 100
    
    // Europeo 38%
    // Americano 15%
    // Asiatico 5%W
    resultado *= calcularMarca(datos.marca)

    // Básico 20%
    // Completo 50%
    resultado *= calcularPlan(datos.plan)
    
    // Formatear dinero
    resultado = formatearDinero(resultado)

    setCargando(true)
    
    setTimeout(() => {
      setResultado(resultado)
      setCargando(false)
    }, 3000)
  }

  return (
    <CotizadorContext.Provider
      value={{
        datos,
        handleChangeDatos,
        error,
        setError,
        cotizarSeguro,
        resultado,
        cargando
      }}
    >
      {children}
    </CotizadorContext.Provider>
  )
}

export default CotizadorProvider


