import { useForm, Controller } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
import { RadioGroup, Radio, FormControlLabel } from '@mui/material'
let IdiomaModalForm = ({ title, handler, children, objeto, persona }) => {

    const comprension = ['Excelente', 'Buena', 'Limitada', 'Ninguna']
    const { register, reset, handleSubmit, formState: { errors }, control, setValue } = useForm()

    useEffect(
        () => {

            reset({
                idioma: objeto?.idioma ? objeto.idioma: '',
                lugarEstudio: objeto?.lugar_estudio ? objeto.lugar_estudio : '',
                nivel: objeto?.nivel_comprension ? objeto.nivel_comprension: ''
            })


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
                                <Controller
                                    name="nivel"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue={objeto?.nivel_comprension ? objeto.nivel_comprension : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup aria-label="nivel de compresión" {...field}
                                                onChange={
                                                    ev => {
                                                        setValue('nivel', ev.currentTarget.value ? ev.currentTarget.value : null)
                                                    }
                                                }
                                            >
                                                {
                                                    comprension.map(
                                                        (nivel, index) => (<FormControlLabel
                                                            value={nivel}
                                                            control={<Radio size="small" />}
                                                            key={`.lvl${index}`}
                                                            label={nivel}
                                                            sx={{
                                                                '& .MuiFormControlLabel-label': {
                                                                    fontSize: 14,
                                                                    fontWeight: 500
                                                                },
                                                            }}
                                                        />))

                                                }

                                            </RadioGroup>
                                        )
                                    }
                                />

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