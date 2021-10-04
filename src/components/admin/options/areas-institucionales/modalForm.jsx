import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let ModalForm = ({ title, handler, children, objeto }) => {


    const { register,reset, handleSubmit, formState: { errors } } = useForm()

    useEffect(
        ()=>{
            if(objeto!==null){
                reset({
                    nombre: objeto.nombre,
                    codigo: objeto.codigo
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
                            <label className="label is-small">Nombre</label>
                            <div className="control">
                                <input type="text" {...register("nombre", { required: true })} className="input is-samll is-uppercase" />
                                {errors.etnia && <span className="has-text-danger">¡Por favor, Ingrese el nombre del area institucional!</span>}

                            </div>
                        </div>
                        <div className="field">
                            <label className="label is-small">Código</label>
                            <div className="control">
                                <input type="text" {...register("codigo")} className="input is-samll is-uppercase" />

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