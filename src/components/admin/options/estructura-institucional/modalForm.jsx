import { useForm } from 'react-hook-form'
import { Fragment } from 'react'


let ModalForm = ({ title, handler, children, objeto }) => {


    const { register, handleSubmit, formState: { errors } } = useForm()


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic">{title}</span>

                </header>
                <section className="modal-card-body">

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns is-centered">
                            <div className="column">
                                <label className="label is-small has-text-info">Documento aprobación</label>
                                {errors.documentoAprobacion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el documento de aprobación!</span>}

                                <input type="text" {...register("documentoAprobacion", { required: true })} className="input is-samll is-uppercase" defaultValue={objeto?.documento_aprobacion ? objeto.documento_aprobacion : ''} />




                            </div>


                            <div className="column">
                                <label className="label is-small has-text-info">Fecha aprobación</label>
                                {errors.fechaAprobacion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de aprobación!</span>}

                                <input type="date" {...register("fechaAprobacion", { required: true })} className="input is-uppercase" defaultValue={objeto?.fecha_aprobacion ? objeto.fecha_aprobacion : ''} />




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

export default ModalForm;