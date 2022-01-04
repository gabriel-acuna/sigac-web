import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'

import { AiOutlineDelete } from 'react-icons/ai'
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

import { useSelector } from 'react-redux'
import { logOut } from '../../store/user'
import ConfirmDialog from '../ConfirmDialog'
import FormacionAcademicaModalForm from './formacionAcademicaModal';
import CapacitacionModalForm from './capacitacionesModal'
import CapacitacionFacModalForm from './capacitacionesFacModal'
import PonenciaModalForm from './ponenciasModal'
import ExperienciaLaboralModalForm from './experienciaLaboralModal'
import MeritoModalForm from './meritoModal'
import IdiomaModalForm from './idiomaModal'
import TabPanel from '../TabPanel'
import TabContent from '../TabContent'
import AlertModal from '../AlertModal'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const CV = ({ email }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    let a11yProps = (index) => {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [activeTab, setActiveTab] = useState(0)
    const [showModalReferencia, setShowModalReferencia] = useState(false)
    const [showModalCapacitacion, setShowModalCapacitacion] = useState(false)
    const [showModalCapacitacionFac, setShowModalCapacitacionFac] = useState(false)
    const [showModalPonencia, setShowModalPonencia] = useState(false)
    const [showModalFormacionAcademica, setShowModalFormacionAcademica] = useState(false)
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
   
    let referenciasState = useSelector(state => state.referencias.data.referencias)
    let capacitacionesState = useSelector(state => state.capacitaciones.data.capacitaciones)
    //let capacitacionFacState = useSelector(state => state.capacitacionesFacilitador.data.capacitaciones)
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

    // let deleteHandlerCapFac = (id) => {
    //     setShowModalDelCapFac(true)
    //     setId(id)

    // }
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
    let deleteHandlerMer = (id) => {
        setShowModalDelMer(true)
        setId(id)
    }
    let deleteHandlerIdi = (id) => {
        setShowModalDelIdi(true)
        setId(id)
    }
    let doDeleteFormacionAcademica = () => {
        dispatch(
            deleteFormacionAcademica(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
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
                setResponse(resp)
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
                setResponse(resp)
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
                setResponse(resp)
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
                setResponse(resp)
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
                setResponse(resp)
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

    let doDeleteMerito = () => {
        dispatch(
            deleteMeritos(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadMeritos(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteIdioma = () => {
        dispatch(
            deleteIdiomas(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadPersonaEmail(email))
                    .unwrap()
                    .then(
                        resp => {
                            setPersona(resp)

                            dispatch(
                                loadIdiomas(persona.identificacion)
                            )
                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    let postHandlerFormacionAcademica = (data) => {
        dispatch(
            postFormacionAcademica(
                {
                    id_persona: persona.identificacion,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadFormacionAcademica(persona.identificacion))
                    setShowModalFormacionAcademica(false)
                }
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

    let putHandlerFormacionAcademica = (data) => {
        dispatch(
            putFormacionAcademica(
                {
                    id: objeto.id,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadFormacionAcademica(persona.identificacion))
                    setShowModalFormacionAcademica(false)
                    setObjeto(null)
                }
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadReferencias(persona.identificacion))
                    setShowModalReferencia(false)
                }
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadReferencias(persona.identificacion))
                    setShowModalReferencia(false)
                    setObjeto(null)
                }
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
                    funcion_evento: data?.funcionEvento ? data?.funcionEvento.toUpperCase() : null,
                    certificado: data?.certificado ? data.certificado.toUpperCase() : null,
                    tipo_evento: data?.tipoEvento.value,
                    pais: data.pais.value,
                    nombre: data.nombre.toUpperCase(),
                    institucion_organizadora: data.institucionOrganizadora.toUpperCase(),
                    lugar: data.lugar.toUpperCase(),
                    horas: data.horas,
                    inicio: data.fechaInicio,
                    fin: data.fechaFin

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadCapacitaciones(persona.identificacion))
                    setShowModalCapacitacion(false)
                }
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
                        funcion_evento: data?.funcionEvento ? data?.funcionEvento.toUpperCase() : null,
                        certificado: data?.certificado ? data.certificado.toUpperCase() : null,
                        tipo_evento: data?.tipoEvento.value,
                        pais: data.pais.value,
                        nombre: data.nombre.toUpperCase(),
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadCapacitaciones(persona.identificacion))
                    setShowModalCapacitacion(false)
                    setObjeto(null)
                }
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadPonencias(persona.identificacion))
                    setShowModalPonencia(false)
                }
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadPonencias(persona.identificacion))
                    setShowModalPonencia(false)
                    setObjeto(null)
                }
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadExperienciaLaboral(persona.identificacion))
                    setShowModalExperienciaLaboral(false)
                }
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
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadExperienciaLaboral(persona.identificacion))
                    setShowModalExperienciaLaboral(false)
                    setObjeto(null)
                }
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

    let postHandlerMerito = (data) => {

        dispatch(

            postMeritos(
                {
                    id_persona: persona.identificacion,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadMeritos(persona.identificacion))
                    setShowModalMerito(false)
                }
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

    let putHandlerMerito = (data) => {

        dispatch(

            putMeritos(
                {
                    id: objeto.id,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadMeritos(persona.identificacion))
                    setShowModalMerito(false)
                    setObjeto(null)
                }
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

    let postHandlerIdioma = (data) => {

        dispatch(

            postIdiomas(
                {
                    id_persona: persona.identificacion,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadIdiomas(persona.identificacion))
                    setShowModalIdioma(false)
                }
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

    let putHandlerIdioma = (data) => {

        dispatch(

            putIdiomas(
                {
                    id: objeto.id,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadIdiomas(persona.identificacion))
                    setShowModalIdioma(false)
                    setObjeto(null)
                }
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
                    <div className="column is-half mt-3">
                        <div className=" panel is-info">
                            <p className="panel-heading is-size-6">
                                <span className="icon" style={{ cursor: 'pointer' }}
                                    onClick={event => {

                                        navigate(-1)

                                    }}>

                                    <IoIosArrowBack />


                                </span>
                                Datos personales </p>
                            <div className="panel-block has-background-info-light">
                                {persona &&
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', padding: '20px' }}>

                                        <div>
                                            <span className="has-text-weight-medium">Nombres: </span> {persona.primer_nombre} {persona.segundo_nombre}
                                        </div>
                                        <div >
                                            <span className="has-text-weight-medium">Apellidos: </span> {persona.primer_apellido} {persona.segundo_apellido}
                                        </div>

                                        <div><span className="has-text-weight-medium">Edad: </span> {persona?.edad.años}  años </div>
                                        <div><span className="has-text-weight-medium">Estado civil: </span> {persona.estado_civil.estado_civil}</div>
                                        <div><span className="has-text-weight-medium">Teléfono movil: </span> {persona.telefono_movil}</div>
                                        <div><span className="has-text-weight-medium">Correo: </span> {persona.correo_personal}</div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>

                </div>

                <hr style={{ backgroundColor: "#b3e6cc" }} />
                <Box sx={{ width: '100%' }}>

                    <Tabs aria-label="basic tabs example"
                        value={activeTab} onChange={(ev, newVal) => setActiveTab(newVal)}
                        variant="scrollable"
                        scrollButtons="auto" >
                        <Tab label="Formación Académica" {...a11yProps(0)} sx={{ textTransform: 'none' }} />
                        <Tab label="Capacitaciones" {...a11yProps(1)} sx={{ textTransform: 'none' }} />
                        <Tab label="Ponencias" {...a11yProps(2)} sx={{ textTransform: 'none' }} />
                        <Tab label="Experiencia Laboral" {...a11yProps(3)} sx={{ textTransform: 'none' }} />
                        <Tab label="Méritos y distinciones" {...a11yProps(4)} sx={{ textTransform: 'none' }} />
                        <Tab label="Compresión de idiomas" {...a11yProps(5)} sx={{ textTransform: 'none' }} />
                        <Tab label="Referencias" {...a11yProps(6)} sx={{ textTransform: 'none' }} />
                    </Tabs>

                </Box>

                {/*Formación Profesional */}
                <TabPanel value={activeTab} index={0}>

                    <TabContent
                        title="Formación Académica"
                        desc="formación académica"
                        noData="No registra fomación academica"
                        columns={[
                            { key: 'nombre_titulo', text: 'Título' },
                            { key: 'estado', text: 'Estado' },
                            { key: 'opciones', text: 'Opciones' }
                        ]}
                        rows={
                            formacionState.map(
                                (estudio) => {
                                    return {
                                        id: estudio.id,
                                        nombre_titulo: estudio.nombre_titulo,
                                        estado: estudio.estado,

                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${estudio.id}0`} onClick={() => {
                                            setObjeto(estudio)
                                            setShowModalFormacionAcademica(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${estudio.id}1`} onClick={() => {
                                            deleteHandlerFor(estudio.id)
                                        }}>
                                            <span className="icon">
                                                <AiOutlineDelete />
                                            </span>
                                        </button>]

                                    }
                                }
                            )
                        }
                    >
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalFormacionAcademica(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>
                </ TabPanel>

                {/*Capacitaciones*/}
                <TabPanel value={activeTab} index={1}>


                    <TabContent
                        title="Capacitaciones"
                        desc="capacitaciones"
                        noData="No hay capacitaciones registradas"
                        columns={
                            [
                                { key: 'tipo_evento', text: 'Tipo evento' },
                                { key: 'horas', text: 'Horas' },
                                { key: 'opciones', text: 'Opciones' }
                            ]
                        }
                        rows=

                        {
                            capacitacionesState.map(
                                (capacitacion) => {
                                    return {
                                        id: capacitacion.id,
                                        tipo_evento: `${capacitacion.tipo_evento.evento} - ${capacitacion.institucion_organizadora}`,
                                        horas: capacitacion.horas,

                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${capacitacion.id}0`} onClick={ev => {
                                            setObjeto(capacitacion)
                                            setShowModalCapacitacion(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,

                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${capacitacion.id}1`} onClick={event => {
                                            deleteHandlerCap(capacitacion.id)
                                        }}>
                                            <span className="icon">
                                                <AiOutlineDelete />
                                            </span>
                                        </button>]


                                    }
                                }


                            )
                        }>
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalCapacitacion(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>

                    </TabContent>
                </TabPanel>

                {/*Capacitaciones Facilitadores*/}
                {/* <div className="column is-half">
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
                                    <div className="table-container">
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
                    </div> */}

                {/*Ponencias */}
                <TabPanel value={activeTab} index={2}>

                    <TabContent
                        title="Ponencias"
                        desc="ponencias"
                        noData="No hay ponencias registradas"
                        columns={
                            [
                                { key: 'tema', text: 'Tema' },
                                { key: 'institucion_organizadora', text: 'Institución' },
                                { key: 'fecha', text: 'Fecha' },
                                { key: 'opciones', text: 'opciones' }
                            ]
                        }
                        rows={
                            ponenciasState.map(
                                (ponencia) => {
                                    return {
                                        id: ponencia.id,
                                        tema: ponencia.tema,
                                        institucion_organizadora: ponencia.institucion_organizadora,
                                        fecha: ponencia.fecha,
                                        opciones: [
                                            <button className="button is-small is-primary mx-2 is-outlined" key={`${ponencia.id}0`} onClick={ev => {
                                                setObjeto(ponencia)
                                                setShowModalPonencia(true)
                                            }}>
                                                <span className="icon">
                                                    <FaRegEdit />
                                                </span>
                                            </button>,
                                            <button className="button is-small is-danger mx-2 is-outlined" key={`${ponencia.id}1`} onClick={event => {
                                                deleteHandlerPon(ponencia.id)
                                            }}>
                                                <span className="icon">
                                                    <AiOutlineDelete />
                                                </span>
                                            </button>
                                        ]

                                    }
                                }
                            )
                        }
                    >
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalPonencia(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>





                </TabPanel>

                {/*Experiencia Loboral*/}
                <TabPanel value={activeTab} index={3}>

                    <TabContent
                        title="Experiencia Laboral"
                        desc="experiencia laboral"
                        noData="No registra experiencia laboral"
                        columns={
                            [
                                { key: 'cargo', text: 'Cargo' },
                                { key: 'empresa', text: 'Empresa' },
                                { key: 'periodo', text: 'Desde - Hasta' },
                                { key: 'opciones', text: 'Opciones' }
                            ]
                        }
                        rows={
                            experienciasState.map(
                                (experiencia) => {
                                    return {
                                        id: experiencia.id,
                                        cargo: experiencia.cargo,
                                        empresa: experiencia.empresa,

                                        periodo: `${experiencia.inicio} - ${experiencia.fin !== null && experiencia.fin !== '' ? experiencia.fin : 'Actualidad'}`,


                                        opciones: [
                                            <button className="button is-small is-primary mx-2 is-outlined" key={`${experiencia.id}0`} onClick={() => {
                                                setObjeto(experiencia)
                                                setShowModalExperienciaLaboral(true)
                                            }}>
                                                <span className="icon">
                                                    <FaRegEdit />
                                                </span>
                                            </button>,
                                            <button className="button is-small is-danger mx-2 is-outlined" key={`${experiencia.id}1`} onClick={() => {
                                                deleteHandlerExp(experiencia.id)
                                            }}>
                                                <span className="icon">
                                                    <AiOutlineDelete />
                                                </span>
                                            </button>

                                        ]
                                    }
                                })
                        }

                    >
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalExperienciaLaboral(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>



                </TabPanel>

                {/*Meritos y Distinciones*/}
                <TabPanel value={activeTab} index={4}>

                    <TabContent
                        title="Meritos y Distinciones"
                        desc="méritos"
                        noData="No registra méritos"
                        columns={
                            [
                                { key: 'titulo', text: 'Título' },
                                { key: 'institucion', text: 'Institución' },
                                { key: 'opciones', text: 'Opciones' }
                            ]
                        }
                        rows={
                            meritosState.map(
                                (merito) => {
                                    return {
                                        id: merito.id,
                                        titulo: merito.titulo,
                                        institucion: merito.institucion_auspiciante,
                                        opciones: [
                                            <button className="button is-small is-primary mx-2 is-outlined" key={`${merito.id}0`} onClick={() => {
                                                setObjeto(merito)
                                                setShowModalMerito(true)
                                            }}>
                                                <span className="icon">
                                                    <FaRegEdit />
                                                </span>
                                            </button>,

                                            <button className="button is-small is-danger mx-2 is-outlined" key={`${merito.id}1`} onClick={() => {
                                                deleteHandlerMer(merito.id)
                                            }}>
                                                <span className="icon">
                                                    <AiOutlineDelete />
                                                </span>
                                            </button>
                                        ]

                                    }
                                })
                        }

                    >
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalMerito(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>



                </TabPanel>


                {/*Compresión idiomas*/}
                <TabPanel value={activeTab} index={5}>
                    <TabContent
                        title="Compresión de idiomas"
                        desc="idiomas comprendidos"
                        noData="No hay registros de compresión de idiomas"
                        columns={
                            [
                                { key: 'idioma', text: 'Idioma' },
                                { key: 'nivel', text: 'Compresión' },
                                { key: 'opciones', text: 'Opciones' }

                            ]
                        }
                        rows={
                            idiomasState.map(
                                (idioma) => {
                                    return {
                                        id: idioma.id,
                                        idioma: idioma.idioma,
                                        nivel: idioma.nivel_comprension,
                                        opciones:
                                            [<button className="button is-small is-primary mx-2 is-outlined" key={`${idioma.id}0`} onClick={() => {
                                                setObjeto(idioma)
                                                setShowModalIdioma(true)
                                            }}>
                                                <span className="icon">
                                                    <FaRegEdit />
                                                </span>
                                            </button>,

                                            <button className="button is-small is-danger mx-2 is-outlined" key={`${idioma.id}`} onClick={() => {
                                                deleteHandlerIdi(idioma.id)
                                            }}>
                                                <span className="icon">
                                                    <AiOutlineDelete />
                                                </span>
                                            </button>]

                                    }
                                }
                            )
                        }
                    >
                        <button className="button  is-success mx-3 is-outlined" onClick={() => setShowModalIdioma(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>

                </TabPanel>


                {/*Referencias*/}
                <TabPanel value={activeTab} index={6}>
                    <TabContent
                        title="Referencias"
                        desc="referencias"
                        noData="No hay referencias registradas"
                        columns={
                            [
                                { key: 'referencia', text: "Referencia" },
                                { key: 'tipo', text: 'Tipo' },
                                { key: 'opciones', text: 'Opciones' }
                            ]
                        }
                        rows={
                            referenciasState.map(
                                (referencia) => {
                                    return {
                                        id: referencia.id,
                                        referencia: `${referencia.nombres} ${referencia.apellidos}`,
                                        tipo: referencia.referencia,

                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${referencia.id}0`} onClick={ev => {
                                            setObjeto(referencia)
                                            setShowModalReferencia(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${referencia.id}1`} onClick={event => {
                                            deleteHandler(referencia.id)
                                        }}>
                                            <span className="icon">
                                                <AiOutlineDelete />
                                            </span>
                                        </button>]


                                    }
                                }
                            )
                        }
                    >
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalReferencia(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>
                </TabPanel>


            </div>
            {
                showModalDelFor &&
                <ConfirmDialog info="la formación académica" title="Eliminar formación académica">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelFor(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelFor(false); doDeleteFormacionAcademica();
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

            {
                showModalDelMer &&
                <ConfirmDialog info="el mérito o distición" title="Eliminar mérto/distición">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelMer(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelMer(false); doDeleteMerito();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }

            {
                showModalDelIdi &&
                <ConfirmDialog info="el idioma" title="Eliminar idioma">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalDelIdi(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalDelIdi(false); doDeleteIdioma();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }

            {/* Modal formación académica */}
            {
                showModalFormacionAcademica && <FormacionAcademicaModalForm
                    title={objeto !== null ? 'Editando mi formación académica' : 'Registrando mi formación académica'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerFormacionAcademica : postHandlerFormacionAcademica}
                >
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalFormacionAcademica(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </FormacionAcademicaModalForm>
            }

            {/* Modal Capacitaciones*/}
            {
                showModalCapacitacion && <CapacitacionModalForm
                    title={objeto !== null ? 'Editando mi capacitación' : 'Registrando mi capacitación'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerCap : postHandlerCap}>

                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalCapacitacion(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </CapacitacionModalForm>
            }

            {/* Modal Capacitaciones Facilitador*/}
            {
                showModalCapacitacionFac && <CapacitacionFacModalForm
                    title={objeto !== null ? 'Editando mi capacitación (facilitador)' : 'Registrando mi capacitación (facilitador)'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerCapFac : postHandlerCapFac}>

                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalCapacitacionFac(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </CapacitacionFacModalForm>
            }

            {/* Modal Ponencias*/}
            {
                showModalPonencia && <PonenciaModalForm
                    title={objeto !== null ? 'Editando mi ponencia' : 'Registrando mi ponencia'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerPonencia : postHandlerPonencia}>

                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalPonencia(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </PonenciaModalForm>
            }

            {/*Modal Experiencia Laboral*/}
            {
                showModalExperienciaLaboral && <ExperienciaLaboralModalForm
                    title={objeto !== null ? 'Editando mi experiencia laboral' : 'Registrando mi experiencia laboral'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerExperienciaLaboral : postHandlerExperienciaLaboral}>

                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalExperienciaLaboral(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ExperienciaLaboralModalForm>
            }

            {/*Modal meritos y distinciones*/}
            {
                showModalMerito &&
                <MeritoModalForm
                    title={objeto !== null ? 'Editando mi mérito' : 'Registrando mi mérito'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerMerito : postHandlerMerito}>

                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalMerito(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </MeritoModalForm>
            }
            {/*Modal Compresion de idiomas*/}
            {
                showModalIdioma && <IdiomaModalForm
                    title={objeto !== null ? 'Editando mi idioma' : 'Registrando mi idioma'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerIdioma : postHandlerIdioma}>

                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalIdioma(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </IdiomaModalForm>
            }

            {/* Modal Referencia*/}
            {
                showModalReferencia && <ReferenciaModalForm
                    title={objeto !== null ? 'Editando mi referencia' : 'Registrando mi referencia'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerRef : postHandlerRef}>

                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalReferencia(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ReferenciaModalForm>
            }

            {
                response?.type && <AlertModal type={response.type} message={response.content}>
                    <button className="delete" aria-label="close" onClick={() => setResponse(null)}></button>
                </AlertModal>
            }
            {
                error?.message && <AlertModal type={'danger'} message={error.message}>
                    <button className="delete" aria-label="close" onClick={() => setError(null)}></button>
                </AlertModal>
            }


        </>
    )
}

export default CV;