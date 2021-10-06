import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let CapacitacionModalForm = ({ title, handler, children, objeto }) => {


    const { register,reset, handleSubmit, formState: { errors } } = useForm()

    useEffect(
        ()=>{
            if(objeto!==null){
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
        },[objeto, reset]
    )


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="modal-card-title">{title}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                    <div className="field">
                            <label className="label is-small">Tipo Evento</label>
                            <div className="control">
                                <input type="text"  className="input is-uppercase" {...register('tipoEvento', {required:true})} />
                            </div>
                            { errors.apellidos && <span className="has-text-danger">¡Por favor, Ingrese el tipo de evento!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Certificado</label>
                            <div className="select">
                                <select type="text" {...register("tipoCertificado", { required: true })} className="input is-small" >
                                    <option>ASISTENCIA </option>
                                    <option> APROBACIÓN</option>
                                </select>
                                {errors.tipoCertificado && <span className="has-text-danger">¡Por favor, seleccione el tipo de tipoCertificado!</span>}
                               
                                

                            </div>
                        </div>
                        
                        
                        <div className="field">
                            <label className="label is-small">Institución organizadora</label>
                            <div className="control">
                                <input type="text"  className="input input is-uppercase" {...register('institucionOrganizadora', {required:true})} />
                            </div>
                            { errors.institucionOrganizadora && <span className="has-text-danger">¡Por favor, Ingrese la institucion organizadora!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Lugar</label>
                            <div className="control">
                                <input type="text"  className="input is-uppercase" {...register('lugar', {required:true})} />
                            </div>
                            { errors.lugar && <span className="has-text-danger">¡Por favor, Ingrese el lugar donde se llevó a cabo el evento!</span>  }
                        </div>
                        <div className="field">
                            <label className="label is-small">Horas</label>
                            <div className="control">
                                <input type="number"  min="1" className="input" {...register('horas', {required:true})} />
                            </div>
                            { errors.horas && <span className="has-text-danger">¡Por favor, Ingrese las horas de capacitación!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Fecha inicio</label>
                            <div className="control">
                                <input type="date" className="input" {...register('fechaInicio', {required:true})} />
                            </div>
                            { errors.fechaInicio && <span className="has-text-danger">¡Por favor, Ingrese la fecha de inicio del evento!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Fecha fin</label>
                            <div className="control">
                                <input type="date"  className="input" {...register('fechaFin')} />
                            </div>
                            { errors.fechaFin && <span className="has-text-danger">¡Por favor, Ingrese la fecha de finalización del evento!</span>  }
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
                </section>
            </div>
        </div>
    )
}

export default CapacitacionModalForm;