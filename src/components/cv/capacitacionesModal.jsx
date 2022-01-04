import { Controller, useForm } from 'react-hook-form'
import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'
import { IoIosAdd } from 'react-icons/io'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loadPaises } from '../../store/core/paises'
import { logOut } from '../../store/user'
import { loadEventos, postEventos } from '../../store/cv/tipo_evento'
import TipoEventoModal from '../dth/cv/tipoEventoModal'
import AlertModal from '../AlertModal'



let CapacitacionModalForm = ({ title, handler, children, objeto }) => {


    const [showModal, setShowModal] = useState(false)
    const [respModal, setRespModal] = useState(null)
    const [errorModal, setErrorModal] = useState(null)
    const [typeCert, setTypeCert] = useState(null)

    const dispatch = useDispatch()
    const { register, reset, handleSubmit, formState: { errors }, setError, control, clearErrors, getValues, setValue } = useForm()
    let eventosState = useSelector(state => state.tiposEventos.data.eventos)
    let paisesState = useSelector(state => state.paises.data.paises)

    useEffect(
        () => {
            if (objeto !== null) {
                dispatch(loadPaises())
                dispatch(loadEventos())
                if (objeto !== null) {
                    setTypeCert(objeto.tipo_certificado)
                    reset({
                        tipoEvento: { label: objeto.tipo_evento.evento, value: objeto.tipo_evento.id },
                        nombre: objeto.nombre,
                        institucionOrganizadora: objeto.institucion_organizadora,
                        funcionEvento: objeto.funcion_evento,
                        pais: { label: objeto.pais.pais, value: objeto.pais.id },
                        lugar: objeto.lugar,
                        horas: objeto.horas,
                        fechaInicio: objeto.inicio,
                        fechaFin: objeto.fin,
                        tipoCertificado: objeto.tipo_certificado,
                        certificado: objeto.certificado

                    })
                }
            }
        }, [objeto, reset, dispatch]
    )
    let postEvento = (data) => {
        dispatch(postEventos({ evento: data.evento.toUpperCase() })).unwrap().then(
            (resp) => setRespModal(resp)
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
    useEffect(
        () => {
            dispatch(loadPaises())
            dispatch(loadEventos())
            if (objeto !== null) {
                setTypeCert(objeto.tipo_certificado)
                reset({
                    tipoEvento: { label: objeto.tipo_evento.evento, value: objeto.tipo_evento.id },
                    nombre: objeto.nombre,
                    institucionOrganizadora: objeto.institucion_organizadora,
                    funcionEvento: objeto.funcion_evento,
                    pais: { label: objeto.pais.pais, value: objeto.pais.id },
                    lugar: objeto.lugar,
                    horas: objeto.horas,
                    fechaInicio: objeto.inicio,
                    fechaFin: objeto.fin,
                    tipoCertificado: objeto.tipo_certificado,
                    certificado: objeto.certificado

                })
            }
        }, [objeto, reset, dispatch]
    )

    return (
        <>
            {<div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card" style={{ width: '80%' }}>
                    <header className="modal-card-head">
                        <span className="has-text-weight-bold is-italic" >{title}</span>


                    </header>
                    <div className="modal-card-body">

                        <form className="mt-4" onSubmit={handleSubmit(handler)}>
                            <div className="columns">
                                <div className="column">

                                    <label className="label is-small has-text-info">Tipo evento: <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}><IoIosAdd /></span></label>



                                    {errors.tipoEvento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de evento!</span>}
                                    <Controller
                                        name="tipoEvento"
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    style={{ marginTop: '-20px' }}
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    {...field}
                                                    options={eventosState.map(
                                                        evento => ({ label: evento.evento, value: evento.id })
                                                    )}
                                                />
                                            )
                                        }

                                    />

                                </div>
                                <div className="column">
                                    <label className="label is-small has-text-info">Nombre del evento</label>
                                    {errors.nombre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el nombre de la capacitación!</span>}

                                    <input type="text" className="input is-uppercase" {...register('nombre', { required: true })} />


                                </div>

                                <div className="column">
                                    <label className="label is-small has-text-info">Tipo Certificado</label>
                                    {errors.tipoCertificado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de tipoCertificado!</span>}
                                    <Controller
                                        name="tipoCertificado"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.tipo_certificado ? objeto.tipo_certificado : ''}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup aria-label="tipo certificado" {...field} row
                                                    onChange={ev => {
                                                        setValue("tipoCertificado", ev.currentTarget.value, { shouldValidate: true })
                                                        setTypeCert(ev?.currentTarget.value)
                                                    }}>
                                                    <FormControlLabel value="ASISTENCIA" label="ASISTENCIA" control={<Radio size="small" />}
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: 14,
                                                                fontWeight: 500
                                                            },
                                                        }} />
                                                    <FormControlLabel value="APROBACIÓN" label="APROBACIÓN" control={<Radio size="small" />}
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: 14,
                                                                fontWeight: 500
                                                            },
                                                        }} />

                                                    <FormControlLabel value="PARTICIPACIÓN" label="PARTICIPACIÓN" control={<Radio size="small" />}
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: 14,
                                                                fontWeight: 500
                                                            },
                                                        }} />
                                                </RadioGroup>
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            {
                                typeCert === 'PARTICIPACIÓN' &&
                                <div className="columns">
                                    <div className="column">
                                        <label className="label is-uppercase is-small">Función:</label>
                                        {errors.funcionEvento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la función que desempeñó!</span>}

                                        <input type="text" className="input is-uppercase" {...register('funcionEvento', { required: true })} />
                                    </div>

                                    <div className="column">
                                        <label className="label is-uppercase is-small">Certificado:</label>
                                        {errors.certificado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese una descroción del certificado!</span>}

                                        <input type="text" className="input is-uppercase" {...register('certificado')} />
                                    </div>

                                </div>

                            }
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small has-text-info">Institución organizadora</label>
                                    {errors.institucionOrganizadora && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la institucion organizadora!</span>}

                                    <div className="control">
                                        <input type="text" className="input is-uppercase" {...register('institucionOrganizadora', { required: true })} />
                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small has-text-info"> País</label>

                                    <Controller
                                        name="pais"
                                        control={control}

                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select


                                                placeholder="Seleccione"
                                                isClearable


                                                {...field}


                                                options={
                                                    paisesState.map(
                                                        (p) => ({ value: p.id, label: p.pais, key: p.id }))
                                                }

                                                onChange={(ev) => setValue('pais', ev, { shouldValidate: true })}


                                            />
                                        )}
                                    />
                                </div>
                            </div>



                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small has-text-info">Lugar</label>
                                    {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde se llevó a cabo el evento!</span>}
                                    <div className="control">
                                        <input type="text" className="input is-uppercase" {...register('lugar', { required: true })} />
                                    </div>

                                </div>


                                <div className="column">
                                    <label className="label is-small has-text-info">Horas</label>
                                    {errors.horas && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese las horas de capacitación!</span>}
                                    <div className="control">
                                        <input type="number" min="1" className="input" {...register('horas', { required: true })} />
                                    </div>

                                </div>

                                <div className="column">
                                    <label className="label is-small has-text-info">Fecha inicio</label>
                                    {errors.fechaInicio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio del evento!</span>}
                                    {errors.fecha_ingreso_ies?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de inicio no puede ser mayor a la fecha actual!</span>}
                                    <div className="control">
                                        <input type="date" className="input" {...register('fechaInicio', { required: true })}
                                            onChange={
                                                ev => {

                                                    clearErrors('fechaInicio')
                                                    if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) > new Date()) {
                                                        setError("fechaInicio", {
                                                            type: 'max'

                                                        })
                                                    }
                                                }} />
                                    </div>

                                </div>

                                <div className="column">
                                    <label className="label is-small has-text-info">Fecha fin</label>
                                    {errors.fechaFin?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.fechaFin.message}</span>}
                                    {errors.fechaFin?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, ingrese la fecha de finalización!</span>}
                                    <div className="control">
                                        <input type="date" className="input" {...register('fechaFin', { required: true })}

                                            onChange={
                                                ev => {
                                                    clearErrors('fechaFin')
                                                    if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) < new Date(getValues('fechaInicio'))) {
                                                        setError("fechaFin", {
                                                            type: 'min',
                                                            message: 'La fecha de fin debe ser mayor a la feha de inicio'
                                                        })
                                                    }
                                                }
                                            } />
                                    </div>

                                </div>

                            </div>

                            <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="control has-text-centered">
                                    <Fragment>
                                        {children}
                                    </Fragment>

                                    <button type="submit" className="button is-success is-small mx-3">Guardar</button>

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
            {showModal && <TipoEventoModal title="Registrar tipo evento" handler={postEvento}>

                <button className="button is-small is-danger mx-3" onClick={() => {
                    setShowModal(false)
                }}>Cancelar</button>
            </TipoEventoModal>}

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

export default CapacitacionModalForm;