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
import { postInformacionReproductiva, putInformacionReproductiva, deleteInformacionReproductiva, loadInformacionReproductivaPersonal } from '../../store/dth/informacion_reproductiva'
import { postRegimenes, putRegimenes, loadRegimenesDisciplinariosPorPersona, deleteRegimenes } from '../../store/dth/regimen_disciplinario'
import { postEvaluacionesPersonal, putEvaluacionesPersonal, deleteEvaluacionesPersonal, loadEvaluacionesPersonal } from '../../store/dth/evaluacion_desempeño'
import { postSutitutos, putSutitutos, deleteSustitutos, loadSustitutosPersonal } from '../../store/dth/sustituto_personal'
import { logOut } from '../../store/user'
import AlertModal from '../AlertModal'
import ConfirmDialog from '../ConfirmDialog'
import TabContent from '../TabContent'
import ModalDeclaracionPatrimonial from './modalDeclaracion'
import RegimenModalForm from './modalRegimen'
import FamiliarModalForm from './modalFamiliar'
import InformacionModal from './modalInformacionReproductiva'
import EvaluacionModalForm from './modalEvaluacion'
import SustitutoModalForm from './modalSustituto'
import TabPanel from '../TabPanel';
import AsideMenu from '../AsideMenu'
import MenuItem from '../MenuItem'

