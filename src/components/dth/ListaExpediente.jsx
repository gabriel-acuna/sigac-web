import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io'
import { ImProfile } from 'react-icons/im'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modalForm'
import { postDetalleExpedienteFuncionario, postDetalleExpedienteProfesor, putDetalleExpediente, clearData, deleteItemDetalle, loadExpedienteLaboral } from '../../store/dth/expediente_laboral'
import { postDeclaraciones, putDeclaraciones, deleteDeclaraciones, loadDeclaracionesPersona } from '../../store/dth/declaracion_patrimonial'
import { logOut } from '../../store/user'
import Alert from '../Alert'
import ConfirmDialog from '../ConfirmDialog'
import OptionCard from '../OptionCard'
import ModalDeclaracionPatrimonial from './modalDeclaracion'
import RegimenModalForm from './modalRegimen'
import FamiliarModalForm from './modalFamiliar'

let ListaExpediente = (props) => {
    const location = useLocation()
    let expedienteState = useSelector(state => state.expediente.data.expediente)
    let declaracionesState = useSelector(state => state.declaraciones.data.declaraciones)
    const navigate = useNavigate()
    const [persona] = useState(location.state)
    const dispatch = useDispatch()
    const [objeto, setObjeto] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showDecModalForm, setShowDecModalForm] = useState(false)
    const [showFamModalForm, setShowFamModalForm] = useState(false)
    const [showRegModalForm, setShowRegModalForm] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showConfirmDialogDec, setShowConfirmDialogDec] = useState(false)
    const [response, setResponse] = useState(null)
    const [deteteResponse, setDeleteResponse] = useState(null)
    const [error, setError] = useState(null)
    const [id, setId] = useState(null)

    useEffect(
        () => {
            location.state?.identificacion && dispatch(
                loadExpedienteLaboral(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadDeclaracionesPersona(location.state.identificacion)
            )
        }, [dispatch, location.state?.identificacion]
    )




    const deleteHandler = (id) => {
        setId(id)
        setShowConfirmDialog(true)

    }

    const deleteDecHandler = (id) => {
        setId(id)
        setShowConfirmDialogDec(true)
    }

    let postHandler = (data) => {
        let detalle = { id_persona: location.state.identificacion, detalle: data }
        if (data.tipoPersonal === 'PROFESOR') {
            dispatch(
                postDetalleExpedienteProfesor(detalle)
            ).unwrap()
                .then(
                    resp => setResponse(resp)
                ).catch(
                    (err) => {
                        console.log(err);
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
        } else if (data.tipoPersonal === 'FUNCIONARIO') {
            dispatch(
                postDetalleExpedienteFuncionario(detalle))
                .unwrap()
                .then(
                    (resp) => setResponse(resp)
                ).catch(
                    (err) => {
                        console.log(err);
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
    }


    let putHandler = (data) => {
        let detalle = { id: objeto.id, ...data }

        dispatch(
            putDetalleExpediente(detalle)
        ).unwrap()
            .then(
                resp => setResponse(resp)
            ).catch(err => console.log(err))
    }

    let doDelete = () => {
        dispatch(
            deleteItemDetalle(id)

        ).unwrap()
            .then(resp => {
                setDeleteResponse(resp)


            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteDec = () => {
        dispatch(
            deleteDeclaraciones(id)

        ).unwrap()
            .then(resp => {
                setDeleteResponse(resp)
                dispatch(
                    loadDeclaracionesPersona(persona.identificacion)
                )


            }).catch(
                (err) => console.error(err)
            )
    }

    let postDeclaracion = (data) => {
        dispatch(postDeclaraciones({ persona: location.state.identificacion, ...data })).unwrap()
            .then(
                (resp) => setResponse(resp)
            ).catch(
                (err) => {
                    console.log(err);
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

    let putDeclaracion = (data) => {
        dispatch(putDeclaraciones({ id: objeto.id, ...data })).unwrap()
            .then(
                (resp) => setResponse(resp)
            ).catch(
                (err) => {
                    console.log(err);
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
                <div className="columns is-centered">
                    <div className="column is-half mt-3">
                        <div className="card">
                            <header>
                                <button className="button is-info mt-4 mx-3 is-outlined"
                                    onClick={event => {
                                        dispatch(clearData())
                                        navigate(-1)

                                    }}>
                                    <span className="icon">
                                        <IoIosArrowBack />
                                    </span>
                                </button>
                                <Link className="button is-primary mt-4 mx-3 is-outlined" to="cv" state={location.state}><span className="icon"><ImProfile /></span></Link>

                            </header>
                            {persona && <section className="card-content">
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr' }}>
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
                            </section>}
                        </div>
                    </div>

                </div>
                <div className="columns is-centered">
                    <div className="column  is-3">
                        {deteteResponse && deteteResponse.type === 'warning' && <Alert type={'is-warning is-light'} content={deteteResponse.content}>
                            <button className="delete" onClick={event => setDeleteResponse(null)}></button>
                        </Alert>}
                        {deteteResponse && deteteResponse.type === 'success' && <Alert type={'is-success is-light'} content={deteteResponse.content}>
                            <button className="delete" onClick={event => {
                                setDeleteResponse(null)
                                dispatch(loadExpedienteLaboral(location.state.identificacion))
                            }}></button>
                        </Alert>}
                    </div>
                </div>
                <div className="columns is-centered">
                    <div className="column is-6 mb-6">

                        <OptionCard
                            title="Registro laboral"
                            columns={['No. Doc.', 'Inicio', 'Fin', 'Opciones']}
                            expandir={false}
                            rows={
                                expedienteState?.detalle.map(



                                    (row, index) =>
                                    (<tr key={row.id}>
                                        <td key={`0${row.id}0`}>{row.numero_documento}</td>
                                        <td key={`0${row.id}1`}>{row.fecha_inicio}</td>
                                        <td key={`0${row.id}2`}>{row.fecha_fin}</td>
                                        <td key={`0${row.id}3`}>
                                            <button className="button is-small is-primary mx-2 is-outlined" onClick={ev => {
                                                setObjeto(row)
                                                setShowModalForm(true)
                                            }}>
                                                <span className="icon">
                                                    <FaRegEdit />
                                                </span>
                                            </button>
                                            <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                deleteHandler(row.id)
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
                        >
                            <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalForm(true)}>
                                <span className="icon">
                                    <IoIosAddCircleOutline />
                                </span>
                            </button>

                        </OptionCard>

                    </div>

                    {expedienteState?.detalle && expedienteState?.detalle.length > 0 && <div className="column is-6 mb-6">
                        <OptionCard title="Declaraciones Patrimoniales"
                            columns={['Tipo', 'Fecha presentación', 'Opciones']}
                            expandir={false}
                            rows={
                                declaracionesState.map(

                                    (row) =>
                                    (<tr key={row.id}>
                                        <td key={`0${row.id}0`}>{row.tipo_declaracion}</td>
                                        <td key={`0${row.id}1`}>{row.fecha_presentacion}</td>
                                        <td key={`0${row.id}2`}>
                                            <button className="button is-small is-primary mx-2 is-outlined" onClick={ev => {
                                                setObjeto(row)
                                                setShowDecModalForm(true)
                                            }}>
                                                <span className="icon">
                                                    <FaRegEdit />
                                                </span>
                                            </button>
                                            <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                deleteDecHandler(row.id)
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
                        >

                            <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowDecModalForm(true)}>
                                <span className="icon">
                                    <IoIosAddCircleOutline />
                                </span>
                            </button>
                        </OptionCard>

                    </div>}
                </div>

                {expedienteState?.detalle && expedienteState?.detalle.length > 0 && <div className="columns is-centered">
                    <div className="column">
                        <OptionCard
                            title="Familiares"
                            columns={["Parentezco", "Apellidos", "Nombres", "Opciones"]}>
                            <button className="button  is-success mx-3 is-outlined" onClick={() => setShowFamModalForm(true)}>
                                <span className="icon">
                                    <IoIosAddCircleOutline />
                                </span>
                            </button></OptionCard>

                    </div>
                    <div className="column">
                        <OptionCard
                            title="Régimen disciplicario"
                            columns={["Año", "Mes", "Sanción", "Opciones"]}>
                            <button className="button  is-success mx-3 is-outlined" onClick={() => setShowRegModalForm(true)}>
                                <span className="icon">
                                    <IoIosAddCircleOutline />
                                </span>
                            </button></OptionCard>
                    </div>
                </div>}
            </div>
            {/*modal registro laboral */}
            {
                showModalForm && <ModalForm title={
                    objeto === null ?
                        `Registrando información laboral de: ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                        : `Editando información laboral de: ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                }
                    objeto={objeto} identificacion={location.state.identificacion}
                    handler={objeto === null ? postHandler : putHandler}>

                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={event => setError(null)} key={atob(`A${location.state.identificacion}`)}></button>
                    </Alert>}
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)} key={atob(`B${location.state.identificacion}`)}></button >
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setObjeto(null)
                            setShowModalForm(false)
                            dispatch(
                                loadExpedienteLaboral(location.state.identificacion)
                            )
                        }}
                            key={atob(`C${location.state.identificacion}`)}

                        ></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>

                </ModalForm>
            }
            {/*modal declaración*/}
            {
                showDecModalForm && <ModalDeclaracionPatrimonial
                    title={
                        objeto === null ?
                            `Registrando declaración patrimonial de: ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                            : `Editando declaración patrimonial de : ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                    }
                    objeto={objeto}
                    handler={objeto === null ? postDeclaracion : putDeclaracion}
                >   {error && <Alert type={'is-danger is-light'} content={error.message}>
                    <button className="delete" onClick={event => setError(null)} key={atob(`A${location.state.identificacion}`)}></button>
                </Alert>}
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)} key={atob(`B${location.state.identificacion}`)}></button >
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setObjeto(null)
                            setShowDecModalForm(false)
                            dispatch(
                                loadDeclaracionesPersona(location.state.identificacion)
                            )
                        }}
                            key={atob(`C${location.state.identificacion}`)}

                        ></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowDecModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>

                </ModalDeclaracionPatrimonial>
            }
            {/*Modal familiar */}
            {
                showFamModalForm &&
                <FamiliarModalForm
                    title={
                        objeto === null ?
                            `Registrando familiar de: ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                            : `Editando familiar de : ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                    }
                    objeto={objeto}
                >
                    <button className="button is-small is-danger mx-3"
                        onClick={ev => {
                            setShowFamModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </FamiliarModalForm>
            }
            {/*Régimen disciplinario*/}
            {
                showRegModalForm &&
                <RegimenModalForm
                    title={
                        objeto === null ?
                            `Registrando régimen disciplinario de: ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                            : `Editando régimen disciplinario de : ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`
                    }
                    objeto={objeto}
                    ingreso={persona.fecha_ingreso.slice(0,4)}
                >
                    <button className="button is-small is-danger mx-3"
                        onClick={() => {
                            setShowRegModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </RegimenModalForm>
            }
            {
                showConfirmDialog &&
                <ConfirmDialog info="el registro" title="Eliminar registro">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialog(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialog(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showConfirmDialogDec &&
                <ConfirmDialog info="la declaración" title="Eliminar declaración">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialogDec(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialogDec(false); doDeleteDec();
                    }}>Confirmar</button>
                </ConfirmDialog>

            }
        </>
    )


}

export default ListaExpediente