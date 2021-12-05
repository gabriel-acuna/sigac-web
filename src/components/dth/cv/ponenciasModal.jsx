import { useForm, Controller } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
import { RadioGroup, Radio, FormControlLabel } from '@mui/material'


let CapacitacionModalForm = ({ title, handler, children, objeto, persona }) => {


    const { register, reset, handleSubmit, formState: { errors }, control, setValue, clearErrors, setError } = useForm()

    useEffect(
        () => {
            if (objeto !== null) {
                reset({
                    tema: objeto.tema,
                    institucionOrganizadora: objeto.institucion_organizadora,
                    evento: objeto.evento,
                    caracter: objeto.caracter,
                    lugar: objeto.lugar,
                    fecha: objeto.fecha.slice(0, 7)

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
                <section className="modal-card-body">

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small is-uppercase">Tema</label>
                                {errors.tema && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la función desempeñada en el evento!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('tema', { required: true })} />
                                </div>

                            </div>

                        </div>
                        <div className="columns">

                            <div className="column">
                                <label className="label is-small is-uppercase">Institución organizadora</label>
                                {errors.institucionOrganizadora && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la institucion organizadora!</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('institucionOrganizadora', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small is-uppercase">Evento</label>
                                {errors.evento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el evento!</span>}
                                <div className="control">
                                    <input type="text" className="input input is-uppercase" {...register('evento', { required: true })} />
                                </div>

                            </div>

                            <div className="column">
                                <label className="label is-small is-uppercase">Caracter</label>
                                {errors.caracter && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleecione el caracter del evento!</span>}
                                <Controller
                                    name="caracter"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue={objeto?.caracter ? objeto.caracter : ''}
                                    render={
                                        ({ field }) =>
                                        (<RadioGroup aria-label="caracter evento" row {...field} onChange={(ev) => {

                                            setValue('caracter', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })

                                        }}>

                                            <FormControlLabel
                                                value="NACIONAL"
                                                control={<Radio size="small" />}
                                                label="NACIONAL"
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: 14,
                                                        fontWeight: 500
                                                    },
                                                }}
                                            />
                                            <FormControlLabel
                                                value="INTERNACIONAL"
                                                control={<Radio size="small" />}
                                                label="INTERNACIONAL"
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: 14,
                                                        fontWeight: 500
                                                    },
                                                }}
                                            />


                                        </RadioGroup>)
                                    }

                                />


                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">

                                <label className="label is-small is-uppercase">Lugar</label>
                                {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde se llevó a cabo el evento!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('lugar', { required: true })} />
                                </div>

                            </div>


                            <div className="column">
                                <label className="label is-small is-uppercase">Fecha</label>
                                {errors.fecha && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio del evento!</span>}
                                <div className="control">
                                    <input type="month" className="input" {...register('fecha', { required: true })}

                                        onChange={
                                            ev => {

                                                clearErrors('fechaInicio')
                                                if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) > new Date()) {
                                                    setError("fechaInicio", {
                                                        type: 'max'

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

export default CapacitacionModalForm;