let ListaExpediente = (props) => {
    const location = useLocation()
    let expedienteState = useSelector(state => state.expediente.data.expediente)
    let declaracionesState = useSelector(state => state.declaraciones.data.declaraciones)
    let familiaresState = useSelector(state => state.familiares.data.familiares)
    let informacionReproductivaState = useSelector(state => state.informacionReproductiva.data.informacion)
    let regimenDisciplinarioState = useSelector(state => state.regimenesDisciplinarios.data.regimenes)
    let evaluacionesState = useSelector(state => state.evaluacionesPersonal.data.evaluaciones)
    let sustitutosState = useSelector(state => state.sustitutosPersonal.data.sustitutos)
    const navigate = useNavigate()
    const [persona] = useState(location.state)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState(0)
    const [objeto, setObjeto] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showDecModalForm, setShowDecModalForm] = useState(false)
    const [showFamModalForm, setShowFamModalForm] = useState(false)
    const [showInfModalForm, setShowInfModalForm] = useState(false)
    const [showRegModalForm, setShowRegModalForm] = useState(false)
    const [showEvaModalForm, setShowEvaModalForm] = useState(false)
    const [showSusModalForm, setShowSusModalForm] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [showConfirmDialogDec, setShowConfirmDialogDec] = useState(false)
    const [showConfirmDialogFam, setShowConfirmDialogFam] = useState(false)
    const [showConfirmDialogInf, setShowConfirmDialogInf] = useState(false)
    const [showConfirmDialogReg, setShowConfirmDialogReg] = useState(false)
    const [showConfirmDialogEva, setShowConfirmDialogEva] = useState(false)
    const [showConfirmDialogSus, setShowConfirmDialogSus] = useState(false)
    const [response, setResponse] = useState(null)
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
            location.state?.identificacion && location.state.sexo === 'MUJER' && dispatch(
                loadInformacionReproductivaPersonal(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadRegimenesDisciplinariosPorPersona(location.state.identificacion)
            )
            location.state?.identificacion && dispatch(
                loadEvaluacionesPersonal(location.state.identificacion)
            )
            location.state?.identificacion && location.state?.sustituto === 'SI' && dispatch(
                loadSustitutosPersonal(location.state.identificacion)
            )
        }, [dispatch, location.state?.identificacion, location.state?.sexo, location.state?.sustituto]
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

    const deleteInfHandler = (id) => {
        setId(id)
        setShowConfirmDialogInf(true)
    }

    const deleteRegHandler = (id) => {
        setId(id)
        setShowConfirmDialogReg(true)
    }

    const deleteEvaHandler = (id) => {
        setId(id)
        setShowConfirmDialogEva(true)
    }

    const deleteSusHandler = (id) => {
        setId(id)
        setShowConfirmDialogSus(true)
    }

    let postHandler = (data) => {
        let detalle = { id_persona: location.state.identificacion, detalle: data }
        if (data.tipoPersonal === 'PROFESOR') {
            dispatch(
                postDetalleExpedienteProfesor(detalle)
            ).unwrap()
                .then(
                    resp => {
                        setResponse(resp)
                        if (resp.type === 'success') {
                            dispatch(loadExpedienteLaboral(persona.identificacion))
                            setShowModalForm(false)
                        }
                    }
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
                    (resp) => {
                        setResponse(resp)
                        if (resp.type === 'success') {
                            dispatch(loadExpedienteLaboral(persona.identificacion))
                            setShowModalForm(false)
                        }
                    }
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
                resp => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadExpedienteLaboral(persona.identificacion))
                        setShowModalForm(false)
                        setObjeto(null)
                    }
                }
            ).catch(err => console.log(err))
    }

    let doDelete = () => {
        dispatch(
            deleteItemDetalle(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)


            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteDec = () => {
        dispatch(
            deleteDeclaraciones(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
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
                setResponse(resp)
                dispatch(
                    loadFamiliares(persona.identificacion)
                )


            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteInf = () => {
        dispatch(
            deleteInformacionReproductiva(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadInformacionReproductivaPersonal(persona.identificacion)
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
                setResponse(resp)
                dispatch(
                    loadRegimenesDisciplinariosPorPersona(persona.identificacion)
                )


            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteEva = () => {
        dispatch(
            deleteEvaluacionesPersonal(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadEvaluacionesPersonal(persona.identificacion)
                )


            }).catch(
                (err) => console.error(err)
            )
    }

    let doDeleteSus = () => {
        dispatch(
            deleteSustitutos(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadSustitutosPersonal(persona.identificacion)
                )


            }).catch(
                (err) => console.error(err)
            )
    }

    let postDeclaracion = (data) => {
        dispatch(postDeclaraciones({ persona: location.state.identificacion, ...data })).unwrap()
            .then(
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadDeclaracionesPersona(persona.identificacion))
                        setShowDecModalForm(false)
                    }
                }
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
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadDeclaracionesPersona(persona.identificacion))
                        setShowDecModalForm(false)
                        setObjeto(null)
                    }
                }
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
            (resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadFamiliares(persona.identificacion))
                    setShowFamModalForm(false)
                }
            }
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
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadFamiliares(persona.identificacion))
                        setShowFamModalForm(false)
                        setObjeto(null)
                    }
                }
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

    let postInfromacionHandler = (data) => {
        dispatch(
            postInformacionReproductiva({ id_persona: persona.identificacion, ...data })
        ).unwrap().then(
            (resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadInformacionReproductivaPersonal(persona.identificacion))
                    setShowInfModalForm(false)
                }
            }
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

    let putInfromacionHandler = (data) => {
        dispatch(
            putInformacionReproductiva({ id: objeto.id, id_persona: persona.identificacion, ...data })
        ).unwrap().then(
            (resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadInformacionReproductivaPersonal(persona.identificacion))
                    setShowInfModalForm(false)
                    setObjeto(null)
                }
            }
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

    let postRegimenHandler = (data) => {
        dispatch(postRegimenes({ persona: persona.identificacion, ...data }))
            .unwrap().then(
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadRegimenesDisciplinariosPorPersona(persona.identificacion))
                        setShowRegModalForm(false)
                    }
                }
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
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadRegimenesDisciplinariosPorPersona(persona.identificacion))
                        setShowRegModalForm(false)
                        setObjeto(null)
                    }
                }
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

    let postEvaluacionHandler = (data) => {
        dispatch(postEvaluacionesPersonal({ id_persona: persona.identificacion, ...data }))
            .unwrap().then(
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadEvaluacionesPersonal(persona.identificacion))
                        setShowEvaModalForm(false)
                    }
                }
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

    let putEvaluacionHandler = (data) => {
        dispatch(putEvaluacionesPersonal({ id: objeto.id, id_persona: persona.identificacion, ...data }))
            .unwrap().then(
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadEvaluacionesPersonal(persona.identificacion))
                        setShowEvaModalForm(false)
                        setObjeto(null)

                    }
                }
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

    let postSustitutoHandler = (data) => {
        dispatch(postSutitutos({ idPersona: persona.identificacion, ...data }))
            .unwrap().then(
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadSustitutosPersonal(persona.identificacion))
                        setShowSusModalForm(false)
                    }
                }
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

    let putSustitutoHandler = (data) => {
        dispatch(putSutitutos({ id: objeto.id, ...data }))
            .unwrap().then(
                (resp) => {
                    setResponse(resp)
                    if (resp.type === 'success') {
                        dispatch(loadSustitutosPersonal(persona.identificacion))
                        setShowSusModalForm(false)
                        setObjeto(null)

                    }
                }
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
                                Datos personales  | <span style={{ cursor: 'pointer' }}><Link to="cv" state={location.state}><span className="icon"><ImProfile /></span> <span className='has-text-white' >Ver hoja de vida</span></Link></span></p>
                            <div className="panel-block has-background-info-light">
                                {persona &&
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', padding: '20px', columnGap: '50px' }}>

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
                {/* <Box>

                    <Tabs aria-label="basic tabs example"
                        value={activeTab} onChange={(ev, newVal) => setActiveTab(newVal)}
                        variant="scrollable"
                        scrollButtons="auto" >
                        <Tab label="Registro laboral" {...a11yProps(0)} sx={{ textTransform: 'none' }} />
                        {expedienteState?.detalle && expedienteState?.detalle.length > 0 && <Tab label="Declaraciones patrimoniales" {...a11yProps(1)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length > 0 && <Tab label="Familiares" {...a11yProps(2)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length > 0 && persona.sexo === 'MUJER' && <Tab label="Información reproductiva" {...a11yProps(3)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length > 0 && <Tab label="Régimen disciplinario" {...a11yProps(4)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length > 0 && <Tab label="Evaluaciones de desempeño" {...a11yProps(5)} sx={{ textTransform: 'none' }} />}
                        {expedienteState?.detalle && expedienteState?.detalle.length > 0 && persona.sustituto === 'SI' && <Tab label="Sustituto" {...a11yProps(6)} sx={{ textTransform: 'none' }} />}
                    </Tabs>

                </Box> */}
                <div className="columns">
                    <section className='column is-2'>
                        <AsideMenu background='#99ccff'>
                            <MenuItem label={"Registro laboral"} {...a11yProps(0)} onClick={(ev) => { setActiveTab(0) }} isActive={0 === activeTab} />
                            {expedienteState?.detalle && expedienteState?.detalle.length > 0
                                && <MenuItem label={"Declaraciones patrimoniales"} {...a11yProps(1)} onClick={(ev) => { setActiveTab(1) }} isActive={1 === activeTab} />}
                            {expedienteState?.detalle && expedienteState?.detalle.length > 0
                                && <MenuItem label={"Familiares"} {...a11yProps(2)} onClick={(ev) => { setActiveTab(2) }} isActive={2 === activeTab} />}
                            {expedienteState?.detalle && expedienteState?.detalle.length > 0 && persona.sexo === 'MUJER'
                                && <MenuItem label={"Información reproductiva"} {...a11yProps(3)} onClick={(ev) => { setActiveTab(3) }} isActive={3 === activeTab} />}
                            {expedienteState?.detalle && expedienteState?.detalle.length > 0
                                && <MenuItem label={"Régimen disciplinario"} {...a11yProps(4)} onClick={(ev) => { setActiveTab(4) }} isActive={4 === activeTab} />}
                            {expedienteState?.detalle && expedienteState?.detalle.length > 0
                                && <MenuItem label={"Evaluaciones de desempeño"} {...a11yProps(5)} onClick={(ev) => { setActiveTab(5) }} isActive={5 === activeTab} />}
                            {expedienteState?.detalle && expedienteState?.detalle.length > 0 && persona.sustituto
                                && <MenuItem label={"Sustituto"} {...a11yProps(6)} onClick={(ev) => { setActiveTab(6) }} isActive={6 === activeTab} />}


                        </AsideMenu>
                    </section>
                    <div className='column is-10'>
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
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                    deleteHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
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
                                    <span>Registrar</span>
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
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                    deleteDecHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
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
                                    <span>Registrar</span>
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
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                    deleteFamHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
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
                                    <span>Registrar</span>
                                </button></TabContent>

                        </TabPanel>

                        <TabPanel value={activeTab} index={3}>

                            <TabContent
                                title="Información reproductiva"
                                desc="información"
                                noData="No hay información reproductiva"
                                columns={[{ key: "estado", text: "Estado" },
                                { key: "inicio", text: "Inicio" },
                                { key: "fin", text: "Fin" },
                                { key: "opciones", text: "Opciones" }]}
                                rows={
                                    informacionReproductivaState.map(
                                        row => {
                                            return {
                                                id: row.id,
                                                estado: row.estado,
                                                inicio: row.inicio,
                                                fin: row.fin,
                                                opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                                    setObjeto(row)
                                                    setShowInfModalForm(true)
                                                }}>
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                    deleteInfHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
                                                        <AiOutlineDelete />
                                                    </span>
                                                </button>]
                                            }
                                        }
                                    )
                                }
                            >

                                <button className="button  is-success mx-3 is-outlined" onClick={() => setShowInfModalForm(true)}>
                                    <span className="icon">
                                        <IoIosAddCircleOutline />
                                    </span>
                                    <span>Registrar</span>
                                </button></TabContent>

                        </TabPanel>

                        <TabPanel value={activeTab} index={4}>
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
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                                                    deleteRegHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
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
                                    <span>Registrar</span>
                                </button></TabContent>
                        </TabPanel>
                        <TabPanel value={activeTab} index={5}>
                            <TabContent
                                title="Evaluaciones de desempeño"
                                desc="evaluaciones"
                                noData="No hay evaluaciones registradas"
                                columns={[{ key: "desde", text: "Desde" },
                                { key: "hasta", text: "Hasta" },
                                { key: "puntaje", text: "Puntaje" },
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
                                                    setShowEvaModalForm(true)

                                                }}>
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={() => {
                                                    deleteEvaHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
                                                        <AiOutlineDelete />
                                                    </span>
                                                </button>]
                                            }
                                        }
                                    )
                                }>
                                <button className="button  is-success mx-3 is-outlined" onClick={() => { setShowEvaModalForm(true) }}>
                                    <span className="icon">
                                        <IoIosAddCircleOutline />
                                    </span>
                                    <span>Registrar</span>
                                </button></TabContent>
                        </TabPanel>
                        <TabPanel value={activeTab} index={6}>
                            <TabContent
                                title="Sustitutos"
                                desc="sustitutos"
                                noData="No hay sustitutos registrados"
                                columns={[{ key: "nombres", text: "Nombres" },
                                { key: "apellidos", text: "Apellidos" },
                                { key: "numeroCarnet", text: "No. Carnet" },
                                { key: "opciones", text: "Opciones" }]}
                                rows={
                                    sustitutosState.map(
                                        row => {
                                            return {
                                                id: row.id,
                                                nombres: row.nombres,
                                                apellidos: row.apellidos,
                                                numeroCarnet: row.numero_carnet,
                                                opciones: [<button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                                                    setObjeto(row)
                                                    setShowSusModalForm(true)

                                                }}>
                                                    <span className="icon" title="Editar">
                                                        <FaRegEdit />
                                                    </span>
                                                </button>,
                                                <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={() => {
                                                    deleteSusHandler(row.id)
                                                }}>
                                                                 <span className="icon" title="Eliminar">
                                                        <AiOutlineDelete />
                                                    </span>
                                                </button>]
                                            }
                                        }
                                    )
                                }>
                                <button className="button  is-success mx-3 is-outlined" onClick={() => { setShowSusModalForm(true) }}>
                                    <span className="icon">
                                        <IoIosAddCircleOutline />
                                    </span>
                                </button></TabContent>

                        </TabPanel>

                    </div>
                </div>
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
                >
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

                    <button className="button is-small is-danger mx-3"
                        onClick={ev => {
                            setShowFamModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </FamiliarModalForm>
            }

            {/*Modal infromación reproductiva */}
            {
                showInfModalForm &&
                <InformacionModal
                    title={
                        objeto === null ?
                            `Registrando infromación reproductiva de: `
                            : `Editando infromación reproductiva de : `
                    }
                    objeto={objeto}
                    persona={persona}
                    handler={objeto === null ? postInfromacionHandler : putInfromacionHandler}
                >

                    <button className="button is-small is-danger mx-3"
                        onClick={() => {
                            setShowInfModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </InformacionModal>
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
                    handler={objeto === null ? postEvaluacionHandler : putEvaluacionHandler}
                >
                    <button className="button is-small is-danger mx-3"
                        onClick={() => {
                            setShowEvaModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </EvaluacionModalForm>
            }
            {/*Sustituto Personal*/}
            {
                showSusModalForm &&
                <SustitutoModalForm title={
                    objeto === null ?
                        `Registrando sustituto de: `
                        : `Editando sustituto de : `
                }
                    objeto={objeto}
                    persona={persona}
                    handler={objeto === null ? postSustitutoHandler : putSustitutoHandler}
                >
                    <button className="button is-small is-danger mx-3"
                        onClick={() => {
                            setShowSusModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                </SustitutoModalForm>
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
                showConfirmDialogInf &&
                <ConfirmDialog info="la información reproductiva" title="Eliminar información reproductiva">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialogInf(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialogInf(false); doDeleteInf();
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
            {
                showConfirmDialogEva &&
                <ConfirmDialog info="la sanción" title="Eliminar régimen disciplinario">

                    <button className="button is-small is-danger is-pulled-left" onClick={() => setShowConfirmDialogEva(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                        setShowConfirmDialogEva(false); doDeleteEva();
                    }}>Confirmar</button>
                </ConfirmDialog>

            }
            {
                showConfirmDialogSus &&
                <ConfirmDialog info="el sustituto" title="Eliminar sustituto">

                    <button className="button is-small is-danger is-pulled-left" onClick={() => setShowConfirmDialogSus(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                        setShowConfirmDialogSus(false); doDeleteSus();
                    }}>Confirmar</button>
                </ConfirmDialog>

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

export default ListaExpediente