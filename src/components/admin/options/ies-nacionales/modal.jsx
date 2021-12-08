import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let ModalForm = ({ title, handler, children, objeto }) => {


    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    useEffect(
        () => {
            if (objeto !== null) {
                reset({
                    institucion: objeto.institucion,
                    codigo: objeto.codigo
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
                <section className="modal-card-body">

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="field">
                            <label className="label is-small">Código</label>
                            <div className="control">
                                <input type="text" {...register("codigo", { required: true })} className="input is-uppercase" />
                                {errors.codigo && <span className="has-text-danger">¡Por favor, Ingrese el código de la IES!</span>}

                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-small">Nombre</label>
                            <div className="control">
                                <input type="text" {...register("institucion", { required: true })} className="input is-uppercase" />
                                {errors.institucion && <span className="has-text-danger">¡Por favor, Ingrese el nombre de la IES!</span>}

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