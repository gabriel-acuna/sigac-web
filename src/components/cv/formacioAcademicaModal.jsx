import { useForm } from 'react-hook-form'
import { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loadPaises } from '../../store/core/paises'
import { loadNivelesEducativos } from '../../store/core/nivelesEducativos'
import { useSelector } from 'react-redux'
import { loadTiposFinanciamientos } from '../../store/core/tipo_financiamiento'
import { loadGrados } from '../../store/core/grado'
import { loadTipoBecas } from '../../store/core/tipoBeca'
import { loadIESNacionales } from '../../store/core/ies-nacionales'
import { loadCamposDetallados } from '../../store/core/campoDetallado'


let FormacionAcademicaModalForm = ({ title, handler, children, objeto }) => {


    const { register, reset, handleSubmit, formState: { errors }, getValues, clearErrors, setError } = useForm()
    const opciones = { TERMINADA: "FINALIZADO", CURSANDO: "EN CURSO" }
    const [estadoFormacion, setEstadoFormacion] = useState(null)
    const [paises, setPaises] = useState([])
    const [listadoIES, setListadoIES] = useState([])
    const [listadoCampos, setListadoCampos] = useState([])
    const [nivelEdu, setNivelEdu] = useState(null)
    const [pais, setPais] = useState(null)
    const [tieneBeca, setTieneBeca] = useState(null)
    const [tipoFin, setTipoFin] = useState(null)
    const dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(loadPaises())
            dispatch(loadIESNacionales())
            dispatch(loadNivelesEducativos())
            dispatch(loadCamposDetallados())
            dispatch(loadGrados())
            dispatch(loadTiposFinanciamientos())
            dispatch(loadTipoBecas())
            
            
        }, [dispatch]
    )

    let paisesState = useSelector(state => state.paises.data.paises)
    let iesState = useSelector(state => state.ies.data.iesNacionales)
    let nivelesState = useSelector(state => state.nivelesEducativos.data.nivelesEducativos)
    let financiamientosState = useSelector(state => state.financiamientos.data.tiposFinanciamientos)
    let tipoBecasState = useSelector(state=>state.tipoBecas.data.tipoBecas)
    let gradosState = useSelector(state=>state.grados.data.grados )
    let camposState = useSelector(state=>state.campoDetallado.data.campos)

    

    let filtrarPaises = (ev) => {
        let filtrados = []

        paisesState.forEach(
            (pais) => {
                if (pais.pais.startsWith(ev.toUpperCase())) {
                    filtrados.push(pais)
                }
            }
        )
        setPaises(filtrados)

    }

    let filtrarIES = (ev) => {
        let filtrados = []

        iesState.forEach(
            (item) => {
                
                if ( ev!== null && item?.institucion && item.institucion.includes(ev.toUpperCase())) {
                    filtrados.push(item)
                }
            }
        )
        setListadoIES(filtrados)

    }

    let filtrarCampos = (ev) => {
        let filtrados = []

        camposState.forEach(
            (ies) => {
                if ( ev!== null && ies.descripcion.includes(ev.toUpperCase())) {
                    filtrados.push(ies)
                }
            }
        )
        setListadoCampos(filtrados)

    }

    

    useEffect(
        () => {
            if (objeto !== null) {
                reset({


                })
            }
        }, [objeto, reset]
    )


    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="modal-card-title">{title}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <div className="control">
                                    <label className="label is-small is-uppercase">País estudio</label>
                                    <input type="text" className="input" onChange={ev => filtrarPaises(ev.target.value)} />
                                    {errors.paisEstudio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el país donde realizó o está realizado sus estudios!</span>}
                                </div>

                                <div className="select">
                                    <select type="text" className="input is-uppercase" {...register('paisEstudio', { required: true })}
                                        onChange={ev => setPais(ev.target.options[ev.target.selectedIndex].text)}>
                                        <option></option>
                                        {

                                            paises && paises.map(
                                                (pais) => (
                                                    <option value={pais.id} key={pais.id}>{pais.pais}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>

                            </div>



                            {pais === 'ECUADOR' && <div className="column">
                                <div className="control">
                                    <label className="label is-small is-uppercase">IES</label>
                                    <input type="text" className="input is-uppercase" onChange={ev => filtrarIES(ev.target.value)}/>
                                    {errors.ies && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleecione la IES en la está realizado o realizó su formación!</span>}
                                </div>


                                <div className="select">
                                    <select type="text" className="input input is-uppercase" {...register('ies', { required: true, valueAsNumber: true })} >
                                        <option></option>
                                        {
                                            listadoIES.map(
                                                item=>(
                                                    <option value={item.id}>{item.codigo} - {item.institucion}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>

                            </div>}

                            {pais !== 'ECUADOR' && <div className="column">
                                <label className="label is-small is-uppercase">Nombre IES</label>
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
                                    <label className="label is-small is-uppercase">Nivel Educativo</label>
                                    {errors.nivel && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Selecione el nivel educativo!</span>}
                                </div>
                                <div className="select">
                                    <select {...register('nivel', { required: true })} onChange={ev => setNivelEdu(ev.target.options[ev.target.selectedIndex].text)}>
                                        <option></option>
                                        {
                                            nivelesState.map(
                                                (nivel) => (
                                                    nivel.nivel !== 'TERCER/ CUARTO NIVEL' && <option value={nivel.id}>{nivel.nivel}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>
                            </div>

                            {nivelEdu === 'CUARTO NIVEL' && <div className="column is-6">
                                <div className="control">
                                    <label className="label is-small is-uppercase">Grado</label>
                                    {errors.grado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Selecione el grado!</span>}
                                </div>
                                <div className="select">
                                    <select {...register('grado', { required: true })}>
                                        <option> </option>
                                        {gradosState.map(
                                            (g)=>(
                                            <option value={g.id}> {g.codigo} </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>}
                        </div>
                        <div className="columns">
                            <div className="column is-6">
                                <label className="label is-small is-uppercase">Título</label>
                                {errors.titulo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el título!</span>}
                                <div className="control">
                                    <input className="input is-uppercase" {...register('titulo', { required: true })} />

                                </div>
                            </div>

                            <div className="column">
                                <div className="control">
                                    <label className="label is-small is-uppercase">Campo de estudio</label>
                                    <input type="text" className="input"  onChange={ev=>filtrarCampos(ev.target.value)}/>
                                </div>
                                {errors.campoEstudio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Selecione el campo de estudio!</span>}

                                <div className="select">
                                    <select {...register('campoEstudio', { required: true })}>
                                        <option></option>

                                    </select>

                                </div>
                            </div>
                        </div>
                        
                        <div className="columns">
                            <div className="column">
                                <div className="control">
                                    <label className="label is-small is-uppercase"> Estado</label>
                                    {errors.estado && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Selecione el estado de la formación académica!</span>}
                                </div>
                                <div className="select">
                                    <select  {...register('estado', { required: true })} onChange={(ev) => setEstadoFormacion(ev.target.value)}>
                                        <option></option>
                                        {
                                            Object.entries(opciones).map((op) => (
                                                <option value={op[0]}> {op[1]} </option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="column">
                                <label className="label is-small is-uppercase">Fecha inicio</label>
                                {errors.fechaInicio && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio del evento!</span>}
                                {errors.fecha_ingreso_ies?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de inicio no puede ser mayor a la fecha actual!</span>}
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

                            {estadoFormacion === 'TERMINADA' && <div className="column">
                                <label className="label is-small is-uppercase">Fecha fin</label>
                                {errors.fechaFin && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de finalización del evento!</span>}
                                {errors.fechaFin?.type == 'min' && <span className="has-text-danger is-size-7 has-background-danger-light">{errors.fechaFin.message}</span>}

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

                            {estadoFormacion === 'TERMINADA' && <div className="column">
                                <label className="label is-small is-uppercase">No Registro Senescyst</label>
                                {errors.registroSenescyt && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, ingrese el número registro Senescyt!</span>}
                                <div className="control">
                                    <input type="text" className="input" {...register('registroSenescyt', { required: true })} />
                                </div>

                            </div>}


                        </div>
                        <div className="columns">
                            {estadoFormacion === 'TERMINADA' && <div className="column">
                                <div className="control">
                                    <label className="label is-small is-uppercase">Fecha Obtención título</label>
                                    {errors.registroSenescyt && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, la descripción del registroSenescyt!</span>}
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
                                <label className="label is-small is-uppercase">Lugar</label>
                                {errors.lugar && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el lugar donde relizó su formación académica!</span>}
                                <div className="control">
                                    <input type="text" className="input is-uppercase" {...register('lugar', { required: true })} />
                                </div>

                            </div>
                            {estadoFormacion === 'CURSANDO' && <div className="column">
                                <label className="label is-small is-uppercase">Posee beca</label>
                                {errors.poseeBeca && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, selecione una opción!</span>}
                                <div className="select">
                                    <select className="input" {...register('poseeBeca', { required: true })} onChange={ev => setTieneBeca(ev.target.value)}>
                                        <option></option>
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>
                                </div>

                            </div>}

                            {tieneBeca === 'SI' && <div className="column">
                                <label className="label is-small is-uppercase">Tipo beca</label>
                                {errors.tipoBeca && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, selecione el tipo de beca!</span>}
                                <div className="select">
                                    <select tclassName="input" {...register('tipoBeca', { required: true })} >
                                        <option></option>
                                        {
                                            tipoBecasState.map(
                                                (tipo) =>(
                                                    <option value={tipo.id}>{tipo.tipo_beca}</option>
                                                )
                                            )
                                        }
                                    </select>
                                </div>

                            </div>}


                        </div>

                        <div className="columns">
                            {tieneBeca === 'SI' &&
                                <div className="column">
                                    <label className="label is-small is-uppercase">Monto beca</label>
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
                                        <label className="label is-small is-uppercase">Tipo finaciamiento</label>
                                        {errors.financiamiento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, selecione el tipo de financiamiento!</span>}
                                    </div>
                                    <div className="select">
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
                                    </div>
                                </div>
                            }
                            {tieneBeca === 'SI' &&  tipoFin ==='OTRO' && <div className="column">
                                <div className="control">
                                    <label className="label is-small is-uppercase">Descripción</label>
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

                                <button type="submit" className="button is-success is-small mx-3">Guardar</button>

                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default FormacionAcademicaModalForm;