import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'

let DeclaracionPatrimonialModal = ({ title, handler, children, objeto, persona }) => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, control, setError } = useForm()
    const TYPES_DEC = ["INICIO DE GESTION", "PERIODICA", "FIN DE GESTION"]
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
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Tipo declaración </label>
                                {errors.tipoDeclaracion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el tipo de declaración!</span>}

                                <Controller
                                    name="tipoDeclaracion"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.tipo_declaracion ? objeto.tipo_declaracion : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup row {...field} onChange={(ev) => setValue("tipoDeclaracion", ev.target.value)}>
                                                {
                                                    TYPES_DEC.map(
                                                        (t, ind) => (
                                                            <FormControlLabel
                                                                key={`type-dec-000${ind}`}
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
                                <label className="label is-small">Número de declaración</label>
                                {errors.numeroDeclaracion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese el número de declaración!</span>}
                                {errors.numeroDeclaracion?.type === 'pattern' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Formato incorrecto este campo debe ser númerico y debe contener entre 5 a 10 dígitos!</span>}
                                <input type="text" {...register("numeroDeclaracion", { required: true })} className="input" defaultValue={objeto?.numero_declaracion ? objeto.numero_declaracion : ''}
                                    onChange={
                                        ev => {
                                            clearErrors("numeroDeclaracion")
                                            if (ev.target.value !== '' && ev.target.value !== null & /([0-9]{5,10})/.test(ev.target.value) === false) {
                                                setError("numeroDeclaracion", {
                                                    type: "pattern"
                                                })
                                            }
                                        }
                                    }
                                />
                            </div>
                            <div className="column">
                                <label className="label is-small">Fecha presentación</label>
                                {errors.fechaPresentacion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la fecha de presentación!</span>}

                                <input type="date" {...register("fechaPresentacion", { required: true })} className="input" defaultValue={objeto?.fecha_presentacion ? objeto.fecha_presentacion : ''} />

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
export default DeclaracionPatrimonialModal