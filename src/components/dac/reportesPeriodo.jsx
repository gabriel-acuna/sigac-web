
import { useSelector } from "react-redux"
import { IoIosArrowBack } from 'react-icons/io'
import { useLocation } from 'react-router-dom'
import Accordion from '../Accordion'
import { options } from './options'

let ReportesPeriodos = (props) => {
    let location = useLocation()

    return (
        <>
            <div className="container">
                <div className="columns is-centered">
                    <div className="column has-text-centered mt-4">
                        <span className="has-text-weight-medium is-size-5"> Periodo Académico: {location.state.nombre}</span>
                        <p className="is-size-7"> {location.state.inicio.substring(8)}-{location.state.inicio.substring(5, 7)}-{location.state.inicio.substring(0, 4)} / {location.state.fin.substring(8)}-{location.state.fin.substring(5, 7)}-{location.state.fin.substring(0, 4)} </p>
                    </div>
                </div>

                <div className="columns is-centred">
                {
                    options.map((option, index) => (

                        <div className="column is-3" key={index}>
                            <Accordion title={option.title} options={option.options} />
                        </div>
                    ))
                }
                </div>
            </div>
        </>
    )
}

export default ReportesPeriodos