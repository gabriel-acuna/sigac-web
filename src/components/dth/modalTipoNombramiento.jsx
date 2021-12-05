import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'

let TipoNombramientoModal = ({ title, handler, children, objeto }) => {
    const { register, reset, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, setError } = useForm()

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic" >{title}</span>
                </header>
                <section className="modal-card-body">
                    <form className="field" onSubmit={handleSubmit(handler)}>
                        <label  className="label is-small">Tipo nombramiento </label>
                        <input type="text" className="input is-uppercase" {...register('nombramiento', { required: true })} />

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
        </div>
    )
}
export default TipoNombramientoModal