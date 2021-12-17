import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
let ModalInformacionReproductiva = ({ title, handler, children, objeto, persona }) => {

    const { register, handleSubmit, formState: { errors }, control, setValue } = useForm()
    const OPTIONS = ['LACTANCIA', 'MATERNIDAD', 'EMBARAZO']
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
                                <label className="label is-small">Estado</label>
                                <Controller
                                    control={control}
                                    name="estado"
                                    defaultValue={objeto?.estado ? objeto.estado : ''}
                                    render={
                                        ({field}) =>(
                                            <RadioGroup {...field} 
                                                aria-label="estado"
                                                onChange={
                                                    ev=>{
                                                        setValue("estado", ev.target.value, { shouldValidate: true})
                                                    }
                                                }
                                            >
                                                {
                                                    OPTIONS.map(
                                                        (opt, ind) =>(
                                                            <FormControlLabel
                                                                    value={opt}
                                                                    label={opt}
                                                                    key={`state-opt-000${ind + 1}`}
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
                                />
                            </div>
                            <div className="column">
                                <label className="label is-small">Inicio</label>
                                <input type="date" {...register("inicio", {required:true})}  defaultValue={objeto?.inicio ? objeto.inicio : ''}/>
                            </div>
                            <div className="column">
                                <label className="label is-small">Fin</label>
                                <input type="date" {...register("inicio", {required:true})}  defaultValue={objeto?.inicio ? objeto.inicio : ''}/>
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
export default ModalInformacionReproductiva