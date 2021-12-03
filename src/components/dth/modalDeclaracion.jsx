import { useForm, Controller } from 'react-hook-form'
import { Fragment, useEffect } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'

let DeclaracionPtrimonialModal = ({ title, handler, children, objeto }) => {
    const { register, reset, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, control, setError } = useForm()
    const TYPES_DEC = ["INICIO DE GESTION", "PERIODICA", "FIN DE GESTION"]
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic" >{title}</span>
                </header>
                <section className="modal-card-body">
                    <form className="field" onSubmit={handleSubmit(handler)}>
                        <label className="label is-small">Tipo declaración </label>
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

                        <label className="label is-small">Fecha presentación</label>
                        <input type="date" {...register("fechaPresentacion")} className="input" />

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
export default DeclaracionPtrimonialModal