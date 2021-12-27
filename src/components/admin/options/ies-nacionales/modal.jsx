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
                        <div className="field">
                            <div className="control">
                                <label className="label is-small has-text-info">Código</label>
                                {errors.codigo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el código de la IES!</span>}

                                <input type="text" {...register("codigo", { required: true })} className="input is-uppercase" defaultValue={objeto?.codigo ? objeto.codigo : ''} />


                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-small has-text-info">Nombre</label>
                            {errors.institucion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el nombre de la IES!</span>}

                            <div className="control">
                                <input type="text" {...register("institucion", { required: true })} className="input is-uppercase" defaultValue={objeto?.institucion ? objeto.institucion : ''} />


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