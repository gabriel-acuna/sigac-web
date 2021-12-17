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
import { postFamiliar, putFamiliar, deleteFamiliar, loadFamiliares } from '../../store/dth/familiar_personal'
import { postRegimenes, putRegimenes, loadRegimenesDisciplinariosPorPersona, deleteRegimenes } from '../../store/dth/regimen_disciplinario'
import { postEvaluacionesPersonal, putEvaluacionesPersonal, deleteEvaluacionesPersonal, loadEvaluacionesPersonal } from '../../store/dth/evaluacion_desempeño'
import { logOut } from '../../store/user'
import Alert from '../Alert'
import ConfirmDialog from '../ConfirmDialog'
import TabContent from '../TabContent'
import ModalDeclaracionPatrimonial from './modalDeclaracion'
import RegimenModalForm from './modalRegimen'
import FamiliarModalForm from './modalFamiliar'
import EvaluacionModalForm from './modalEvaluacion'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../TabPanel';

let ListaExpediente = (props) => {
    const location = useLocation()
    let expedienteState = useSelector(state => state.expediente.data.expediente)
    let declaracionesState = useSelector(state => state.declaraciones.data.declaraciones)
    let familiaresState = useSelector(state => state.familiares.data.familiares)
    let regimenDisciplinarioState = useSelector(state => state.regimenesDisciplinarios.data.regimenes)
    let evaluacionesState = useSelector(state => state.evaluacionesPersonal.data.evaluaciones)
    const navigate = useNavigate()
    const [persona] = useState(location.state)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(0)
    const [objeto, setObjeto] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showDecModalForm, setShowDecModalForm] = useState(false)
    const [showFamModalForm, setShowFamModalForm] = useState(false)
    const [showRegModalForm, setShowRegModalForm] = useState(false)
    const [showEvaModalForm, setShowEvaModalForm] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showConfirmDialogDec, setShowConfirmDialogDec] = useState(false)
    const [showConfirmDialogFam, setShowConfirmDialogFam] = useState(false)
    const [showConfirmDialogReg, setShowConfirmDialogReg] = useState(false)
    const [response, setResponse] = useState(null)
    const [deteteResponse, setDeleteResponse] = useState(null)
    const [error, setError] = useState(null)
    const [id, setId] = useState(null)

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(
        () => {
            location.state?.identificacion && dispatch(
                loadExpedienteLaboral(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadDeclaracionesPersona(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadFamiliares(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadRegimenesDisciplinariosPorPersona(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadEvaluacionesPersonal(location.state.identificacion)
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

    const deleteFamHandler = (id) => {
        setId(id)
        setShowConfirmDialogFam(true)
    }

    const deleteRegHandler = (id) => {
        setId(id)
        setShowConfirmDialogReg(true)
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

    let doDeleteFam = () => {
        dispatch(
            deleteFamiliar(id)

        ).unwrap()
            .then(resp => {
                setDeleteResponse(resp)
                dispatch(
                    loadFamiliares(persona.identificacion)
                )


            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteReg = () => {
        dispatch(
            deleteRegimenes(id)

        ).unwrap()
            .then(resp => {
                setDeleteResponse(resp)
                dispatch(
                    loadRegimenesDisciplinariosPorPersona(persona.identificacion)
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

    let postFamiliarHandler = (data) => {
        dispatch(
            postFamiliar({ idPersona: persona.identificacion, ...data })
        ).unwrap().then(
            (resp) => setResponse(resp)
        ).catch(
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

    let putFamiliarHandler = (data) => {
        dispatch(
            putFamiliar({ id: objeto.id, ...data })
        ).unwrap()
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

    let postRegimenHandler = (data) => {
        dispatch(postRegimenes({ persona: persona.identificacion, ...data }))
            .unwrap().then(
                (resp) => setResponse(resp)
            ).catch(
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

    let putRegimenHandler = (data) => {
        dispatch(putRegimenes({ id: objeto.id, persona: persona.identificacion, ...data }))
            .unwrap().then(
                (resp) => setResponse(resp)
            ).catch(
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
                <div className="columns is-centered">
                    <div className="column is-half mt-3">
                        <div className=" panel is-info">
                            <p className="panel-heading is-size-6">
                                <span className="icon" style={{ cursor: 'pointer' }}
                                    onClick={event => {
                                        dispatch(clearData())
                                        navigate(-1)

                                    }}>

                                    <IoIosArrowBack />


                                </span>
                                Datos personales <span style={{ cursor: 'pointer' }}><Link to="cv" state={location.state}><span className="icon"><ImProfile /></span></Link></span></p>
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
                        <Tab label="Registro laboral" {...a11yProps(0)} sx={{ textTransform: 'none' }} />
                        {expedienteState?.detalle && expedienteState?.detalle.length && <Tab label="Declaraciones patrimoniales" {...a11yProps(1)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length && <Tab label="Familiares" {...a11yProps(2)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length && <Tab label="Régimen disciplinario" {...a11yProps(3)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length && <Tab label="Evaluaciones de desempeño" {...a11yProps(4)} sx={{ textTransform: 'none' }} />}
                    </Tabs>

                </Box>
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
                <TabPanel value={activeTab} index={0}>


                    <TabContent
                        title="Registro laboral"
                        desc="registros laborales"
                        noData="No hay registros laborales"
                        columns={[
                            { key: 'numero_documento', text: 'No. Doc.' },
                            { key: 'fecha_inicio', text: 'Inicio', sortable: true },
                            { key: 'fecha_fin', text: 'Fin' },
                            { key: 'opciones', text: 'Opciones' }

                        ]}

                        expandir={false}
                        rows={
                            expedienteState?.detalle.map(



                                (row, index) => {
                                    return {
                                        id: row.id,
                                        numero_documento: row.numero_documento,
                                        fecha_inicio: row.fecha_inicio,
                                        fecha_fin: row.fecha_fin,
                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                            setObjeto(row)
                                            setShowModalForm(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                            deleteHandler(row.id)
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
                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowModalForm(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>

                    </TabContent>


                </TabPanel>
                <TabPanel value={activeTab} index={1}>

                    <TabContent title="Declaraciones patrimoniales"
                        columns={[
                            { key: 'tipo_declaracion', text: 'Tipo' },
                            { key: 'fecha_presentacion', text: 'Fecha presentación' },
                            { key: 'opciones', text: 'Opciones' }]}
                        desc="declaraciones"
                        noData="No hay declaraciones patrimoniales registradas"
                        rows={
                            declaracionesState.map(

                                (row) => {
                                    return {
                                        id: row.id,
                                        tipo_declaracion: row.tipo_declaracion,
                                        fecha_presentacion: row.fecha_presentacion,
                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                            setObjeto(row)
                                            setShowDecModalForm(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                            deleteDecHandler(row.id)
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

                        <button className="button  is-success mx-3 is-outlined" onClick={ev => setShowDecModalForm(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                    </TabContent>

                </TabPanel>


                <TabPanel value={activeTab} index={2}>

                    <TabContent
                        title="Familiares"
                        desc="familiares"
                        noData="No hay familiares registrados"
                        columns={[{ key: "parentesco", text: "Parentesco" },
                        { key: "apellidos", text: "Apellidos" },
                        { key: "nombres", text: "Nombres" },
                        { key: "opciones", text: "Opciones" }]}
                        rows={
                            familiaresState.map(
                                row => {
                                    return {
                                        id: row.id,
                                        parentesco: row.parentesco,
                                        apellidos: row.apellidos,
                                        nombres: row.nombres,
                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                            setObjeto(row)
                                            setShowFamModalForm(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                            deleteFamHandler(row.id)
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

                        <button className="button  is-success mx-3 is-outlined" onClick={() => setShowFamModalForm(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button></TabContent>

                </TabPanel>
                <TabPanel value={activeTab} index={3}>
                    <TabContent
                        title="Régimen disciplicario"
                        desc="sanciones"
                        noData="No hay sanciones registradas"
                        columns={[{ key: "anio_sancion", text: "Año" },
                        { key: "mes_sancion", text: "Mes" },
                        { key: "sancion", text: "Sanción" },
                        { key: "opciones", text: "Opciones" }]}
                        rows={
                            regimenDisciplinarioState.map(
                                row => {
                                    return {
                                        id: row.id,
                                        anio_sancion: row.anio_sancion,
                                        mes_sancion: row.mes_sancion,
                                        sancion: row.sancion.sancion,
                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                            setObjeto(row)
                                            setShowRegModalForm(true)
                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                            deleteRegHandler(row.id)
                                        }}>
                                            <span className="icon">
                                                <AiOutlineDelete />
                                            </span>
                                        </button>]
                                    }
                                }
                            )
                        }>
                        <button className="button  is-success mx-3 is-outlined" onClick={() => setShowRegModalForm(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button></TabContent>
                </TabPanel>
                <TabPanel value={activeTab} index={4}>
                    <TabContent
                        title="Evaluaciones de desempeño"
                        desc="evaluaciones"
                        noData="No hay evaluaciones registradas"
                        columns={[{ key: "desde", text: "Desde" },
                        { key: "hasta", text: "Hasta" },
                        { key: "puntaje", text: "Pun    taje" },
                        { key: "opciones", text: "Opciones" }]}
                        rows={
                            evaluacionesState.map(
                                row => {
                                    return {
                                        id: row.id,
                                        desde: row.desde,
                                        hasta: row.hasta,
                                        puntaje: row.puntaje,
                                        opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                            setObjeto(row)

                                        }}>
                                            <span className="icon">
                                                <FaRegEdit />
                                            </span>
                                        </button>,
                                        <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={() => {
                                            setObjeto(row)
                                            setShowEvaModalForm(true)
                                        }}>
                                            <span className="icon">
                                                <AiOutlineDelete />
                                            </span>
                                        </button>]
                                    }
                                }
                            )
                        }>
                        <button className="button  is-success mx-3 is-outlined" onClick={()=>{setShowEvaModalForm(true)}}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button></TabContent>
                </TabPanel>

            </div>
            {/*modal registro laboral */}
            {
                showModalForm && <ModalForm title={
                    objeto === null ?
                        `Registrando información laboral de: `
                        : `Editando información laboral de: `
                }
                    objeto={objeto} identificacion={location.state.identificacion}
                    handler={objeto === null ? postHandler : putHandler} persona={persona}>

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
                            `Registrando declaración patrimonial de: `
                            : `Editando declaración patrimonial de : `
                    }
                    objeto={objeto}
                    persona={persona}
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
                            `Registrando familiar de: `
                            : `Editando familiar de : `
                    }
                    objeto={objeto}
                    persona={persona}
                    handler={objeto === null ? postFamiliarHandler : putFamiliarHandler}
                >
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
                            setShowFamModalForm(false)
                            dispatch(
                                loadFamiliares(location.state.identificacion)
                            )
                        }}
                            key={atob(`C${location.state.identificacion}`)}

                        ></button>
                    </Alert>}

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
                            `Registrando régimen disciplinario de: `
                            : `Editando régimen disciplinario de : `
                    }
                    objeto={objeto}
                    persona={persona}
                    ingreso={persona.fecha_ingreso.slice(0, 4)}
                    handler={objeto === null ? postRegimenHandler : putRegimenHandler}
                >
                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={event => setError(null)} key={atob(`X${location.state.identificacion}`)}></button>
                    </Alert>}
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)} key={atob(`O${location.state.identificacion}`)}></button >
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setObjeto(null)
                            setShowRegModalForm(false)
                            dispatch(
                                loadRegimenesDisciplinariosPorPersona(location.state.identificacion)
                            )
                        }}
                            key={atob(`L${location.state.identificacion}`)}

                        ></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3"
                        onClick={() => {
                            setShowRegModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </RegimenModalForm>
            }
            {/*Evaluación de desempeño*/}
            {
                showEvaModalForm &&
                <EvaluacionModalForm title={
                    objeto === null ?
                        `Registrando evaluación de desempeño de: `
                        : `Editando evaluación de desempeño de : `
                }
                    objeto={objeto}
                    persona={persona}
                >
                     {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={event => setError(null)} key={atob(`TT${location.state.identificacion}`)}></button>
                    </Alert>}
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)} key={atob(`N${location.state.identificacion}`)}></button >
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setObjeto(null)
                            setShowEvaModalForm(false)
                            dispatch(
                                loadEvaluacionesPersonal(location.state.identificacion)
                            )
                        }}
                            key={atob(`W${location.state.identificacion}`)}

                        ></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3"
                        onClick={() => {
                            setShowEvaModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </EvaluacionModalForm>
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
            {
                showConfirmDialogFam &&
                <ConfirmDialog info="el familiar" title="Eliminar familiar">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialogFam(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialogFam(false); doDeleteFam();
                    }}>Confirmar</button>
                </ConfirmDialog>

            }

            {
                showConfirmDialogReg &&
                <ConfirmDialog info="la sanción" title="Eliminar régimen disciplinario">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialogReg(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialogReg(false); doDeleteReg();
                    }}>Confirmar</button>
                </ConfirmDialog>

            }
        </>
    )


}

export default ListaExpediente