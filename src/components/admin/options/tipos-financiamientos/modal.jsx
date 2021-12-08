import { useForm } from 'react-hook-form'
import { useEffect, useState, Fragment } from 'react'
import Alert from '../../../Alert'


let ModalForm = ({ title, handler, children, objeto }) => {


    const [error, setError] = useState(null)
    const { register, reset, handleSubmit, formState: { errors } } = useForm()


    useEffect(
        () => {
            if (objeto !== null) {
                reset({
                    financiamiento: objeto.financiamiento
                })
            }
        }, [objeto, reset]
    )


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic">{title}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="field">
                            <label className="label is-small">Financiamiento</label>
                            <div className="control">
                                <input type="text" {...register("financiamiento", { required: true })} className="input is-samll is-uppercase" />
                                {errors.financiamiento && <span className="has-text-danger">¡Por favor, Ingrese el tipo de financiamiento!</span>}
                                {
                                    error && <Alert type={'is-danger is-light'} content={error.message}>
                                        <button className="delete" onClick={() => setError(null)}></button>
                                    </Alert>
                                }
                               

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