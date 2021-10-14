import { useEffect, useState, Fragment } from "react"
import Funcionario from './funcionarios/contrato'
import Profesor from './profesores/contrato'
import { useForm } from 'react-hook-form'
import { options } from './options'
import { loadTiposDocumentos } from '../../store/core/tiposDocumentos'
import { loadRelacionesIES } from '../../store/core/relacionesIES'
import { loadAreasInstitucionales } from '../../store/core/area'
import { useDispatch, useSelector } from "react-redux"

let ModalForm = ({ title, children, handler }) => {

    const [tipoFuncionario, setTipoFuncionario] = useState('')
    const { register, handleSubmit, watch, reset, getValues,setValue, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    let tiposDocumentosState = useSelector(state => state.tiposDocumentos.data.tiposDocumentos)
    let relacionesIESState = useSelector(state => state.relacionesIES.data.relacionesIES)
    let areasState = useSelector(state => state.areasInstitucionales.data.areas)
    const [areas, setAreas] = useState([])
    const [subAreas, setSubAreas] = useState([])
    const[docType, setDocType] =useState(null)
   

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




    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic">{title}</span>

                </header>
                <section className="modal-card-body">
                    <form onSubmit={handleSubmit(handler)}>
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small is-uppercase">Tipo personal</label>
                                {errors.tipo_personal && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione el tipo!</span>}
                                <div className="select">
                                    <select onChange={ev => 
                                        {setTipoFuncionario(ev.target.value)
                                        setValue("tipo_personal", ev.target.value)}
                                    } className="input is-small">
                                        <option></option>
                                        <option>FUNCIONARIO</option>
                                        <option>PROFESOR</option>
                                    </select>
                                    <input type="hidden"   {...register("tipo_personal", { required: true })}  />
                                </div>

                            </div>


                            <div className="column">
                                <div className="control">
                                    <label className="label is-small">TIPO DOCUMENTO</label>
                                    {errors.tipo_documento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione el tipo de documento!</span>}
                                </div>
                                <div className="select">
                                    <select  {...register("tipo_documento", { required: true })} className="input is-small" onChange={ev=>setDocType(ev.target.options[ev.target.selectedIndex].text)} >
                                        <option> </option>
                                        {
                                            tiposDocumentosState.map(
                                                (row, index) => (
                                                    <option value={row.id}> {row.tipo_documento}</option>
                                                )
                                            )
                                        }
                                    </select>

                                </div>
                            </div>
                            <div className="column">
                                <label className="label is-small">MOTIVO ACCIÓN</label>
                                <div className="select">
                                    <select {...register("motivo_accion")} className="input is-small">
                                        <option></option>
                                        {
                                           docType === 'ACCION PERSONAL'  && options.map((op) => (
                                                <option>{op}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>



                            <div className="column">
                                <label className="label is-small">
                                    FECHA INICIO
                                </label>
                                {errors.fecha_inicio?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio!</span>}
                                {errors.fecha_inicio?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de ingreso no puede ser mayor a la fecha actual!</span>}
                                <input type="date" {...register("fecha_inicio", { required: true })} className="input is-small" />
                            </div>
                            <div className="column">
                                <label className="label is-small">
                                    FECHA FIN
                                </label>
                                <input type="date" {...register("fecha_fin")} className="input is-small" />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="control">
                                    <label className="label is-small">INGRESO POR CONCURSO</label>
                                    {errors.ingreso_concurso && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                </div>
                                <div className="select">
                                    <select {...register("ingreso_concurso", { required: true })} className="input is-small">
                                        <option></option>
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>



                                </div>
                            </div>


                            <div className="column">
                                <label className="label is-small">RELACION IES</label>
                                {errors.relacion_ies && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si la relación!</span>}
                                <div className="select">
                                    <select {...register("relacion_ies", { required: true })} className="input is-small">
                                        <option></option>
                                        {relacionesIESState.map(
                                            (row, index) => (
                                                <option value={row.id}> {row.relacion}</option>
                                            )
                                        )
                                        }

                                    </select>


                                   
                                </div>
                            </div>
                            <div className="column">
                                <label className="label is-small">NUMERO DOCUMENTO</label>
                                {errors.numero_documento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Ingrese el número de documento!</span>}
                                <div className="control">
                                    <input  {...register("numero_documento", { required: true })} className="input is-small" />


                                </div>
                            </div>

                        </div>

                        {
                            tipoFuncionario === 'FUNCIONARIO' && <Funcionario register={register} errors={errors} />
                        }
                        {
                            tipoFuncionario === 'PROFESOR' && <Profesor register={register} errors={errors} />
                        }
                        <div className="columns">
                            <div className="column">
                                <label className="label is-small">REMUNERACION MENSUAL</label>
                                {errors.remuneracion_mensual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si la remuneración mensual!</span>}
                                <div className="control">
                                    <input {...register("remuneracion_mensual", { required: true })} className="input is-small" />


                                </div>
                            </div>
                            <div className="column">
                                <div className="control">
                                    <label className="label is-small">AREA</label>
                                    {errors.area && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Por favor seleccione el area institucional!</span>}
                                    <input type="text" onChange={ev => filtrarAreas(ev.target.value)} />
                                </div>

                                <div className="select">

                                    <select {...register("area", { required: true, valueAsNumber: true })} className="input is-small" >
                                        {
                                            areas.map(
                                                (area) =>
                                                    (<option value={area.id}>{area.nombre} </option>)
                                            )
                                        }
                                    </select>


                                </div>
                            </div>

                            <div className="column">
                                <div className="control">
                                    <label className="label is-small">SUBAREA</label>
                                    <input type="text" onChange={ev => filtrarSubAreas(ev.target.value)} />
                                </div>
                                <div className="select">

                                    <select {...register("sub_area")} className="input is-small" >
                                        {
                                            subAreas.map(
                                                (subArea) =>
                                                    (<option value={subArea.id}>{subArea.nombre} </option>)
                                            )
                                        }
                                    </select>

                                </div>
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

export default ModalForm