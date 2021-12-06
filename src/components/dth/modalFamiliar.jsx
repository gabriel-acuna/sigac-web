import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'

let FamiliarModalForm = ({ title, handler, children, objeto }) => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, control, setError } = useForm()
    const REL_TYPES = ["CONYUGUE", "HIJO/A", "CONVIVIENTE"]
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic" >{title}</span>
                </header>
                <section className="modal-card-body">
                    <form className="field" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Parentezco </label>
                                {errors.parentezco && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el parentezco!</span>}

                                <Controller
                                    name="parentezco"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.parentezco ? objeto.parentezco : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup row {...field} onChange={(ev) => setValue("parentezco", ev.target.value)}>
                                                {
                                                    REL_TYPES.map(
                                                        (t, ind) => (
                                                            <FormControlLabel
                                                                key={`par-000${ind}`}
                                                                value={t}
                                                                control={<Radio size="small" />}
                                                                label={t}
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

                                />
                            </div>

                            <div className="column">
                                <label className="label is-small">Identificación</label>
                                {errors.identificacion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese el número de identificación!</span>}
                                <input type="text" {...register("identificacion", { required: true })} className="input" />

                            </div>
                            <div className="column">
                                <label className="label is-small">Nombres</label>
                                {errors.nombres && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese los nombres!</span>}
                                <input type="text" {...register("nombres", { required: true })} className="input" />

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Apellidos</label>
                                {errors.apellidos && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese los apellidos!</span>}
                                <input type="text" {...register("apellidos", { required: true })} className="input" />

                            </div>
                            <div className="column">
                                <label className="label is-small">Sexo</label>
                                {errors.sexo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el sexo!</span>}
                                <Controller
                                    control={control}
                                    name="sexo"
                                    defaultValue={''}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup
                                                row
                                                aria-label="sexo"
                                                {...field}
                                                onChange={(ev) => {
                                                    setValue('sexo', ev.target.value, { shouldValidate: true })
                                                }}
                                            >
                                                <FormControlLabel value="HOMBRE" label="HOMBRE"
                                                    key="sex-00001"
                                                    control={<Radio size="small" />}
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                <FormControlLabel value="MUJER" label="MUJER"
                                                    key="type-id-0002"
                                                    control={<Radio size="small" />}
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                            </RadioGroup>
                                        )
                                    }
                                />

                            </div>
                            <div className="column">
                                {errors.fechaNacimiento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la fecha de nacimiento!</span>}

                                <label className="label is-small">Fecha de nacimiento</label>
                                <input type="date" {...register("fechaNacimiento", { required: true })} className="input" defaultValue={objeto?.fecha_nacimiento ? objeto.fecha_nacimiento : ''} />

                            </div>
                        </div>
                        <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
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
export default FamiliarModalForm