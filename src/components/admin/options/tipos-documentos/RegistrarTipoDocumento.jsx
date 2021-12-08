import { useForm } from 'react-hook-form'
import { useEffect, useState, Fragment } from 'react'
import Alert from '../../../Alert'


let RegistrarTipoDocumento = ({ title, handler, children, objeto }) => {


    const [error, setError] = useState(null)
    const { register, reset, handleSubmit, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)


    useEffect(
        () => {
            if (objeto !== null) {
                reset({
                    tipoDocumento: objeto.tipo_documento
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
                            <label className="label is-small">Tipo documento</label>
                            <div className="control">
                                <input type="text" {...register("tipoDocumento", { required: true })} className="input is-samll is-uppercase" />
                                {errors.tipoDocumento && <span className="has-text-danger">¡Por favor, Ingrese el tipo documento!</span>}
                                {
                                    error && <Alert type={'is-danger is-light'} content={error.message}>
                                        <button className="delete" onClick={event => setError(null)}></button>
                                    </Alert>
                                }
                                {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                    <button className="delete" onClick={event => setResponse(null)}></button>
                                </Alert>}
                                {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                    <button className="delete" onClick={event => setResponse(null)}></button>
                                </Alert>}

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

export default RegistrarTipoDocumento;