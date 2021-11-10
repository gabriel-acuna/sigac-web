import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let CapacitacionModalForm = ({ title, handler, children, objeto }) => {


    const { register, reset, handleSubmit, formState: { errors }, setError, clearErrors, getValues } = useForm()

    useEffect(
        () => {
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


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="modal-card-title">{title}</span>

                </header>
                <div className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns">

                            <div className="column">
                                <label className="label is-small">Nombre</label>
                                {errors.tipoEvento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el nombre de la capacitación!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('tipoEvento', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small">Certificado</label>
                                {errors.tipoCertificado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de tipoCertificado!</span>}
                                <div className="select">
                                    <select type="text" {...register("tipoCertificado", { required: true })} className="input" >
                                        <option></option>
                                        <option value="ASISTENCIA">ASISTENCIA </option>
                                        <option value="APROBACIÓN"> APROBACIÓN</option>
                                    </select>




                                </div>
                            </div>


                            <div className="column">
                                <label className="label is-small">Institución organizadora</label>
                                {errors.institucionOrganizadora && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la institucion organizadora!</span>}

                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('institucionOrganizadora', { required: true })} />
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Lugar</label>
                                {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde se llevó a cabo el evento!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('lugar', { required: true })} />
                                </div>

                            </div>


                            <div className="column">
                                <label className="label is-small">Horas</label>
                                {errors.horas && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese las horas de capacitación!</span>}
                                <div className="control">
                                    <input type="number" min="1" className="input" {...register('horas', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small">Fecha inicio</label>
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
                                <label className="label is-small">Fecha fin</label>
                                {errors.fechaFin?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.fechaFin.message}</span>}
                                {errors.fechaFin?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, ingrese la fecha de finalización!</span>}
                                <div className="control">
                                    <input type="date" className="input" {...register('fechaFin',{ required:true})}

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
        </div>
    )
}

export default CapacitacionModalForm;