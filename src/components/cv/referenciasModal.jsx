import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let ReferenciaModalForm = ({ title, handler, children, objeto }) => {


    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    useEffect(
        () => {
            if (objeto !== null) {
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
        }, [objeto, reset]
    )


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="modal-card-title">{title}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Tipo referencia</label>
                                {errors.tipoReferencia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de referencia!</span>}
                                <div className="select">
                                    <select type="text" {...register("tipoReferencia", { required: true })} className="input" >
                                        <option>PERSONAL </option>
                                        <option> LABORAL</option>
                                    </select>
                                   



                                </div>
                            </div>

                            <div className="column">
                                <label className="label is-small">Apellidos</label>
                                {errors.apellidos && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los apellidos!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('apellidos', { required: true })} />
                                </div>
                               
                            </div>

                            <div className="column">
                                <label className="label is-small">Nombres</label>
                                {errors.nombres && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los nombres!</span>}

                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('nombres', { required: true })} />
                                </div>
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Dirección</label>
                                {errors.direccion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la dirección!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('direccion', { required: true })} />
                                </div>
                                
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Correo electrónico</label>
                                {errors.correo_electronico && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los apellidos!</span>}
                                <div className="control">
                                    <input type="email" className="input" {...register('correo_electronico', { required: true })} />
                                </div>
                                
                            </div>

                            <div className="column">
                                <label className="label is-small">Teléfono domicilio</label>
                                {errors.telefono_domicilio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el telefono domicilio!</span>}
                                <div className="control">
                                    <input type="tel" className="input" {...register('telefono_domicilio')} />
                                </div>
                                
                            </div>

                            <div className="column">
                                <label className="label is-small">Teléfono movil</label>
                                {errors.telefono_movil && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el telefono movil!</span>}
                                <div className="control">
                                    <input type="tel" className="input" {...register('telefono_movil', { required: true })} />
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
                </section>
            </div>
        </div>
    )
}

export default ReferenciaModalForm;