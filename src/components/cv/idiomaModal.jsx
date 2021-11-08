import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
 let IdiomaModalForm = ({ title, handler, children, objeto }) => {

    const comprension = [ 'Excelente', 'Buena', 'Limitada', 'Ninguna' ]
    const { register, reset, handleSubmit, formState: { errors } } = useForm()

    useEffect(
        () => {
           
                reset({
                    idioma:objeto?.idioma,
                    lugarEstudio: objeto?.lugar_estudio,
                    nivel: objeto?.nivel_comprension
                })

            
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
                                <label className="label is-small">Idioma</label>
                                {errors.idioma && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la función desempeñada en el nivel!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('idioma', { required: true })} />
                                </div>

                            </div>



                            <div className="column">
                                <label className="label is-small">Lugar estudio</label>
                                {errors.lugarEstudio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar de estudio!</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('lugarEstudio', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small">Nivel de comprensión</label>
                                {errors.nivel && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el nivel de comprensión!</span>}
                                <div className="select">
                                    <select type="text" className="input input is-uppercase" {...register('nivel', { required: true })} >
                                        <option> </option>
                                        {
                                            comprension.map(
                                               (nivel)=>(
                                                    <option value={nivel} >{nivel} </option>
                                                )
                                            )
                                        }
                                    </select>
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

export default IdiomaModalForm