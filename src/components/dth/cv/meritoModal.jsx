import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let MeritoModalForm = ({ title, handler, children, objeto, persona }) => {


    const { register, reset, handleSubmit, formState: { errors }, getValues, clearErrors, setError } = useForm()

    useEffect(
        () => {
            if (objeto !== null) {
                reset({
                    titulo: objeto.titulo,
                    institucionAuspiciante: objeto.institucion_auspiciante,
                    funcion: objeto.funcion,
                    inicio: objeto.fecha_inicio,
                    fin: objeto.fecha_fin

                })

            }
        }, [objeto, reset]
    )


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <p className="has-text-weight-bold is-italic" >{title}
                        <span className="has-text-weight-bold is-italic has-text-info">{persona && `  ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`}</span>
                    </p>
                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Titulo</label>
                                {errors.titulo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la función desempeñada en el funcion!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('titulo', { required: true })} />
                                </div>

                            </div>



                            <div className="column">
                                <label className="label is-small">Institución auspiciante</label>
                                {errors.institucionAuspiciante && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la institucion asuspiciante!</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('institucionAuspiciante', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small">Funcion</label>
                                {errors.funcion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la funcion!</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('funcion', { required: true })} />
                                </div>

                            </div>


                            <div className="column">
                                <label className="label is-small">Inicio</label>
                                {errors.inicio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio del mérito!</span>}
                                <div className="control">
                                    <input type="date" className="input" {...register('inicio', { required: true })}

                                        onChange={
                                            ev => {

                                                clearErrors('inicio')
                                                if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) > new Date()) {
                                                    setError("inicio", {
                                                        type: 'max'

                                                    })
                                                }
                                            }} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small">Fin</label>
                                {errors.fin && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese fecha de finalización del mérito!</span>}
                                <div className="control">
                                    <input type="date" className="input" {...register('fin', { required: true })}

                                        onChange={
                                            ev => {

                                                clearErrors('fin')
                                                if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) < new Date(getValues('inicio'))) {
                                                    setError("fin", {
                                                        type: 'min',
                                                        message: 'La fecha de fin debe ser mayor a la fecha de inicio'

                                                    })
                                                }
                                            }} />
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

export default MeritoModalForm;