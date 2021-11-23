import { useForm } from 'react-hook-form'
import { Fragment, useEffect } from 'react'


let ExperienciaLaboralModal = ({ title, handler, children, objeto, persona }) => {


    const { register, reset, handleSubmit, formState: { errors }, getValues, clearErrors, setError } = useForm()

    useEffect(
        () => {
            if (objeto !== null) {
                reset({
                    empresa: objeto.empresa,
                    lugar: objeto.lugar,
                    cargo: objeto.cargo,
                    inicio: objeto.inicio.slice(0, 7),
                    fin: (objeto.fin !== null && objeto.fin !== '') ? objeto.fin.slice(0, 7) : ''

                })

            }
        }, [objeto, reset]
    )


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic" >{title} {persona && `${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Empresa/Institución</label>
                                {errors.empresa && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la emprsa en la que laboró!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('empresa', { required: true })} />
                                </div>

                            </div>



                            <div className="column">
                                <label className="label is-small">Lugar</label>
                                {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde laboró!</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('lugar', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small">Cargo</label>
                                {errors.evento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el cargo !</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('cargo', { required: true })} />
                                </div>

                            </div>


                        </div>
                        <div className="columns">


                            <div className="column">
                                <label className="label is-small">Incio</label>
                                {errors.inicio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio del evento!</span>}
                                <div className="control">
                                    <input type="month" className="input" {...register('inicio', { required: true })}

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
                                {errors.fin && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.fin.message}</span>}
                                <div className="control">
                                    <input type="month" className="input" {...register('fin')}

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


                        <div className="" style={{ justifyContent: 'center' }}>
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

export default ExperienciaLaboralModal;