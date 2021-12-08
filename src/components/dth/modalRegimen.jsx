import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import Select from 'react-select'

let RegimenModalForm = ({ title, handler, children, objeto, ingreso, persona }) => {
    const { register, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, control, setError } = useForm()
    const SAN_TYPES = ["LEVES", "GRAVES"]
    const MESES = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"]
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
                                <label className="label is-small">Año</label>
                                {errors.año?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese el año!</span>}
                                {errors.año?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡El año no puede ser menor al año que ingresó a la institución!</span>}
                                {errors.año?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡El año no puede ser mayor al año actual!</span>}

                                <input type="number" {...register("año", { required: true })} className="input" onChange={
                                    ev => {
                                        clearErrors("año")
                                        if (ev.target.value !== null && ev.target.value !== '' && parseInt(ev.target.value) < parseInt(ingreso)) {
                                            setError("año", {
                                                type: 'min'
                                            })
                                        } else if (ev.target.value !== null && ev.target.value !== '' && parseInt(ev.target.value) > new Date().getFullYear()) {
                                            setError("año", {
                                                type: 'max'
                                            })
                                        }
                                    }} />

                            </div>
                            <div className="column">
                                <label className="label is-small">Mes</label>
                                {errors.mesSancion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el mes!</span>}
                                <Controller
                                    name="mesSancion"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.mes_sancion ? objeto.mes_sancion : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                menuPlacement='auto'
                                                {...field}
                                                placeholder="Seleccione el mes"
                                                options={
                                                    MESES.map((m, ind) => ({ label: m, value: m, key: `month-000${ind}` }))
                                                }
                                            />
                                        )
                                    }
                                />

                            </div>




                            <div className="column">
                                <label className="label is-small">Régimen laboral</label>
                                {errors.modalidadContractual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el régimen laboral!</span>}
                                <Controller
                                    name="modalidadContractual"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.modalidad_contractual ? objeto.modalidad_contractual : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                {...field}
                                                placeholder="Seleccione"
                                                options={
                                                    []
                                                }
                                            />
                                        )
                                    }
                                />

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Modalidad contractual</label>
                                {errors.modalidadContractual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la modalidad contractual!</span>}
                                <Controller
                                    name="modalidadContractual"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.modalidad_contractual ? objeto.modalidad_contractual : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                {...field}
                                                placeholder="Seleccione"
                                                options={
                                                    []
                                                }
                                            />
                                        )
                                    }
                                />

                            </div>
                            <div className="column">
                                <label className="label is-small">Tipo falta </label>
                                {errors.tipoFalta && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el tipo de falta!</span>}

                                <Controller
                                    name="tipoFalta"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.tipo_falta ? objeto.tipo_falta : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup row {...field} onChange={(ev) => setValue("tipoFalta", ev.target.value)}>
                                                {
                                                    SAN_TYPES.map(
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
                                <label className="label is-small">Sanción</label>
                                {errors.sancion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la sanción!</span>}
                                <Controller
                                    name="sancion"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.sancion ? objeto.sancion : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                {...field}
                                                placeholder="Seleccione"
                                                options={
                                                    []
                                                }
                                            />
                                        )
                                    }
                                />

                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">Aplica sumario</label>
                                {errors.tipoFalta && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el tipo de falta!</span>}

                                <Controller
                                    name="aplicaSumario"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.aplica_sumario ? objeto.aplica_sumario : ''}
                                    render={
                                        ({ field }) => (
                                            <RadioGroup row {...field} onChange={(ev) => setValue("aplicaSumario", ev.target.value)}>

                                                <FormControlLabel
                                                    key={`ap-sum-0001`}
                                                    value="SI"
                                                    control={<Radio size="small" />}
                                                    label="SI"
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />

                                                <FormControlLabel
                                                    key={`ap-sum-0002`}
                                                    value="NO"
                                                    control={<Radio size="small" />}
                                                    label="NO"
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />


                                            </RadioGroup>
                                        )
                                    }

                                />
                            </div>
                            <div className="column">
                                <label className="label is-small">Estado sumario</label>
                                {errors.estadoSumario && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la sanción!</span>}
                                <Controller
                                    name="estadoSumario"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.estado_sumario ? objeto.estado_sumario : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                {...field}
                                                placeholder="Seleccione"
                                                options={
                                                    []
                                                }
                                            />
                                        )
                                    }
                                />

                            </div>

                            <div className="column">
                                <label className="label is-small">Número de sentencia</label>
                                {errors.numeroSentencia && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione la sanción!</span>}
                                <Controller
                                    name="numeroSentencia"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.numero_sentencia ? objeto.numero_sentencia : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                {...field}
                                                placeholder="Seleccione"
                                                options={
                                                    []
                                                }
                                            />
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

                                <button type="submit" className="button is-success is-small mx-3" >Guardar</button>

                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div >
    )
}
export default RegimenModalForm