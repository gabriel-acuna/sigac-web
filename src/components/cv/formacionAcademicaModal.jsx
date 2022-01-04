import { useForm, Controller } from 'react-hook-form'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadPaises } from '../../store/core/paises'
import { loadNivelesEducativos } from '../../store/core/nivelesEducativos'
import { useSelector } from 'react-redux'
import { loadTiposFinanciamientos } from '../../store/core/tipo_financiamiento'
import { loadGrados } from '../../store/core/grado'
import { loadTipoBecas } from '../../store/core/tipoBeca'
import { loadIESNacionales } from '../../store/core/ies-nacionales'
import { loadCamposEspecificos } from '../../store/core/campoEspecifico'
import Select from 'react-select/'
import { Radio, RadioGroup, FormControlLabel } from "@mui/material"


let FormacionAcademicaModalForm = ({ title, handler, children, objeto }) => {


    const { register, reset, handleSubmit, formState: { errors }, setValue, getValues, clearErrors, setError, control } = useForm()
    const opciones = { TERMINADA: "FINALIZADO", CURSANDO: "EN CURSO" }
    const [estadoFormacion, setEstadoFormacion] = useState(null)
    const [nivelEdu, setNivelEdu] = useState(null)
    const [pais, setPais] = useState(null)
    const [tieneBeca, setTieneBeca] = useState(null)
    const [tipoFin, setTipoFin] = useState(null)
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(loadPaises())
            dispatch(loadNivelesEducativos()).unwrap(
            ).then(
                (resp) => {
                    let listado = []
                    resp.forEach(n => {
                        if (!n.nivel.includes('/')) {
                            listado.push(n)
                        }
                    })
                    setNiveles(listado)
                }
            )
            dispatch(loadCamposEspecificos())

        }, [dispatch]
    )
    useEffect(
        () => {
            dispatch(loadTiposFinanciamientos())
            dispatch(loadTipoBecas())
        }, [dispatch]
    )

    let paisesState = useSelector(state => state.paises.data.paises)
    let iesState = useSelector(state => state.ies.data.iesNacionales)

    let financiamientosState = useSelector(state => state.financiamientos.data.tiposFinanciamientos)
    let tipoBecasState = useSelector(state => state.tipoBecas.data.tipoBecas)
    let gradosState = useSelector(state => state.grados.data.grados)
    let camposState = useSelector(state => state.camposEspecificos.data.campos)
    const [niveles, setNiveles] = useState([])

    useEffect(
        () => {
            if (objeto !== null) {


                setPais({ label: objeto.pais_estudio.pais, value: objeto.pais_estudio.id })
                setNivelEdu(objeto.nivel_educativo.nivel)
                setEstadoFormacion(objeto.estado)
                setTipoFin(objeto.financiamiento?.financiamiento)
                setTieneBeca(objeto.posee_beca)
                reset({
                    paisEstudio: { value: objeto.pais_estudio.id, label: objeto.pais_estudio.pais },
                    nivel: { value: objeto?.nivel_educativo.id, label: objeto?.nivel_educativo.nivel },
                    campoEstudio: { value: objeto.campo_especifico.id, label: `${objeto.campo_especifico.codigo} - ${objeto.campo_especifico.descripcion}` },
                    nombreIES: objeto.nombre_ies,
                    descripcion: objeto.descripcion,
                    estado: objeto.estado,
                    fechaInicio: objeto.fecha_inicio,
                    registroSenescyt: objeto.registro_senescyt,
                    fechaFin: objeto.fecha_fin,
                    fechaObtencionTitulo: objeto.fecha_obtencion_titulo,
                    lugar: objeto.lugar,
                    titulo: objeto.nombre_titulo,
                    poseeBeca: objeto.posee_beca,
                    montoBeca: objeto.monto_beca

                })
            }
        }, [objeto, reset]
    )

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic">{title}</span>

                </header>
                <section className="modal-card-body">

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns is-multiline">
                            <div className="column is-full">
                                <div className="control">
                                    <label className="label is-small has-text-info">País estudio</label>

                                    {errors.paisEstudio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el país donde realizó o está realizado sus estudios!</span>}
                                </div>


                                <Controller
                                    name="paisEstudio"
                                    control={control}

                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select


                                            placeholder="Seleccione"
                                            isClearable


                                            {...field}


                                            options={
                                                paisesState.map(
                                                    (p) => ({ value: p.id, label: p.pais, key: p.id }))
                                            }

                                            onChange={(ev) => {
                                                setPais(ev)
                                                setValue('paisEstudio', ev, { shouldValidate: true })
                                                if (ev?.label === 'ECUADOR') {
                                                    dispatch(loadIESNacionales())
                                                }
                                            }}


                                        />
                                    )}
                                />



                            </div>



                            {pais?.label === 'ECUADOR' && <div className="column">
                                <div className="control">
                                    <label className="label is-small has-text-info">IES</label>
                                    {/* <input type="text" className="input is-uppercase" onChange={ev => filtrarIES(ev.target.value)} /> */}
                                    {errors.ies && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleecione la IES en la está realizado o realizó su formación!</span>}
                                </div>
                                <Controller
                                    name="ies"
                                    control={control}
                                    defaultValue={objeto?.ies ? { value: objeto.ies.id, label: `${objeto.ies.codigo} - ${objeto.ies.institucion}` } : ''}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Seleccione"
                                            isClearable

                                            {...field}


                                            options={
                                                iesState.map(
                                                    (ies) => ({ value: ies.id, label: `${ies.codigo} - ${ies.institucion}` }))
                                            }

                                        />
                                    )}
                                />

                                {/* <div className="select">
                                    <select type="text" className="input input is-uppercase" {...register('ies', { required: true })} >
                                        <option></option>
                                        {
                                            listadoIES.map(
                                                item => (
                                                    <option value={item.id}>{item.codigo} - {item.institucion}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div> */}

                            </div>}

                            {pais?.label !== 'ECUADOR' && <div className="column">
                                <label className="label is-small has-text-info">Nombre IES</label>
                                {errors.nombreIES && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el nombre de la IES Internacional!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('nombreIES', { required: true })} />
                                </div>

                            </div>
                            }
                        </div>
                        <div className="columns is-multiline">
                            <div className="column">
                                <div className="control">
                                    <label className="label is-small has-text-info">Nivel Educativo</label>
                                    {errors.nivel && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el nivel educativo!</span>}
                                </div>


                                <Controller
                                    name="nivel"
                                    control={control}
                                    rules={{ required: true }}
                                    render={
                                        ({ field }) =>
                                        (<Select aria-label="nivel" {...field}
                                            onChange={(ev) => {
                                                setNivelEdu(ev?.label)
                                                setValue('nivel', ev, { shouldValidate: true })
                                                if (ev?.label.includes('CUARTO')) { dispatch(loadGrados()) }
                                            }}



                                            options={
                                                niveles.map(
                                                    (nivel) => ({ label: nivel.nivel, value: nivel.id })

                                                )
                                            }



                                        />)}

                                />

                                {/* <div className="select">
                                    <select {...register('nivel', { required: true })} onChange={ev => {
                                        setNivelEdu(ev.target.options[ev.target.selectedIndex].text)
                                        if (ev.target.options[ev.target.selectedIndex].text.includes('CUARTO')) {
                                            dispatch(loadGrados())
                                        }


                                    }

                                    }>
                                        <option></option>
                                        {
                                            nivelesState.map(
                                                (nivel) => (
                                                    nivel.nivel !== 'TERCER/ CUARTO NIVEL' && <option value={nivel.id}>{nivel.nivel}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div> */}
                            </div>

                            {nivelEdu === 'CUARTO NIVEL' && <div className="column is-6">
                                <div className="control">
                                    <label className="label is-small has-text-info">Grado</label>
                                    {errors.grado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el grado!</span>}
                                </div>
                                <Controller
                                    control={control}
                                    name="grado"
                                    rules={{ required: true }}
                                    defaultValue={objeto?.grado ? { value: objeto.grado.id, label: objeto.grado.grado } : ''}
                                    render={
                                        ({ field }) => (
                                            <Select
                                                aria-label="grado"
                                                {...field}

                                                options={
                                                    gradosState.map(
                                                        grado => (
                                                            { label: grado.grado, value: grado.id }
                                                        )
                                                    )
                                                }
                                            />
                                        )
                                    }
                                />
                                {/* <div className="select">
                                    <select {...register('grado', { required: true })}>
                                        <option> </option>
                                        {gradosState.map(
                                            (g) => (
                                                <option value={g.id}> {g.grado} </option>
                                            )
                                        )}
                                    </select>
                                </div> */}
                            </div>}
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <label className="label is-small has-text-info">Título</label>
                                {errors.titulo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el título!</span>}
                                <div className="control">
                                    <input className="input is-uppercase" {...register('titulo', { required: true })} />

                                </div>
                            </div>

                            <div className="column">
                                <div className="control">
                                    <label className="label is-small has-text-info">Campo de estudio</label>
                                    {/* <input type="text" className="input" onChange={ev => filtrarCampos(ev.target.value)} /> */}
                                </div>
                                {errors.campoEstudio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el campo de estudio!</span>}

                                <Controller
                                    name="campoEstudio"
                                    control={control}

                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            placeholder="Seleccione"
                                            isClearable

                                            {...field}


                                            options={
                                                camposState.map(
                                                    (campo) => ({ value: campo.id, label: `${campo.codigo} - ${campo.descripcion}` }))
                                            }

                                        />
                                    )}
                                />
                            </div>
                        </div>

                        <div className="columns">
                            <div className="column">
                                <div className="control">
                                    <label className="label is-small has-text-info"> Estado</label>
                                    {errors.estado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el estado de la formación académica!</span>}
                                </div>
                                <Controller
                                    name="estado"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.estado ? objeto.estado : ''}
                                    render={
                                        ({ field }) =>
                                        (<RadioGroup aria-label="estado" {...field} onChange={(ev) => {
                                            setEstadoFormacion(ev.target.value)
                                            setValue('estado', ev.target.value, { shouldValidate: true })

                                        }}>
                                            {Object.entries(opciones).map((op) => (
                                                <FormControlLabel key={atob(op[1])}
                                                    value={op[1]}
                                                    control={<Radio size="small" />}
                                                    label={op[1]}
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />

                                            ))}
                                        </RadioGroup>)
                                    }
                                />

                                {/* <select  {...register('estado', { required: true })} onChange={(ev) => setEstadoFormacion(ev.target.value)} className="input">
                                        <option></option>
                                        {
                                            Object.entries(opciones).map((op) => (
                                                <option value={op[1]}> {op[1]} </option>
                                            ))
                                        }
                                    </select> */}

                            </div>
                            <div className="column">
                                <label className="label is-small has-text-info">Fecha inicio</label>
                                {errors.fechaInicio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio del evento!</span>}
                                {errors.fechaInicio?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de inicio no puede ser mayor a la fecha actual!</span>}
                                <div className="control">
                                    <input type="date" className="input" {...register('fechaInicio', { required: true })}

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

                            {estadoFormacion === 'FINALIZADO' && <div className="column">
                                <label className="label is-small has-text-info">Fecha fin</label>
                                {errors.fechaFin && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de finalización del evento!</span>}
                                {errors.fechaFin?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.fechaFin.message}</span>}

                                <div className="control">
                                    <input type="date" className="input" {...register('fechaFin', { required: true })} onChange={
                                        ev => {
                                            clearErrors('fechaFin')
                                            if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) < new Date(getValues('fechaInicio'))) {
                                                setError("fechaFin", {
                                                    type: 'min',
                                                    message: 'La fecha de fin debe ser mayor a la feha de inicio'
                                                })
                                            }
                                        }
                                    } />
                                </div>
                            </div>}

                            {estadoFormacion === 'FINALIZADO' && <div className="column">
                                <label className="label is-small has-text-info">No Registro Senescyst</label>
                                {errors.registroSenescyt && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, ingrese el número registro Senescyt!</span>}
                                <div className="control">
                                    <input type="text" className="input" {...register('registroSenescyt', { required: true })} />
                                </div>

                            </div>}


                        </div>
                        <div className="columns">
                            {estadoFormacion === 'FINALIZADO' && <div className="column">
                                <div className="control">
                                    <label className="label is-small has-text-info">Fecha Obtención título</label>
                                    {errors.fechaObtencionTitulo?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.fechaObtencionTitulo.message}</span>}
                                </div>
                                <div className="control">
                                    <input type="date" className="input" {...register('fechaObtencionTitulo', { required: true })} onChange={
                                        ev => {
                                            clearErrors('fechaObtencionTitulo')
                                            if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) < new Date(getValues('fechaInicio'))) {
                                                setError("fechaObtencionTitulo", {
                                                    type: 'min',
                                                    message: 'La fecha de obtención del título fin debe ser mayor a la feha de inicio'
                                                })
                                            }
                                        }
                                    } />
                                </div>
                            </div>
                            }
                            <div className="column">
                                <label className="label is-small has-text-info">Lugar</label>
                                {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde relizó su formación académica!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('lugar', { required: true })} />
                                </div>

                            </div>
                            {estadoFormacion === 'EN CURSO' && <div className="column">
                                <label className="label is-small has-text-info">Posee beca</label>
                                {errors.poseeBeca && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione una opción!</span>}
                                <Controller
                                    name="poseeBeca"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue=''
                                    render={
                                        ({ field }) =>
                                        (<RadioGroup aria-label="poseeBeca" {...field} onChange={(ev) => {
                                            setTieneBeca(ev.currentTarget.value)
                                            setValue('poseeBeca', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })

                                        }}>

                                            <FormControlLabel
                                                value="SI"
                                                key="ti-bec001"
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
                                                key="ti-bec002"
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


                                        </RadioGroup>)
                                    }
                                />
                                {/* <div className="select">
                                    <select className="input" {...register('poseeBeca', { required: true })} onChange={ev => setTieneBeca(ev.target.value)}>
                                        <option></option>
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>
                                </div> */}

                            </div>}

                            {tieneBeca === 'SI' && <div className="column">
                                <label className="label is-small has-text-info">Tipo beca</label>
                                {errors.tipoBeca && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de beca!</span>}

                                <Controller
                                    name="tipoBeca"
                                    control={control}
                                    rules={{ required: true }}
                                    defaultValue={objeto?.tipo_beca ? objeto.tipo_beca.id : ''}
                                    render={
                                        ({ field }) =>
                                        (<RadioGroup aria-label="tipoBeca" {...field} onChange={(ev) => {
                                            setValue('tipoBeca', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })

                                        }}>

                                            {tipoBecasState.map((tipo) => (<FormControlLabel
                                                key={tipo.id}
                                                value={tipo.id}
                                                control={<Radio size="small" />}
                                                label={tipo.tipo_beca}
                                                sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: 14,
                                                        fontWeight: 500
                                                    },
                                                }}
                                            />))}



                                        </RadioGroup>)}

                                />


                            </div>}


                        </div>

                        <div className="columns">
                            {tieneBeca === 'SI' &&
                                <div className="column">
                                    <label className="label is-small has-text-info">Monto beca</label>
                                    {errors.montoBeca?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, ingrese el monto de la beca!</span>}
                                    {errors.montoBeca?.type === "min" && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, ingrese un monto correcto!</span>}
                                    <input type="number" className="input" {...register('montoBeca', { required: true })} onChange={
                                        ev => {
                                            clearErrors('montoBeca')
                                            if (ev.target.value <= 0) {
                                                setError('montoBeca', {
                                                    type: 'min'
                                                })
                                            }
                                        }
                                    } />
                                </div>
                            }
                            {tieneBeca === 'SI' &&
                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small has-text-info">Tipo finaciamiento</label>
                                        {errors.financiamiento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de financiamiento!</span>}
                                    </div>
                                    <Controller
                                        control={control}
                                        name="financiamiento"
                                        rules={{ required: true }}

                                        render={
                                            ({ field }) =>
                                            (<Select
                                                placeholder="Seleccione"
                                                isClearable
                                                defaultValue={objeto?.financiamiento ? { label: objeto.financiamiento.financiamiento, value: objeto.financiamiento.id } : null}
                                                {...field}


                                                options={
                                                    financiamientosState.map(
                                                        (financiamiento) => ({ value: financiamiento.id, label: financiamiento.financiamiento }))
                                                }
                                                onChange={
                                                    ev => {
                                                        setTipoFin(ev?.label)
                                                        setValue('financiamiento', ev)
                                                    }
                                                }
                                            />)

                                        }
                                    />
                                    {/* <div className="select">
                                        <select tclassName="input" {...register('financiamiento', { required: true })}
                                            onChange={ev => setTipoFin(ev.target.options[ev.target.selectedIndex].text)}
                                        >
                                            <option></option>
                                            {financiamientosState.map(
                                                (financiamiento) => (
                                                    <option value={financiamiento.id}> {financiamiento.financiamiento} </option>
                                                )
                                            )}

                                        </select>
                                    </div> */}
                                </div>
                            }
                            {tieneBeca === 'SI' && tipoFin === 'OTRO' && <div className="column">
                                <div className="control">
                                    <label className="label is-small has-text-info">Descripción</label>
                                    {errors.financiamiento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, describa el tipo de financiamiento!</span>}
                                </div>
                                <div className="control">
                                    <input className="input" {...register('descripcion', { required: true })} />



                                </div>

                            </div>}
                        </div>
                        <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="control has-text-centered">
                                <Fragment>
                                    {children}
                                </Fragment>

                                <button type="submit" className="button is-success is-small mx-3" onClick={() => getValues()}>Guardar</button>

                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default FormacionAcademicaModalForm;