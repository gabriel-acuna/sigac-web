import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let ReferenciaModalForm = ({ title, handler, children, objeto }) => {


    const { register,reset, handleSubmit, formState: { errors } } = useForm()

    useEffect(
        ()=>{
            if(objeto!==null){
                reset({
                    tipoReferencia: objeto.referencia,
                    apellidos: objeto.apellidos,
                    nombres: objeto.nombres,
                    direccion: objeto.direccion,
                    correo_electronico: objeto.correo_electronico,
                    telefono_domicilio: objeto.telefono_domicilio,
                    telefono_movil: objeto.telefono_movil

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
                            <label className="label is-small">Tipo referencia</label>
                            <div className="select">
                                <select type="text" {...register("tipoReferencia", { required: true })} className="input is-small" >
                                    <option>PERSONAL </option>
                                    <option> LABORAL</option>
                                </select>
                                {errors.tipoReferencia && <span className="has-text-danger">¡Por favor, seleccione el tipo de referencia!</span>}
                               
                                

                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label is-small">Apellidos</label>
                            <div className="control">
                                <input type="text"  className="input is-uppercase" {...register('apellidos', {required:true})} />
                            </div>
                            { errors.apellidos && <span className="has-text-danger">¡Por favor, Ingrese los apellidos!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Nombres</label>
                            <div className="control">
                                <input type="text"  className="input input is-uppercase" {...register('nombres', {required:true})} />
                            </div>
                            { errors.nombres && <span className="has-text-danger">¡Por favor, Ingrese los nombres!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Dirección</label>
                            <div className="control">
                                <input type="text"  className="input is-uppercase" {...register('direccion', {required:true})} />
                            </div>
                            { errors.direccion && <span className="has-text-danger">¡Por favor, Ingrese la dirección!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Correo electrónico</label>
                            <div className="control">
                                <input type="email"  className="input" {...register('correo_electronico', {required:true})} />
                            </div>
                            { errors.correo_electronico && <span className="has-text-danger">¡Por favor, Ingrese los apellidos!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Teléfono domicilio</label>
                            <div className="control">
                                <input type="tel"  className="input" {...register('telefono_domicilio')} />
                            </div>
                            { errors.telefono_domicilio && <span className="has-text-danger">¡Por favor, Ingrese el telefono domicilio!</span>  }
                        </div>

                        <div className="field">
                            <label className="label is-small">Teléfono movil</label>
                            <div className="control">
                                <input type="tel"  className="input" {...register('telefono_movil', {required:true})} />
                            </div>
                            { errors.telefono_movil && <span className="has-text-danger">¡Por favor, Ingrese el telefono movil!</span>  }
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

export default ReferenciaModalForm;