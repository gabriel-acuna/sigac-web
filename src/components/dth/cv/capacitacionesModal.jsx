import { Controller, useForm } from 'react-hook-form'
import { Fragment, useEffect, useState } from 'react'
import Select from 'react-select'
import { IoIosAdd } from 'react-icons/io'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { loadPaises } from '../../../store/core/paises'
import { logOut } from '../../../store/user'
import { loadEventos, postEventos } from '../../../store/cv/tipo_evento'
import TipoEventoModal from './tipoEventoModal'
import Alert from '../../Alert'

let CapacitacionModalForm = ({ title, handler, children, objeto, persona }) => {

    const [showModal, setShowModal] = useState(false)
    const [respModal, setRespModal] = useState(null)
    const [errorModal, setErrorModal] = useState(null)
    const [typeCert, setTypeCert] = useState(null)
    
    const dispatch = useDispatch()
    const { register, reset, handleSubmit, formState: { errors }, setError, control, clearErrors, getValues, setValue } = useForm()
    let eventosState = useSelector(state => state.tiposEventos.data.eventos)
    let paisesState = useSelector(state => state.paises.data.paises)


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
                reset({
                    tipoEvento: objeto.tipo_evento,
                    institucionOrganizadora: objeto.institucion_organizadora,
                    lugar: objeto.lugar,
                    horas: objeto.horas,
                    fechaInicio: objeto.inicio,
                    fechaFin: objeto.fin,
                    tipoCertificado: objeto.tipo_certificado

                })
            }
        }, [objeto, reset]
    )
    console.log(respModal);
    return (
        <>
            {<div className="modal is-active">
                <div className="modal-background"></div>
                <div className="modal-card" style={{ width: '80%' }}>
                    <header className="modal-card-head">
                        <span className="has-text-weight-bold is-italic" >{title} {persona && `${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`}</span>


                    </header>
                    <div className="modal-card-body">

                        <form className="mt-4" onSubmit={handleSubmit(handler)}>
                            <div className="columns">
                                <div className="column">

                                    <label className="label is-small is-uppercase">Tipo evento: <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModal(true)}><IoIosAdd /></span></label>



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
                                    <label className="label is-small is-uppercase">Nombre del evento</label>
                                    {errors.nombre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el nombre de la capacitación!</span>}

                                    <input type="text" className="input is-uppercase" {...register('nombre', { required: true })} />


                                </div>

                                <div className="column">
                                    <label className="label is-small is-uppercase">Tipo Certificado</label>
                                    {errors.tipoCertificado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de tipoCertificado!</span>}
                                    <Controller
                                        name="tipoCertificado"
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup aria-label="tipo certificado" {...field} row
                                                    onChange={ev => { setValue("tiipoCertificado",ev.currentTarget.value, { shouldValidate: true })
                                                    setTypeCert(ev?.currentTarget.value) }}>
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
                                typeCert ==='PARTICIPACIÓN' && 
                                <div className="columns">
                                    <div className="column">
                                        <label className="label is-uppercase is-small">Función:</label>
                                        {errors.funcionEvento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la función que desempeñó!</span>}

                                        <input type="text" className="input" {...register('funcionEvento', {required:true})} />
                                    </div>

                                    <div className="column">
                                        <label className="label is-uppercase is-small">Certificado:</label>
                                        {errors.funcionEvento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la función que desempeñó!</span>}

                                        <input type="text" className="input" {...register('funcionEvento')} />
                                    </div>
                                    
                                </div>
                                
                            }
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small is-uppercase">Institución organizadora</label>
                                    {errors.institucionOrganizadora && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la institucion organizadora!</span>}

                                    <div className="control">
                                        <input type="text" className="input is-uppercase" {...register('institucionOrganizadora', { required: true })} />
                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small is-uppercase"> País</label>

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
                                    <label className="label is-small is-uppercase">Lugar</label>
                                    {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde se llevó a cabo el evento!</span>}
                                    <div className="control">
                                        <input type="text" className="input is-uppercase" {...register('lugar', { required: true })} />
                                    </div>

                                </div>


                                <div className="column">
                                    <label className="label is-small is-uppercase">Horas</label>
                                    {errors.horas && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese las horas de capacitación!</span>}
                                    <div className="control">
                                        <input type="number" min="1" className="input" {...register('horas', { required: true })} />
                                    </div>

                                </div>

                                <div className="column">
                                    <label className="label is-small is-uppercase">Fecha inicio</label>
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
                                    <label className="label is-small is-uppercase">Fecha fin</label>
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
                <div className="columns is-centered">
                    <div className="column">
                        {
                            respModal && respModal.type === 'warning'
                            && <Alert type={'is-warning is-light'} content={respModal.content}>
                                <button className="delete" onClick={() => setRespModal(null)}></button>
                            </Alert>
                        }

                        {
                            respModal && respModal.type === 'success'
                            && <Alert type={'is-success is-light'} content={respModal.content}>
                                <button className="delete" onClick={() => {
                                    setRespModal(null)
                                    setShowModal(false)
                                    dispatch(loadEventos())
                                }}></button>
                            </Alert>
                        }


                        {
                            errorModal
                            && <Alert type={'is-danger is-light'} content={errorModal.message}>
                                <button className="delete" onClick={() => setErrorModal(null)}></button>
                            </Alert>
                        }

                    </div>
                </div>
                <button className="button is-small is-danger mx-3" onClick={() => {
                    setShowModal(false)
                }}>Cancelar</button>
            </TipoEventoModal>}
        </>
    )
}

export default CapacitacionModalForm;