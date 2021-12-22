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
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small has-text-info">Código</label>

                                <input type="text" {...register("codigo", { required: true })} className="input" defaultValue={objeto?.codigo ? objeto.codigo : ''} />
                                {errors.codigo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el código del campo de estudio amplio!</span>}

                            </div>

                            <div className="column">
                                <label className="label is-small has-text-info">Nombre</label>

                                {errors.descripcion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el nombre del campo de estudio!</span>}
                                <textarea class="textarea"  {...register("descripcion", { required: true })} defaultValue={objeto?.descripcion ? objeto.descripcion : ''}></textarea>

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