import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'

import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { loadPersonaEmail } from '../../store/dth/informacion_personal'
import ReferenciaModalForm from './referenciasModal'
import { postReferencias, putReferencias, deleteReferencias, loadReferencias } from '../../store/cv/referencia'
import Alert from '../Alert';
import { useSelector } from 'react-redux'
import { logOut } from '../../store/user'
import ConfirmDialog from '../ConfirmDialog';


const CV = ({ email }) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [expandirReferencias, setExpandirReferencia] = useState(false)
    const [expandirCapacitaciones, setExpandirCapacitaciones] = useState(false)
    const [showModalReferencia, setShowModalReferencia] = useState(false)
    const [showModalCapacitacion, setShowModalCapacitacion] = useState(false)
    const [persona, setPersona] = useState(null)
    const [objeto, setObjeto] = useState(null)
    const [response, setResponse] = useState(null)
    const [id, setId] = useState(null)
    const [error, setError] = useState(null)
    const [showModalRef, setShowModalRef] = useState(false)

    const [respConfirmRef, setRespConfirmRef] = useState(null)
    const [errorConfirm, setErrorRespConfirmRef] = useState(null)
    let referenciasState = useSelector(state => state.referencias.data.referencias)

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

                    }
                )

        }, [
        dispatch
    ]
    )




    let deleteHandler = (id) => {
        setShowModalRef(true)
        setId(id)

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
                        setError({ 'message': 'No es posible estrablecer conexión, intente mas tarde.' })
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
                        setError({ 'message': 'No es posible estrablecer conexión, intente mas tarde.' })
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
                {email}
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


                    <div className="column is-half">
                        <div className="card">
                            <header className="card-header" onClick={() => {
                                dispatch(
                                    loadReferencias(persona.identificacion)
                                )
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
                                    <button className="button  is-success mx-3 is-outlined">
                                        <span className="icon">
                                            <IoIosAddCircleOutline />
                                        </span>
                                    </button>

                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {
                showModalRef &&
                <ConfirmDialog info="la refrencia" title="Eliminar referencia">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModalRef(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModalRef(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }

            {
                showModalReferencia && <ReferenciaModalForm
                    title={objeto !== null ? 'Editar referencia' : 'Registrar referencia'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandlerRef : postHandlerRef}>
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