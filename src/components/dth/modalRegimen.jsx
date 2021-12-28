import { useForm, Controller } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import Select from 'react-select'
import { IoIosAdd } from 'react-icons/io'
import { useState } from 'react'
import { postRegimenes, loadRegimenes } from '../../store/dth/regimen_laboral'
import { postSanciones, loadSanciones } from '../../store/dth/sanciones'
import { postModalidadesContractuales, loadModalidadesContractuales } from '../../store/dth/modalidad_contractual'
import { postEstadosSumarios, loadEstadosSumarios } from '../../store/dth/estado_sumario'
import ModalRegimen from './modalRegimenLaboral'
import ModalModalidadContractual from './modalModalidadContractual'
import ModalSancion from './modalSancion'
import ModalEstado from './modalEstadoSumario'
import AlertModal from '../AlertModal'
import { logOut } from '../../store/user'

let RegimenModalForm = ({ title, handler, children, objeto, ingreso, persona }) => {

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control, setError } = useForm()
    const SAN_TYPES = ["LEVES", "GRAVES"]
    const MESES = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
    const [showModalRegimen, setShowModalRegimen] = useState(false)
    const [showModalModalidad, setShowModalModalidad] = useState(false)
    const [showModalSancion, setShowModalSancion] = useState(false)
    const [showModalEstado, setShowModalEstado] = useState(false)
    const [respModal, setRespModal] = useState(null)
    const [errorModal, setErrorModal] = useState(null)
    const [santion, setSantion] = useState(null)
    const dispatch = useDispatch()

    let regimenesState = useSelector(state => state.regimenesLaborales.data.regimenes)
    let modalidadesState = useSelector(state => state.modalidadesContractuales.data.modalidades)
    let sancionesState = useSelector(state => state.sanciones.data.sanciones)
    let estadosSumariosState = useSelector(state => state.estadosSumarios.data.estados)

    useEffect(() => {
        dispatch(loadRegimenes())
        dispatch(loadModalidadesContractuales())
        dispatch(loadSanciones())
        dispatch(loadEstadosSumarios())
    }, [dispatch])

    let postRegimenlaboral = (data) => {
        dispatch(
            postRegimenes(
                {
                    regimen: data.regimen.toUpperCase()
                }
            )
        ).unwrap().then(
            (resp) => {
                setRespModal(resp)
                if (resp.type === 'success') {
                    dispatch(loadRegimenes())
                    setShowModalRegimen(false)
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


    let postModalidad = (data) => {
        dispatch(postModalidadesContractuales({
            modalidad: data.modalidad.toUpperCase()
        })).unwrap().then(
            (resp) => {
                setRespModal(resp)
                if (resp.type === 'success') {
                    dispatch(loadModalidadesContractuales())
                    setShowModalModalidad(false)
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

    let postSancion = (data) => {
        dispatch(
            postSanciones({
                sancion: data.sancion.toUpperCase()
            })
        ).unwrap().then(
            (resp) => {
                setRespModal(resp)
                if (resp.type === 'success') {
                    dispatch(loadSanciones())
                    setShowModalSancion(false)
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

    let postEstado = (data) => {
        dispatch(
            postEstadosSumarios({
                estado: data.estado.toUpperCase()
            })
        ).unwrap().then(
            (resp) => {
                setRespModal(resp)
                if (resp.type === 'success') {
                    dispatch(loadEstadosSumarios())
                    setShowModalEstado(false)
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
            <div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card" style={{ width: '80%' }}>
                    <header className="modal-card-head">
                        <p className="has-text-weight-bold is-italic" >{title}
                            <span className="has-text-weight-bold is-italic has-text-info">{persona && `  ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`}</span>
                        </p>
                    </header>
                    <section className="modal-card-body">
                        <form className="field" onSubmit={handleSubmit(handler)}>
                            <div className="columns">

                                <div className="column">
                                    <label className="label is-small has-text-info">Año</label>
                                    {errors.año?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese el año!</span>}
                                    {errors.año?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡El año no puede ser menor al año que ingresó a la institución!</span>}
                                    {errors.año?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡El año no puede ser mayor al año actual!</span>}

                                    <input type="number" {...register("año", { required: true })} className="input" onChange={
                                        ev => {
                                            clearErrors("año")
                                            if (ev.target.value !== null && ev.target.value !== '' && parseInt(ev.target.value) < parseInt(ingreso)) {
                                                setError("año", {
                                                    type: 'min'
                                                })
                                            } else if (ev.target.value !== null && ev.target.value !== '' && parseInt(ev.target.value) > new Date().getFullYear()) {
                                                setError("año", {
                                                    type: 'max'
                                                })
                                            }
                                        }}
                                        defaultValue={objeto?.anio_sancion ? objeto?.anio_sancion : new Date().getFullYear()}
                                    />

                                </div>
                                <div className="column">
                                    <label className="label is-small has-text-info">Mes</label>
                                    {errors.mesSancion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el mes!</span>}
                                    <Controller
                                        name="mesSancion"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.mes_sancion ? { label: objeto.mes_sancion, value: objeto.mes_sancion } : null}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    menuPlacement='auto'
                                                    {...field}
                                                    placeholder="Seleccione el mes"
                                                    options={
                                                        MESES.map((m, ind) => ({ label: m, value: m, key: `month-000${ind}` }))
                                                    }
                                                />
                                            )
                                        }
                                    />

                                </div>




                                <div className="column">
                                    <label className="label is-small has-text-info">Régimen laboral <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalRegimen(true)}><IoIosAdd /></span></label>
                                    {errors.modalidadContractual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el régimen laboral!</span>}
                                    <Controller
                                        name="regimenLaboral"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.regimen_laboral ? { label: objeto.regimen_laboral.regimen, value: objeto.regimen_laboral.id } : null}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    options={
                                                        regimenesState.map(
                                                            regimen => ({ label: regimen.regimen, value: regimen.id })
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />

                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small has-text-info">Modalidad contractual <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalModalidad(true)}><IoIosAdd /></span></label>
                                    {errors.modalidadContractual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la modalidad contractual!</span>}
                                    <Controller
                                        name="modalidadContractual"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.modalidad_contractual ? { label: objeto.modalidad_contractual.modalidad, value: objeto.modalidad_contractual.id } : null}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    options={
                                                        modalidadesState.map(
                                                            modalidad => ({ label: modalidad.modalidad, value: modalidad.id })
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />

                                </div>
                                <div className="column">
                                    <label className="label is-small has-text-info">Tipo falta </label>
                                    {errors.tipoFalta && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el tipo de falta!</span>}

                                    <Controller
                                        name="tipoFalta"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.tipo_falta ? objeto.tipo_falta : ''}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup row {...field} onChange={(ev) => setValue("tipoFalta", ev.target.value)}>
                                                    {
                                                        SAN_TYPES.map(
                                                            (t, ind) => (
                                                                <FormControlLabel
                                                                    key={`par-000${ind}`}
                                                                    value={t}
                                                                    control={<Radio size="small" />}
                                                                    label={t}
                                                                    sx={{
                                                                        '& .MuiFormControlLabel-label': {
                                                                            fontSize: 14,
                                                                            fontWeight: 500
                                                                        },
                                                                    }}
                                                                />
                                                            )
                                                        )
                                                    }
                                                </RadioGroup>
                                            )
                                        }

                                    />
                                </div>

                                <div className="column">
                                    <label className="label is-small has-text-info">Sanción <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalSancion(true)}><IoIosAdd /></span></label>
                                    {errors.sancion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la sanción!</span>}
                                    <Controller
                                        name="sancion"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.sancion ? { label: objeto.sancion.sancion, value: objeto.sancion.id } : null}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    onChange={value => {
                                                        setSantion(value)
                                                        setValue("sancion", value, { shouldValidate: true })
                                                    }}
                                                    options={
                                                        sancionesState.map(
                                                            sancion => ({ label: sancion.sancion, value: sancion.id })
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />

                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small has-text-info">Aplica sumario</label>
                                    {errors.tipoFalta && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el tipo de falta!</span>}

                                    <Controller
                                        name="aplicaSumario"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.aplica_sumario ? objeto.aplica_sumario : ''}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup row {...field} onChange={(ev) => setValue("aplicaSumario", ev.target.value)}>

                                                    <FormControlLabel
                                                        key={`ap-sum-0001`}
                                                        value="SI"
                                                        control={<Radio size="small" />}
                                                        label="SI"
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: 14,
                                                                fontWeight: 500
                                                            },
                                                        }}
                                                    />

                                                    <FormControlLabel
                                                        key={`ap-sum-0002`}
                                                        value="NO"
                                                        control={<Radio size="small" />}
                                                        label="NO"
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: 14,
                                                                fontWeight: 500
                                                            },
                                                        }}
                                                    />


                                                </RadioGroup>
                                            )
                                        }

                                    />
                                </div>
                                <div className="column">
                                    <label className="label is-small has-text-info">Estado sumario <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalEstado(true)}><IoIosAdd /></span></label>
                                    {errors.estadoSumario && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la sanción!</span>}
                                    <Controller
                                        name="estadoSumario"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.estado_sumario ? { label: objeto.estado_sumario.estado, value: objeto.estado_sumario.id } : null}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    options={
                                                        estadosSumariosState.map(
                                                            estado => ({ label: estado.estado, value: estado.id })
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />

                                </div>

                                {santion?.label === 'DESTITUCIÓN' && <div className="column">
                                    <label className="label is-small has-text-info">Número de sentencia</label>
                                    {errors.numeroSentencia && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la sanción!</span>}
                                    <input type="text" className="input" {...register("numeroSentencia", { required: true })} />

                                </div>}

                            </div>
                            <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="control has-text-centered">
                                    <Fragment>
                                        {children}
                                    </Fragment>

                                    <button type="submit" className="button is-success is-small mx-3" >Guardar</button>

                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div >
            {
                showModalRegimen && <ModalRegimen
                    title="Registrar régimen laboral"
                    handler={postRegimenlaboral} >
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalRegimen(false)
                    }}>Cancelar</button>

                </ModalRegimen>
            }
            {
                showModalModalidad && <ModalModalidadContractual title="Registar modalidad contractual" handler={postModalidad}>
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalModalidad(false)
                    }}>Cancelar</button>

                </ModalModalidadContractual>
            }

            {
                showModalSancion && <ModalSancion title="Registrar sanción" handler={postSancion}>
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalSancion(false)
                    }}>Cancelar</button>

                </ModalSancion>
            }

            {
                showModalEstado && <ModalEstado title="Registrar estado sumario" handler={postEstado}>
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalEstado(false)
                    }}>Cancelar</button>
                </ModalEstado>
            }
            {
                respModal?.type && <AlertModal type={respModal.type} message={respModal.content}>
                    <button className="delete" aria-label="close" onClick={() => setRespModal(null)}></button>
                </AlertModal>
            }
            {
                errorModal?.message && <AlertModal type={'danger'} message={errorModal.message}>
                    <button className="delete" aria-label="close" onClick={() => setErrorModal(null)}></button>
                </AlertModal>
            }
        </>
    )
}
export default RegimenModalForm