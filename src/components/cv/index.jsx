import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { loadPersonaEmail } from '../../store/dth/informacion_personal'
import ReferenciaModalForm from './referenciasModal'

import { postReferencias, putReferencias, deleteReferencias, loadReferencias } from '../../store/cv/referencia'
import { postCapacitaciones, putCapacitaciones, deleteCapacitaciones, loadCapacitaciones } from '../../store/cv/capacitacion'
import { loadCapacitacionesFacilitador, postCapacitacionesFacilitador, putCapacitacionesFacilitador, deleteCapacitacionesFacilitador } from '../../store/cv/capacitacion_facilitador'
import {
    loadFormacionAcademica,
    postFormacionAcademica,
    putFormacionAcademica,
    deleteFormacionAcademica
} from '../../store/cv/formacion_academica'

import {
    loadPonencias, postPonencias, putPonencias, deletePonencia
} from '../../store/cv/ponencia'

import {
    loadExperienciaLaboral, postExperienciaLaboral, putExperienciaLaboral, deleteExperienciaLaboral
} from '../../store/cv/experiencia_laboral'

import {
    loadMeritos, postMeritos, putMeritos, deleteMeritos
} from '../../store/cv/merito'

import {
    loadIdiomas, postIdiomas, putIdiomas, deleteIdiomas
} from '../../store/cv/compresion_idioma'
import Alert from '../Alert'
import { useSelector } from 'react-redux'
import { logOut } from '../../store/user'
import ConfirmDialog from '../ConfirmDialog'
import CapacitacionModalForm from './capacitacionesModal'
import CapacitacionFacModalForm from './capacitacionesFacModal'
import PonenciaModalForm from './ponenciasModal'
import ExperienciaLaboralModalForm from './experienciaLaboralModal'

