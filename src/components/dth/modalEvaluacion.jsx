import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { FormControlLabel, RadioGroup, Radio } from '@mui/material'
let ModalEvaluacion = ({ title, objeto, handler, persona, children }) => {
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control, setError } = useForm()
    const SCORE = ['EXECELENTE', 'MUY BUENO', 'SATISFACTORIO', 'DEFICIENTE', 'INACEPTABLE']

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="has-text-weight-bold is-italic" >{title}
                        <span className="has-text-weight-bold is-italic has-text-info">{persona && `  ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`}</span>
                    </p>
                </header>
                <section className="modal-card-body">
                    <form className="field" onSubmit={handleSubmit(handler)}>
                        <fieldset style={{ border: '1px solid ', padding: '10px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark is-uppercase">Periodo de evaluación</legend>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">Desde</label>
                                    {errors.desde?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, selecione fecha de inicio del perido de eveluación</span>}

                                    <input type="date" className='input' {...register("desde", { required: true })} defaultValue={objeto?.desde ? objeto.desde : ''} />
                                </div>
                                <div className="column">
                                    <label className="label is-small">Hasta</label>
                                    {errors.desde?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, selecione fecha de fin del perido de eveluación!</span>}

                                    <input type="date" className='input'{...register("hasta", { required: true })} defaultValue={objeto?.hasta ? objeto.hasta : ''} />
                                </div>
                            </div>
                        </fieldset>
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark is-uppercase">Calificación obtenida</legend>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">Puntaje</label>
                                    {errors.puntaje?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese el puntaje obtenido!</span>}
                                    {errors.puntaje?.type === "min" && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡El puntaje obtenido no puede ser menor a 0!</span>}
                                    {errors.puntaje?.type === "max" && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡El puntaje obtenido no puede ser mayor a 10!</span>}

                                    <input type="number" className='input' {...register("puntaje", { required: true })} min="0" max="10" onChange={
                                        ev => {
                                            clearErrors("puntaje")
                                            if (parseFloat(ev.target.value) > 10) {
                                                setError("puntaje", { type: "max" })
                                            } else if (parseFloat(ev.target.value) < 0) {
                                                setError("puntaje", { type: "min" })
                                            }
                                        }
                                    }
                                        defaultValue={
                                            objeto?.puntaje ? objeto.puntaje : ''
                                        }
                                    />
                                </div>
                                <div className="column">
                                    <label className="label is-small">Calificación</label>
                                    <Controller
                                        name='calificacion'
                                        defaultValue={objeto?.calificacion ? objeto.calificacion : ''}
                                        control={control}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup {...field}
                                                    aria-label="califiación cualitativa"
                                                    onChange={
                                                        (ev) => {
                                                            setValue("calificacion", ev.target.value, { shouldValidate: true })
                                                        }
                                                    }
                                                >
                                                    {
                                                        SCORE.map(
                                                            (s, ind) => (
                                                                <FormControlLabel
                                                                    value={s}
                                                                    label={s}
                                                                    key={`score-opt-000${ind + 1}`}
                                                                    control={<Radio size="small" />}
                                                                    sx={{
                                                                        '& .MuiFormControlLabel-label': {
                                                                            fontSize: 14,
                                                                            fontWeight: 500
                                                                        },
                                                                    }}
                                                                />
                                                            )
                                                        )
                                                    }
                                                </RadioGroup>
                                            )
                                        }
                                    >

                                    </Controller>
                                </div>
                            </div>
                        </fieldset>
                        <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
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

export default ModalEvaluacion