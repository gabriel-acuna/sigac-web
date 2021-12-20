import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'

let FamiliarModalForm = ({ title, handler, children, objeto, persona }) => {
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, control, setError } = useForm()
    const REL_TYPES = ["CONYUGUE", "HIJO/A", "CONVIVIENTE"]
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <p className="has-text-weight-bold is-italic" >{title}
                        <span className="has-text-weight-bold is-italic has-text-info">{persona && `  ${persona.primer_nombre} ${persona.segundo_nombre} ${persona.primer_apellido} ${persona.segundo_apellido}`}</span>
                    </p>
                </header>
                <section className="modal-card-body">
                    <form className="field" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Parentesco </label>
                                {errors.parentesco && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el parentesco!</span>}

                                <Controller
                                    name="parentesco"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.parentesco ? objeto.parentesco : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup row {...field} onChange={(ev) => setValue("parentesco", ev.target.value)}>
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
                                {errors.identificacion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese el número de identificación!</span>}
                                {errors.identificacion?.type === 'maxLength' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Máximo 10 caracteres!</span>}
                                <input type="text" {...register("identificacion", { required: true })} className="input" onChange={
                                    ev => {
                                        clearErrors("identificacion")
                                        if (ev.target.value.length > 10) {
                                            setError(
                                                "identificacion",
                                                {
                                                    type: 'maxLength'
                                                }
                                            )
                                        }
                                    }
                                }
                                    defaultValue={objeto?.identificacion ? objeto.identificacion : ''}
                                />

                            </div>
                            <div className="column">
                                <label className="label is-small">Nombres</label>
                                {errors.nombres && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese los nombres!</span>}
                                <input type="text" {...register("nombres", { required: true })} className="input is-uppercase" defaultValue={objeto?.nombres ? objeto.nombres : ''} />

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Apellidos</label>
                                {errors.apellidos && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese los apellidos!</span>}
                                <input type="text" {...register("apellidos", { required: true })} className="input is-uppercase" defaultValue={objeto?.apellidos ? objeto?.apellidos : ''} />

                            </div>
                            <div className="column">
                                <label className="label is-small">Sexo</label>
                                {errors.sexo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el sexo!</span>}
                                <Controller
                                    control={control}
                                    name="sexo"
                                    defaultValue={objeto?.sexo ? objeto.sexo : ''}
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
                                {errors.fecha_nacimiento?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de nacimiento!</span>}
                                {errors.fecha_nacimiento?.type === "max" && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de nacimiento no puede ser mayor a la fecha actual!</span>}
                                <input type="date" {...register("fechaNacimiento", { required: true })} className="input" defaultValue={objeto?.fecha_nacimiento ? objeto.fecha_nacimiento : ''}
                                    onChange={
                                        ev => {
                                            clearErrors("fechaNacimiento")
                                            if (ev.target.value !== null && ev.target.value !== '' && ev.target.valueAsDate > new Date()) {
                                                setError("fecha_nacimiento", { type: 'max' })
                                            }
                                        }

                                    } />

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