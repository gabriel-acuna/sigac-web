import { Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'

let SustitutoModalForm = ({ title, handler, children, objeto, persona }) => {
    const { register, handleSubmit, formState: { errors }, setValue, clearErrors, setError, getValues, control } = useForm()
    const SUS_TYPES = ['DIRECTO', 'SOLIDARIDAD']
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
                                <label className="label is-small has-text-info">Tipo sustituto</label>
                                {errors.tipoSustituto?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de sustituto!</span>}

                                <Controller
                                    name="tipoSustituto"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.tipo_sustituto ? objeto.tipo_sustituto : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup row {...field} onChange={(ev) => setValue("tipoSustituto", ev.target.value)}>
                                                {
                                                    SUS_TYPES.map(
                                                        (t, ind) => (
                                                            <FormControlLabel
                                                                key={`sus-type-000${ind}`}
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
                            <div className="column is-4">
                                <label className="label is-small has-text-info">Apellidos</label>
                                {errors.apellidos?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los apellidos del sustituto!</span>}

                                <input type="text"  className='input is-uppercase' {...register("apellidos", { required: true })} defaultValue={objeto?.apellidos ? objeto.apellidos : ''} />
                            </div>
                            <div className="column is-4">
                                <label className="label is-small has-text-info">Nombres</label>
                                {errors.nombres?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los nombres del sustituto!</span>}

                                <input type="text"  className='input is-uppercase' {...register("nombres", { required: true })} defaultValue={objeto?.nombres ? objeto.nombres : ''} />

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small has-text-info">Número carnet</label>
                                {errors.numeroCarnet?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el número de carnet!</span>}

                                <input type="text" {...register("numeroCarnet", { required: true })} className='input'
                                defaultValue={objeto?.numero_carnet ? objeto.numero_carnet : ''} />
                            </div>
                            <div className="column">
                                <label className="label is-small has-text-info">Desde</label>
                                {errors.desde?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio!</span>}
                                {errors.desde?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de inicio no puede ser mayor a la fecha actual!</span>}
                                <input type="date" {...register("desde", { required: true })} className='input'
                                    defaultValue={objeto?.desde ? objeto.desde : ''}
                                    onChange={
                                        ev => {

                                            clearErrors('desde')
                                            if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) > new Date()) {
                                                setError("desde", {
                                                    type: 'max'

                                                })
                                            }
                                        }} />
                            </div>
                            <div className="column">
                                <label className="label is-small has-text-info">Hasta</label>
                                {errors.hasta && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha final!</span>}
                                {errors.hasta?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.hasta.message}</span>}
                                <input type="date" {...register("hasta", { required: true })} defaultValue={objeto?.hasta ? objeto.hasta : ''}
                                    className='input'
                                    onChange={ev => {
                                        clearErrors('hasta')
                                        if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) < new Date(getValues('desde'))) {
                                            setError("hasta", {
                                                type: 'min',
                                                message: 'La fecha de fin debe ser mayor a la feha de inicio'
                                            })
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
export default SustitutoModalForm