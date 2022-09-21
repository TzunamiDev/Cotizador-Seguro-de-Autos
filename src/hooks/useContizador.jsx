import { useContext } from 'react'
import CotizadorContext from '../context/CotizadorContext'

const useCotizador = () => {
  return useContext(CotizadorContext)
}

export default useCotizador
