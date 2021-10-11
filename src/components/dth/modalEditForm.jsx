import { useEffect, useState, Fragment } from "react"
import Funcionario from './funcionarios/contrato'
import Profesor from './profesores/contrato'
import { useForm } from 'react-hook-form'
import { options } from './options'
import { loadTiposDocumentos } from '../../store/core/tiposDocumentos'
import { loadRelacionesIES } from '../../store/core/relacionesIES'
import { loadAreasInstitucionales } from '../../store/core/area'
import { loadExpedienteLaboral, putDetalleExpediente } from '../../store/dth/expediente_laboral'
import { useDispatch, useSelector } from "react-redux"
import Alert from '../Alert'

let ModalForm = ({ title, children, objeto, handler, identificacion }) => {

    const [tipoFuncionario, setTipoFuncionario] = useState('')
    const { register, handleSubmit, getValues, watch, reset, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    let tiposDocumentosState = useSelector(state => state.tiposDocumentos.data.tiposDocumentos)
    let relacionesIESState = useSelector(state => state.relacionesIES.data.relacionesIES)
    let areasState = useSelector(state => state.areasInstitucionales.data.areas)
    const [areas, setAreas] = useState([])
    const [subAreas, setSubAreas] = useState([])
    const [error, setError] = useState(null)
    const [response, setResponse] = useState(null)

    useEffect(
        () => {
            dispatch(
                loadTiposDocumentos()
            )
            dispatch(
                loadRelacionesIES()
            )
            dispatch(
                loadAreasInstitucionales()
            )
            filtrarAreas(objeto.area.nombre)
            filtrarSubAreas(objeto.sub_area.nombre)
        }, [dispatch]
    )

    let filtrarAreas = (ev) => {
        let filtrados = []
        areasState.forEach(
            (area) => {
                if (area.nombre.startsWith(ev.toUpperCase())) {
                    filtrados.push(area)
                }
            }
        )
        setAreas(filtrados)

    }

    let filtrarSubAreas = (ev) => {
        let filtrados = []

        areasState.forEach(
            (area) => {
                if (area.nombre.startsWith(ev.toUpperCase())) {
                    filtrados.push(area)
                }
            }
        )
        setSubAreas(filtrados)

    }

    useEffect(() => {



        setTipoFuncionario(objeto.tipo_personal)

        if (objeto.tipo_personal === 'FUNCIONARIO') {
            reset({
                tipo_personal: objeto.tipo_personal,
                numero_documento: objeto.numero_documento,
                //tipo_documento: objeto.tipo_documento.id,
                motivo_accion: objeto.motivo_accion,
                fecha_inicio: objeto.fecha_inicio,
                fecha_fin: objeto.fecha_fin,
                ingreso_concurso: objeto.ingreso_concurso,
                //relacion_ies: objeto.relacion_ies.id,
                remuneracion_mensual: objeto.remuneracion_mensual,
                //area: objeto.area.id,
                //sub_area: objeto.sub_area !== null ? objeto.sub_area.id: '',

                // tipo_funcionario:objeto.tipo_funcionario.id,
                // tipo_docente: objeto.tipo_docente.id,
                // categoria_docente: objeto.categoria_docente.id,
                cargo: objeto.cargo,
                horas_laborables_semanales: objeto.horas_laborables_semanales
            })
        }

    }, [])

let onSubmit = (data) =>{
        console.log(data);
        let detalle = { id: objeto.id, ...data }
        
        dispatch(
            putDetalleExpediente(detalle)
        ).unwrap().
        then(
            resp =>setResponse(resp)
        ).catch(err=>console.log(err))
    }

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="modal-card-title">{title}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="field">
                            <label className="label is-small is-uppercase">Tipo Funcionario</label>
                            <div className="select">
                                <select onChange={ev => {
                                    setTipoFuncionario(ev.target.value)
                                    reset(
                                        { tipo_personal: ev.target.value }
                                    )
                                }} defaultValue={tipoFuncionario} className="input is-small">
                                    {!objeto && <option> </option>}
                                    <option>FUNCIONARIO</option>
                                    <option>PROFESOR</option>
                                </select>
                                <input type="hidden"   {...register("tipo_personal", { required: true })} />
                            </div>

                        </div>
                        <div className="field is-grouped">

                            <div className="control">
                                <label className="label is-small">TIPO DOCUMENTO</label>
                                <div className="select">
                                    <select  {...register("tipo_documento", { required: true })} className="input is-small" defaultValue={objeto.tipo_documento}>
                                        <option> </option>
                                        {
                                            tiposDocumentosState.map(
                                                (row, index) => (
                                                    <option value={row.id}> {row.tipo_documento}</option>
                                                )
                                            )
                                        }
                                    </select>
                                    {errors.tipo_documento && <span>¡Por favor, Seleccione el tipo de documento!</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">MOTIVO ACCIÓN</label>
                                <div className="select">
                                    <select {...register("motivo_accion")} className="input is-small">
                                        <option></option>
                                        {
                                            options.map((op) => (
                                                <option>{op}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">
                                    FECHA INICIO
                                </label>
                                <input type="date" {...register("fecha_inicio")} className="input is-small" />
                            </div>
                            <div className="control">
                                <label className="label is-small">
                                    FECHA FIN
                                </label>
                                <input type="date" {...register("fecha_fin")} className="input is-small" />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">INGRESO POR CONCURSO</label>
                                <div className="select">
                                    <select {...register("ingreso_concurso", { required: true })} className="input is-small">
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>


                                    {errors.ingreso_concurso && <span>¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">RELACION IES</label>
                                <div className="select">
                                    <select {...register("relacion_ies", { required: true })} className="input is-small">
                                        <option> </option>
                                        {relacionesIESState.map(
                                            (row, index) => (
                                                <option value={row.id}> {row.relacion}</option>
                                            )
                                        )
                                        }

                                    </select>


                                    {errors.relacion_ies && <span>¡Por favor, Seleccione si la relación!</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">NUMERO DOCUMENTO</label>
                                <div className="control">
                                    <input  {...register("numero_documento", { required: true })} className="input is-small" />

                                    {errors.numero_documento && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </div>

                        </div>

                        {
                            tipoFuncionario === 'FUNCIONARIO' && <Funcionario register={register} errors={errors} objeto={objeto} />
                        }
                        {
                            tipoFuncionario === 'PROFESOR' && <Profesor register={register} errors={errors} objeto={objeto} />
                        }
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">REMUNERACION MENSUAL</label>
                                <div className="control">
                                    <input {...register("remuneracion_mensual", { required: true })} className="input is-small" />




                                    {errors.remuneracion_mensual && <span>¡Por favor, Seleccione si la remuneración mensual!</span>}
                                </div>
                            </div>
                            <div className="control">
                                <div className="control">
                                    <label className="label is-small">AREA</label>
                                    <input type="text" onChange={ev => filtrarAreas(ev.target.value)} />
                                </div>
                                <div className="select">

                                    <select {...register("area", { required: true })} className="input is-small" >
                                        {
                                            areas.map(
                                                (area) =>
                                                    (<option value={area.id}>{area.nombre} </option>)
                                            )
                                        }
                                    </select>

                                    {errors.area && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </div>

                        </div>
                        <div className="field">
                            <div className="control">
                                <label className="label is-small">SUBAREA</label>
                                <input type="text" onChange={ev => filtrarSubAreas(ev.target.value)} />
                            </div>
                            <div className="select">

                                <select {...register("sub_area")} className="input is-small" >
                                    <option> </option>
                                    {
                                        subAreas.map(
                                            (subArea) =>
                                                (<option value={subArea.id}>{subArea.nombre} </option>)
                                        )
                                    }
                                </select>

                            </div>
                        </div>

                        <div className="field is-grouped mb-6" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="control has-text-centered">
                                <Fragment>
                                    {children}
                                </Fragment>
                                {error && <Alert type={'is-danger is-light'} content={error.message}>
                                    <button className="delete" onClick={event => setError(null)}></button>
                                </Alert>}
                                {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                    <button className="delete" onClick={event => setResponse(null)}></button>
                                </Alert>}
                                {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                    <button className="delete" onClick={event => {
                                        setResponse(null)
                                        objeto = null
                                        dispatch(
                                            loadExpedienteLaboral(identificacion)
                                        )
                                    }}></button>
                                </Alert>}

                                <button type="submit" className="button is-success is-small mx-3">

                                Guardar</button>

                            </div>
                        </div>

                    </form>

                </section>
            </div>
        </div >
    )
}

export default ModalForm