const CV = ({ email }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [expandirReferencias, setExpandirReferencia] = useState(false)
    const [expandirCapacitaciones, setExpandirCapacitaciones] = useState(false)
    const [expandirCapacitacionesFac, setExpandirCapacitacionesFac] = useState(false)
    const [expandirFormacion, setExpandirFormacion] = useState(false)
    const [expandirPonencias, setExpandirPonencias] = useState(false)
    const [expandirExperienciaLaboral, setExpandirExperienciaLaboral] = useState(false)
    const [expandirMeritos, setExpandirMeritos] = useState(false)
    const [expandirIdiomas, setExpandirIdiomas] = useState(false)


    const [showModalReferencia, setShowModalReferencia] = useState(false)
    const [showModalCapacitacion, setShowModalCapacitacion] = useState(false)
    const [showModalCapacitacionFac, setShowModalCapacitacionFac] = useState(false)
    const [showModalPonencia, setShowModalPonencia] = useState(false)
    const [showModalFormacionAcdemica, setShowModalFormacionAcademica] = useState(false)
    const [showModalExperienciaLaboral, setShowModalExperienciaLaboral] = useState(false)
    const [showModalMerito, setShowModalMerito] = useState(false)
    const [showModalIdioma, setShowModalIdioma] = useState(false)

    const [persona, setPersona] = useState(null)
    const [objeto, setObjeto] = useState(null)
    const [response, setResponse] = useState(null)
    const [id, setId] = useState(null)

    const [error, setError] = useState(null)
    const [showModalRef, setShowModalRef] = useState(false)
    const [showModalDelCap, setShowModalDelCap] = useState(false)
    const [showModalDelCapFac, setShowModalDelCapFac] = useState(false)
    const [showModalDelPon, setShowModalDelPon] = useState(false)
    const [showModalDelExp, setShowModalDelExp] = useState(false)
    const [showModalDelFor, setShowModalDelFor] = useState(false)
    const [showModalDelMer, setShowModalDelMer] = useState(false)
    const [showModalDelIdi, setShowModalDelIdi] = useState(false)
    const [respConfirmRef, setRespConfirmRef] = useState(null)


    let referenciasState = useSelector(state => state.referencias.data.referencias)
    let capacitacionesState = useSelector(state => state.capacitaciones.data.capacitaciones)
    let capacitacionFacState = useSelector(state => state.capacitacionesFacilitador.data.capacitaciones)
    let formacionState = useSelector(state => state.formacionAcademica.data.formacionAcademica)
    let ponenciasState = useSelector(state => state.ponencias.data.ponencias)
    let experienciasState = useSelector(state => state.experienciaLaboral.data.experiencias)
    let meritosState = useSelector(state => state.meritos.data.meritos)
    let idiomasState = useSelector(state => state.idiomas.data.idiomas)

    useEffect(
        () => {
            dispatch(
                loadPersonaEmail(email)
            ).unwrap()
                .then(
                    resp => {
                        setPersona(resp)
                        dispatch(
                            loadReferencias(resp.identificacion)
                        )
                        dispatch(
                            loadCapacitaciones(resp.identificacion)
                        )
                        dispatch(
                            loadCapacitacionesFacilitador(resp.identificacion)
                        )
                        dispatch(loadFormacionAcademica(resp.identificacion))
                        dispatch(loadPonencias(resp.identificacion))
                        dispatch(loadExperienciaLaboral(resp.identificacion))
                        dispatch(loadMeritos(resp.identificacion))
                        dispatch(loadIdiomas(resp.identificacion))

                    }
                )

        }, [
        dispatch, email
    ]
    )




    let deleteHandler = (id) => {
        setShowModalRef(true)
        setId(id)

    }

    let deleteHandlerCap = (id) => {
        setShowModalDelCap(true)
        setId(id)

    }

    let deleteHandlerCapFac = (id) => {
        setShowModalDelCapFac(true)
        setId(id)

    }
    let deleteHandlerPon = (id) => {
        setShowModalDelPon(true)
        setId(id)
    }
    let deleteHandlerFor = (id) => {
        setShowModalDelFor(true)
        setId(id)
    }
    let deleteHandlerExp = (id) => {
        setShowModalDelExp(true)
        setId(id)
    }
    let doDeleteFormacionAcadémica = () => {
        dispatch(
            deleteFormacionAcademica(id)

        ).unwrap()
            .then(resp => {
                setRespConfirmRef(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadFormacionAcademica(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }
    let doDelete = () => {
        dispatch(
            deleteReferencias(id)

        ).unwrap()
            .then(resp => {
                setRespConfirmRef(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadReferencias(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteCap = () => {
        dispatch(
            deleteCapacitaciones(id)

        ).unwrap()
            .then(resp => {
                setRespConfirmRef(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadCapacitaciones(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteCapFac = () => {
        dispatch(
            deleteCapacitacionesFacilitador(id)

        ).unwrap()
            .then(resp => {
                setRespConfirmRef(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadCapacitacionesFacilitador(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }


    let doDeletePonencia = () => {
        dispatch(
            deletePonencia(id)

        ).unwrap()
            .then(resp => {
                setRespConfirmRef(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadPonencias(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteExperienciaLaboral = () => {
        dispatch(
            deleteExperienciaLaboral(id)

        ).unwrap()
            .then(resp => {
                setRespConfirmRef(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadExperienciaLaboral(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    let postHandlerRef = (data) => {
        dispatch(

            postReferencias(
                {
                    id_persona: persona.identificacion,
                    referencia: data.tipoReferencia,
                    apellidos: data.apellidos.toUpperCase(),
                    nombres: data.nombres.toUpperCase(),
                    direccion: data.direccion.toUpperCase(),
                    correo_electronico: data.correo_electronico,
                    telefono_domicilio: data.telefono_domicilio,
                    telefono_movil: data.telefono_movil

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }


    let putHandlerRef = (data) => {
        dispatch(
            putReferencias(
                {
                    id: objeto.id,
                    referencia: {
                        referencia: data.tipoReferencia.toUpperCase(),
                        apellidos: data.apellidos.toUpperCase(),
                        nombres: data.nombres.toUpperCase(),
                        direccion: data.direccion.toUpperCase(),
                        correo_electronico: data.correo_electronico,
                        telefono_domicilio: data.telefono_domicilio,
                        telefono_movil: data.telefono_movil
                    }

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }

    let postHandlerCap = (data) => {
        dispatch(

            postCapacitaciones(
                {
                    id_persona: persona.identificacion,
                    tipo_certificado: data.tipoCertificado,
                    tipo_evento: data.tipoEvento.toUpperCase(),
                    institucion_organizadora: data.institucionOrganizadora.toUpperCase(),
                    lugar: data.lugar.toUpperCase(),
                    horas: data.horas,
                    inicio: data.fechaInicio,
                    fin: data.fechaFin

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }


    let putHandlerCap = (data) => {
        dispatch(
            putCapacitaciones(
                {
                    id: objeto.id,
                    capacitacion: {


                        tipo_certificado: data.tipoCertificado,
                        tipo_evento: data.tipoEvento.toUpperCase(),
                        institucion_organizadora: data.institucionOrganizadora.toUpperCase(),
                        lugar: data.lugar.toUpperCase(),
                        horas: data.horas,
                        inicio: data.fechaInicio,
                        fin: data.fechaFin

                    }

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }

    let postHandlerCapFac = (data) => {
        dispatch(

            postCapacitacionesFacilitador(
                {
                    id_persona: persona.identificacion,
                    certificado: data.certificado !== null ? data.certificado.toUpperCase() : data.certificado,
                    funcion_evento: data.funcionEvento.toUpperCase(),
                    institucion_organizadora: data.institucionOrganizadora.toUpperCase(),
                    lugar: data.lugar.toUpperCase(),
                    horas: data.horas,
                    inicio: data.fechaInicio,
                    fin: data.fechaFin

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }


    let putHandlerCapFac = (data) => {
        dispatch(
            putCapacitacionesFacilitador(
                {
                    id: objeto.id,
                    certificado: data.certificado !== null ? data.certificado.toUpperCase() : data.certificado,
                    funcion_evento: data.funcionEvento.toUpperCase(),
                    institucion_organizadora: data.institucionOrganizadora.toUpperCase(),
                    lugar: data.lugar.toUpperCase(),
                    horas: data.horas,
                    inicio: data.fechaInicio,
                    fin: data.fechaFin



                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }


    let postHandlerPonencia = (data) => {

        dispatch(

            postPonencias(
                {
                    id_persona: persona.identificacion,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }


    let putHandlerPonencia = (data) => {
        dispatch(
            putPonencias(
                {
                    id: objeto.id,
                    ...data
                }



            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }

    let postHandlerExperienciaLaboral = (data) => {

        dispatch(

            postExperienciaLaboral(
                {
                    id_persona: persona.identificacion,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }


    let putHandlerExperienciaLaboral = (data) => {
        dispatch(
            putExperienciaLaboral(
                {
                    id: objeto.id,
                    ...data
                }



            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )
    }

    return (
        <>
            <div className="container">
                <div className="columns is-centered is-multiline">
                    <div className="column is-half">
                        <button className="button is-info mt-4 mx-3 is-outlined"
                            onClick={event => {
                                navigate(-1);

                            }}>
                            <span className="icon">
                                <IoIosArrowBack />
                            </span>
                        </button>

                    </div>
                    {respConfirmRef && respConfirmRef.type === 'warning' && <Alert type={'is-warning is-light'} content={respConfirmRef.content}>
                        <button className="delete" onClick={event => setRespConfirmRef(null)}></button>
                    </Alert>}
                    {respConfirmRef && respConfirmRef.type === 'success' && <Alert type={'is-success is-light'} content={respConfirmRef.content}>
                        <button className="delete" onClick={event => {
                            setRespConfirmRef(null)



                        }}></button>
                    </Alert>}
                </div>
                <div className="columns is-centered is-multiline">

                    {/*Formación Profesional */}
                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => setExpandirFormacion(!expandirFormacion)}>
                                <p className="card-header-title">
                                    Formación Profesional
                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        {expandirFormacion ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                    </span>
                                </button>

                            </header>

                            {
                                expandirFormacion && <div className="card-content">
                                    <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalFormacionAcademica(true)}>
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>
                                    <div className="table-conatiner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Titulo
                                                    </th>
                                                    <th>
                                                        Estado
                                                    </th>
                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    formacionState.map(
                                                        (estudio) => (
                                                            <tr key={estudio.id}>
                                                                <td>{estudio.nombre_titulo}</td>
                                                                <td>{estudio.estado}</td>
                                                                <td>
                                                                    <button className="button is-small is-primary mx-2 is-outlined" key={`${estudio.id}0`} onClick={ev => {
                                                                        setObjeto(estudio)
                                                                        setShowModalFormacionAcademica(true)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <FaRegEdit />
                                                                        </span>
                                                                    </button>
                                                                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                                                                        deleteHandlerCapFac(estudio.id)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <AiOutlineDelete />
                                                                        </span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>

                    {/*Capacitaciones*/}
                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => setExpandirCapacitaciones(!expandirCapacitaciones)}>
                                <p className="card-header-title">
                                    Capacitaciones

                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        {expandirCapacitaciones ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                    </span>
                                </button>
                            </header>
                            {
                                expandirCapacitaciones && <div className="card-content">
                                    <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalCapacitacion(true)}>
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>

                                    <div className="table-conatiner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Tipo Evento
                                                    </th>
                                                    <th>
                                                        Horas
                                                    </th>
                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    capacitacionesState.map(
                                                        (capacitacion) => (
                                                            <tr key={capacitacion.id}>
                                                                <td>{capacitacion.tipo_evento} - {capacitacion.institucion_organizadora}</td>
                                                                <td>{capacitacion.horas}</td>
                                                                <td>
                                                                    <button className="button is-small is-primary mx-2 is-outlined" key={`${capacitacion.id}0`} onClick={ev => {
                                                                        setObjeto(capacitacion)
                                                                        setShowModalCapacitacion(true)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <FaRegEdit />
                                                                        </span>
                                                                    </button>

                                                                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                                                                        deleteHandlerCap(capacitacion.id)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <AiOutlineDelete />
                                                                        </span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>




                            }
                        </div>
                    </div>

                    {/*Capacitaciones Facilitadores*/}
                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => {
                                setExpandirCapacitacionesFac(!expandirCapacitacionesFac)
                            }}>
                                <p className="card-header-title">
                                    Capacitaciones (Facilitador)


                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        {expandirCapacitacionesFac ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                    </span>
                                </button>
                            </header>
                            {
                                expandirCapacitacionesFac && <div className="card-content">
                                    <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalCapacitacionFac(true)}>
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>
                                    <div className="table-conatiner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Función
                                                    </th>
                                                    <th>
                                                        Lugar
                                                    </th>
                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    capacitacionFacState.map(
                                                        (capacitacion) => (
                                                            <tr key={capacitacion.id}>
                                                                <td>{capacitacion.funcion_evento}</td>
                                                                <td>{capacitacion.lugar}</td>
                                                                <td>
                                                                    <button className="button is-small is-primary mx-2 is-outlined" key={`${capacitacion.id}0`} onClick={ev => {
                                                                        setObjeto(capacitacion)
                                                                        setShowModalCapacitacionFac(true)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <FaRegEdit />
                                                                        </span>
                                                                    </button>
                                                                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                                                                        deleteHandlerCapFac(capacitacion.id)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <AiOutlineDelete />
                                                                        </span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>

                    {/*Ponencias */}
                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => setExpandirPonencias(!expandirPonencias)}>
                                <p className="card-header-title">
                                    Ponencias
                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        {expandirPonencias ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                    </span>
                                </button>

                            </header>

                            {
                                expandirPonencias && <div className="card-content">
                                    <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalPonencia(true)}>
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>
                                    <div className="table-conatiner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Tema
                                                    </th>
                                                    <th>
                                                        Institución
                                                    </th>
                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    ponenciasState.map(
                                                        (ponencia) => (
                                                            <tr key={ponencia.id}>
                                                                <td>{ponencia.tema}</td>
                                                                <td>{ponencia.institucion_organizadora}</td>
                                                                <td>
                                                                    <button className="button is-small is-primary mx-2 is-outlined" key={`${ponencia.id}0`} onClick={ev => {
                                                                        setObjeto(ponencia)
                                                                        setShowModalPonencia(true)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <FaRegEdit />
                                                                        </span>
                                                                    </button>
                                                                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                                                                        deleteHandlerPon(ponencia.id)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <AiOutlineDelete />
                                                                        </span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>

                    {/*Expeiencia Loboral*/}
                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => setExpandirExperienciaLaboral(!expandirExperienciaLaboral)}>
                                <p className="card-header-title">
                                    Experiencia Laboral
                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        {expandirExperienciaLaboral ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                    </span>
                                </button>
                            </header>
                            {
                                expandirExperienciaLaboral && <div className="card-content">
                                    <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalExperienciaLaboral(true)}>
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>
                                    <div className="table-conatiner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Cargo
                                                    </th>
                                                    <th>
                                                        Empresa
                                                    </th>

                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    experienciasState.map(
                                                        (experiencia) => (
                                                            <tr key={experiencia.id}>
                                                                <td>{experiencia.cargo} </td>
                                                                <td> <p className="has-text-centered"> {experiencia.empresa} </p>
                                                                    <p className="is-7">
                                                                        {experiencia.inicio} - {experiencia.fin !== null && experiencia.fin !== '' ? experiencia.fin : 'Actualidad'}
                                                                    </p>
                                                                </td>
                                                                <td>
                                                                    <button className="button is-small is-primary mx-2 is-outlined" key={`${experiencia.id}0`} onClick={() => {
                                                                        setObjeto(experiencia)
                                                                        setShowModalExperienciaLaboral(true)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <FaRegEdit />
                                                                        </span>
                                                                    </button>
                                                                    <button className="button is-small is-danger mx-2 is-outlined" onClick={() => {
                                                                        deleteHandlerExp(experiencia.id)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <AiOutlineDelete />
                                                                        </span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>


                                </div>
                            }
                        </div>
                    </div>


                    {/*Referencias*/}
                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => {
                                setExpandirReferencia(!expandirReferencias)
                            }}>
                                <p className="card-header-title">
                                    Referencias


                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        {expandirReferencias ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                    </span>
                                </button>
                            </header>
                            {
                                expandirReferencias && <div className="card-content">
                                    <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalReferencia(true)}>
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>
                                    <div className="table-conatiner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Referencia
                                                    </th>
                                                    <th>
                                                        Tipo
                                                    </th>
                                                    <th>
                                                        Opciones
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {
                                                    referenciasState.map(
                                                        (referencia) => (
                                                            <tr key={referencia.id}>
                                                                <td>{referencia.nombres} {referencia.apellidos}</td>
                                                                <td>{referencia.referencia}</td>
                                                                <td>
                                                                    <button className="button is-small is-primary mx-2 is-outlined" key={`${referencia.id}0`} onClick={ev => {
                                                                        setObjeto(referencia)
                                                                        setShowModalReferencia(true)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <FaRegEdit />
                                                                        </span>
                                                                    </button>
                                                                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                                                                        deleteHandler(referencia.id)
                                                                    }}>
                                                                        <span className="icon">
                                                                            <AiOutlineDelete />
                                                                        </span>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                showModalDelFor &&
                <ConfirmDialog info="la formación académica" title="Eliminar formación académica">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelFor(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelFor(false); doDeleteFormacionAcadémica();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalRef &&
                <ConfirmDialog info="la referencia" title="Eliminar referencia">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalRef(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalRef(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalDelCap &&
                <ConfirmDialog info="la capacitación" title="Eliminar capacitación">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelCap(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelCap(false); doDeleteCap();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }

            {
                showModalDelCapFac &&
                <ConfirmDialog info="la capacitación" title="Eliminar capacitación">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelCapFac(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelCapFac(false); doDeleteCapFac();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }

            {
                showModalDelPon &&
                <ConfirmDialog info="la ponencia" title="Eliminar ponencia">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelPon(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelPon(false); doDeletePonencia();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }

            {
                showModalDelExp &&
                <ConfirmDialog info="la experiencia laboral" title="Eliminar experiencia laboral">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelExp(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelExp(false); doDeleteExperienciaLaboral();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {/* Modal Capacitaciones*/}
            {
                showModalCapacitacion && <CapacitacionModalForm
                    title={objeto !== null ? 'Editar capacitación' : 'Registrar capacitación'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerCap : postHandlerCap}>
                    <div className="columns is-centered">
                        <div className="column is-6">
                            {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                <button className="delete" onClick={event => setResponse(null)}></button>
                            </Alert>}
                            {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                <button className="delete" onClick={event => {
                                    setResponse(null)
                                    setShowModalCapacitacion(false)
                                    setObjeto(null)
                                    dispatch(
                                        loadCapacitaciones(persona.identificacion)
                                    )
                                }}></button>
                            </Alert>}
                            {error && <Alert type={'is-danger is-light'} content={error.message}>
                                <button className="delete" onClick={event => setError(null)}></button>
                            </Alert>}
                        </div>
                    </div>
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalCapacitacion(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </CapacitacionModalForm>
            }

            {/* Modal Capacitaciones Facilitador*/}
            {
                showModalCapacitacionFac && <CapacitacionFacModalForm
                    title={objeto !== null ? 'Editar capacitación' : 'Registrar capacitación'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerCapFac : postHandlerCapFac}>
                    <div className="columns is-centered">
                        <div className="column is-6">
                            {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                <button className="delete" onClick={event => setResponse(null)}></button>
                            </Alert>}
                            {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                <button className="delete" onClick={event => {
                                    setResponse(null)
                                    setShowModalCapacitacionFac(false)
                                    setObjeto(null)
                                    dispatch(
                                        loadCapacitacionesFacilitador(persona.identificacion)
                                    )
                                }}></button>
                            </Alert>}
                            {error && <Alert type={'is-danger is-light'} content={error.message}>
                                <button className="delete" onClick={event => setError(null)}></button>
                            </Alert>}
                        </div>
                    </div>
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalCapacitacionFac(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </CapacitacionFacModalForm>
            }

            {/* Modal Ponencias*/}
            {
                showModalPonencia && <PonenciaModalForm
                    title={objeto !== null ? 'Editar ponencia' : 'Registrar ponencia'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerPonencia : postHandlerPonencia}>
                    <div className="columns is-centered">
                        <div className="column is-6">
                            {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                <button className="delete" onClick={event => setResponse(null)}></button>

                            </Alert>}
                            {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                <button className="delete" onClick={event => {
                                    setResponse(null)
                                    setShowModalPonencia(false)
                                    setObjeto(null)
                                    dispatch(
                                        loadPonencias(persona.identificacion)
                                    )
                                }}></button>
                            </Alert>}
                            {error && <Alert type={'is-danger is-light'} content={error.message}>
                                <button className="delete" onClick={event => setError(null)}></button>
                            </Alert>}
                        </div>
                    </div>
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalPonencia(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </PonenciaModalForm>
            }

            {/*Modal Experiencia Laboral*/}
            {showModalExperienciaLaboral && <ExperienciaLaboralModalForm
                title={objeto !== null ? 'Editar experiencia laboral' : 'Registrar experiencia laboral'}
                objeto={objeto}
                handler={objeto !== null ? putHandlerExperienciaLaboral : postHandlerExperienciaLaboral}>
                <div className="columns is-centered">
                    <div className="column is-6">
                        {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                            <button className="delete" onClick={event => setResponse(null)}></button>
                        </Alert>}
                        {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                            <button className="delete" onClick={event => {
                                setResponse(null)
                                setShowModalExperienciaLaboral(false)
                                setObjeto(null)
                                dispatch(
                                    loadExperienciaLaboral(persona.identificacion)
                                )
                            }}></button>
                        </Alert>}
                        {error && <Alert type={'is-danger is-light'} content={error.message}>
                            <button className="delete" onClick={event => setError(null)}></button>
                        </Alert>}
                    </div>
                </div>
                <button className="button is-small is-danger mx-3" onClick={ev => {
                    setShowModalExperienciaLaboral(false)
                    setObjeto(null)
                }}>Cancelar</button>
            </ExperienciaLaboralModalForm>
            }

            {
                showModalReferencia && <ReferenciaModalForm
                    title={objeto !== null ? 'Editar referencia' : 'Registrar referencia'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerRef : postHandlerRef}>
                    <div className="columns is-centered">
                        <div className="column is-6">
                            {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                <button className="delete" onClick={event => setResponse(null)}></button>
                            </Alert>}
                            {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                <button className="delete" onClick={event => {
                                    setResponse(null)
                                    setShowModalReferencia(false)
                                    setObjeto(null)
                                    dispatch(
                                        loadReferencias(persona.identificacion)
                                    )
                                }}></button>
                            </Alert>}
                            {error && <Alert type={'is-danger is-light'} content={error.message}>
                                <button className="delete" onClick={event => setError(null)}></button>
                            </Alert>}
                        </div>
                    </div>
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalReferencia(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ReferenciaModalForm>
            }


        </>
    )
}

export default CV;