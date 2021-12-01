import { useEffect, useState, Fragment } from "react"
import Funcionario from './funcionarios/contrato'
import Profesor from './profesores/contrato'
import { useForm, Control, Controller } from 'react-hook-form'
import { options } from './options'
import { loadTiposDocumentos } from '../../store/core/tiposDocumentos'
import { loadRelacionesIES } from '../../store/core/relacionesIES'
import { loadAreasInstitucionales } from '../../store/core/area'
import { useDispatch, useSelector } from "react-redux"

import { loadNivelesEducativos } from '../../store/core/nivelesEducativos'
import { loadTiemposDedicacionesProfesores } from '../../store/core/tiemposDedicaciones'
import { loadTiposEscalafonesNombramientos } from '../../store/core/tiposEscalafones'
import { loadCategoriasContratoProfesores } from '../../store/core/categoriasContratos'
import { loadTiposFuncionarios } from '../../store/core/tiposFuncionarios'
import { loadTiposDocentesLOES } from '../../store/core/tiposDocentes'
import { loadCategoriasDocentesLOSEP } from '../../store/core/categoriasDocentes'
import { postTiposContratos, loadTipoContrato, loadTiposContratos } from '../../store/dth/tipo_contrato'
import { postTiposNombramientos, loadTiposNombramientos } from '../../store/dth/tipo_nombramiento'
import NombramientoModalFrom from './modalTipoNombramiento'
import TipoContratoModal from "./modalTipoContrato"

import { Radio, RadioGroup, FormControlLabel } from '@mui/material'
import Select from 'react-select'
import { IoIosAdd } from 'react-icons/io'
import Alert from '../Alert'
import { logOut } from '../../store/user'


let ModalForm = ({ title, children, handler, objeto, identificacion }) => {

    const [tipoFuncionario, setTipoFuncionario] = useState('')
    const { register, handleSubmit, getValues, reset, setValue, setError, clearErrors, control, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    let tiposDocumentosState = useSelector(state => state.tiposDocumentos.data.tiposDocumentos)
    let relacionesIESState = useSelector(state => state.relacionesIES.data.relacionesIES)
    let areasState = useSelector(state => state.areasInstitucionales.data.areas)
    let tiposContratosState = useSelector(state => state.tiposContratos.data.contratos)
    let tiposNombramientosState = useSelector(state => state.tiposNombramientos.data.nombramientos)



    const [docType, setDocType] = useState(null)
    const [relType, setRelType] = useState(null)
    const [actReason, setActReason] = useState(null)
    const [showModalTipoContrato, setShowModalTipoContrato] = useState(false)
    const [showModalTipoNombramiento, setShowModalTipoNombramiento] = useState(false)
    const [respModal, setRespModal] = useState(null)
    const [errorModal, setErrorModal] = useState(null)

    let postContrato = data => {
        dispatch(
            postTiposContratos({ contrato: data.contrato.toUpperCase() })
        ).unwrap().then(
            (resp) => setRespModal(resp)
        ).catch(
            (err) => {
                if (err.message.includes("undefined (reading 'data')")) {
                    console.error("No hay conexión con el backend");
                    setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                } else if (err.message === "Rejected") {
                    dispatch(
                        logOut()
                    )
                }

                else { setError(err) }
            }
        )
    }

    let postNombramiento = data => {
        dispatch(
            postTiposNombramientos({ contrato: data.contrato.toUpperCase() })
        ).unwrap().then(
            (resp) => setRespModal(resp)
        ).catch(
            (err) => {
                if (err.message.includes("undefined (reading 'data')")) {
                    console.error("No hay conexión con el backend");
                    setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
                } else if (err.message === "Rejected") {
                    dispatch(
                        logOut()
                    )
                }

                else { setError(err) }
            }
        )
    }




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


            dispatch(loadCategoriasContratoProfesores())
            dispatch(loadTiemposDedicacionesProfesores())
            dispatch(loadNivelesEducativos())
            dispatch(loadTiposEscalafonesNombramientos())
            dispatch(loadTiposFuncionarios())
            dispatch(loadTiposDocentesLOES())
            dispatch(loadCategoriasDocentesLOSEP())


        }, [dispatch]
    )




    useEffect(() => {


        if (objeto !== null) {
            setTipoFuncionario(objeto.tipo_personal)
            setDocType(objeto.tipo_documento.tipo_documento)
            setActReason(objeto.motivo_accion)
            if (objeto.tipo_personal === 'FUNCIONARIO') {
                reset({
                    tipo_personal: objeto.tipo_personal,

                    fecha_inicio: objeto.fecha_inicio,
                    fecha_fin: objeto.fecha_fin,
                    ingreso_concurso: objeto.ingreso_concurso,
                    remuneracion_mensual: objeto.remuneracion_mensual,
                    area: objeto.area.id,
                    sub_area: objeto.sub_area !== null ? objeto.sub_area.id : '',
                    motivo_accion: objeto.motivo_accion,

                    cargo: objeto.cargo,
                    horas_laborables_semanales: objeto.horas_laborables_semanales
                })
            } else if (objeto.tipo_personal === 'PROFESOR') {
                reset({
                    motivo_accion: objeto.motivo_accion,
                    tipo_personal: objeto.tipo_personal,
                    fecha_inicio: objeto.fecha_inicio,
                    fecha_fin: objeto.fecha_fin,
                    ingreso_concurso: objeto.ingreso_concurso,
                    area: objeto.area.id,
                    sub_area: objeto.sub_area !== null ? objeto.sub_area.id : '',
                    remuneracion_mensual: objeto.remuneracion_mensual,
                    remuneracion_hora: objeto.remuneracion_hora,
                    contrato_relacionado: objeto.contrato_relacionado




                })

            }
        }
    }, [objeto, reset])

    return (
        <>
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

                                    <Controller
                                        name="tipo_personal"
                                        rules={{ required: true }}
                                        defaultValue={objeto?.tipo_personal}
                                        control={control}
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup
                                                row
                                                aria-label="tipo personal"

                                                {...field}

                                                onChange={
                                                    ev => {
                                                        setTipoFuncionario(ev.target.value)
                                                        setValue("tipo_personal", ev.target.value)
                                                    }
                                                } >
                                                <FormControlLabel
                                                    value="FUNCIONARIO"
                                                    control={<Radio size="small" />}
                                                    label="FUNCIONARIO"
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />

                                                <FormControlLabel
                                                    value="PROFESOR"
                                                    control={<Radio size="small" />}
                                                    label="PROFESOR"
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


                                </div>


                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small">TIPO DOCUMENTO</label>
                                        {errors.tipo_documento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione el tipo de documento!</span>}
                                    </div>
                                    <Controller
                                        name="tipo_documento"
                                        rules={{ required: true }}
                                        defaultValue={objeto?.tipo_personal}
                                        control={control}
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup
                                                row
                                                aria-label="tipo documento"

                                                {...field}

                                                onChange={
                                                    ev => {

                                                        setDocType(tiposDocumentosState.find(t => (t.id === ev.target.value)))
                                                        setValue("tipo_documento", ev.target.value, { shouldValidate: true })
                                                    }
                                                } >
                                                {tiposDocumentosState.map(
                                                    (row, index) => (<FormControlLabel
                                                        value={row.id}
                                                        key={row.id}
                                                        control={<Radio size="small" />}
                                                        label={row.tipo_documento}
                                                        sx={{
                                                            '& .MuiFormControlLabel-label': {
                                                                fontSize: 14,
                                                                fontWeight: 500
                                                            },
                                                        }}
                                                    />))

                                                }
                                            </RadioGroup>)
                                        }
                                    />



                                </div>
                                {docType?.tipo_documento === 'ACCION PERSONAL' && <div className="column">
                                    <label className="label is-small">MOTIVO ACCIÓN</label>
                                    {errors.motivo_accion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el motivo de la acción de personal!</span>}
                                    <Controller
                                        name="motivo_accion"
                                        control={control}
                                        rules={{ required: docType?.tipo_documento === 'ACCION PERSONAL' }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    onChange={
                                                        (ev) => {
                                                            setActReason(ev.label)
                                                            setValue('tipo_documento', ev)
                                                        }
                                                    }
                                                    options={
                                                        options.map((op, index) => ({ value: op, label: op, key: `act-${index}` }))
                                                    }
                                                />
                                            )
                                        }
                                    />

                                    <div className="control">
                                        {errors.descripcion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, el motivo de la acción de personal!</span>}
                                    </div>
                                    {actReason === 'OTRO' && <input type="text"{...register("descripcion", { required: true })} className="input" defaultValue={objeto?.descripcion} />}
                                </div>}

                                {docType?.tipo_documento === 'CONTRATO' && <div className="column">
                                    <label className="label is-small">TIPO CONTRATO
                                        <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalTipoContrato(true)}><IoIosAdd /></span></label>
                                    {errors.tipoContrato?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de contrato!</span>}
                                    <Controller
                                        name="tipoContrato"
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    options = {
                                                        tiposContratosState.map(
                                                            con => ({label: con.contrato, value: con.id , key: con.id})
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />
                                </div>}
                                {
                                    (actReason === 'NOMBRAMIENTO' || relType === 'NOMBRAMIENTO') && <div className="column">
                                        <lable className="label is-small">TIPO NOMBRAMIENTO
                                            <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalTipoContrato(true)}><IoIosAdd /></span>
                                        </lable>
                                        {errors.tipoNombramiento?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el tipo de contrato!</span>}
                                    <Controller
                                        name="tipoNombramiento"
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    options = {
                                                        tiposNombramientosState.map(
                                                            (nom) =>({label: nom.nombramiento, value: nom.id, key: nom.id})
                                                        )
                                                    }
                                                    
                                                />
                                            )
                                        }
                                    />

                                    </div>
                                }
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">
                                        FECHA INICIO
                                    </label>
                                    {errors.fecha_inicio?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio!</span>}
                                    {errors.fecha_inicio?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de ingreso no puede ser mayor a la fecha actual!</span>}
                                    <input type="date" {...register("fecha_inicio", { required: true })} className="input" onChange={
                                        ev => {
                                            let fecha = new Date(ev.target.value)
                                            clearErrors('fecha_inicio')
                                            if (fecha > new Date()) {
                                                setError('fecha_inicio', {
                                                    type: 'max'
                                                })
                                            }

                                        }
                                    } />
                                </div>
                                <div className="column">
                                    <label className="label is-small">
                                        FECHA FIN
                                    </label>
                                    {errors.fecha_fin?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light"> {errors.fecha_fin.message} </span>}
                                    <input type="date" {...register("fecha_fin")} className="input" onChange={
                                        ev => {
                                            clearErrors('fecha_fin')
                                            if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) < new Date(getValues('fecha_inicio'))) {
                                                setError("fecha_fin", {
                                                    type: 'min',
                                                    message: 'La fecha de fin debe ser mayor a la feha de inicio'
                                                })
                                            }
                                        }
                                    } />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small">INGRESO POR CONCURSO</label>
                                        {errors.ingreso_concurso && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                    </div>
                                    <Controller
                                        name="ingreso_concurso"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.ingreso_concurso}
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup aria-label="ingreso_concurso" row {...field} onChange={(ev) => {
                                                setValue('ingreso_concurso', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })

                                            }}>

                                                <FormControlLabel
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
                                </div>


                                <div className="column">
                                    <label className="label is-small">RELACION IES</label>
                                    {errors.relacion_ies && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si la relación!</span>}
                                    {/* <div className="select">
                                    <select {...register("relacion_ies", { required: true })} className="input" onChange={
                                        ev => {
                                            setRelType(ev.target.options[ev.target.selectedIndex].text)
                                        }
                                    }
                                        defaultValue={relacionesIESState && objeto?.relacion_ies.id}>
                                        <option></option>
                                        {relacionesIESState.map(
                                            (row, index) => (
                                                <option value={row.id}> {row.relacion}</option>
                                            )
                                        )
                                        }

                                    </select> 
                                </div>
                                */}

                                    <Controller
                                        name="relacion_ies"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.ingreso_concurso}
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup aria-label="relacion_ies" row {...field} onChange={(ev) => {
                                                let relacion = relacionesIESState.find(r => r.id === ev.target.value)
                                                setRelType(relacion?.relacion)
                                                setValue('relacion_ies', ev.target.value ? ev.target.value : null, { shouldValidate: true })

                                            }}>

                                                {relacionesIESState.map((rel) => (<FormControlLabel
                                                    value={rel.id}
                                                    control={<Radio size="small" />}
                                                    label={rel.relacion}
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />))}



                                            </RadioGroup>)
                                        }
                                    />
                                </div>
                                <div className="column">
                                    <label className="label is-small">NUMERO DOCUMENTO</label>
                                    {errors.numero_documento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Ingrese el número de documento!</span>}
                                    <div className="control">
                                        <input  {...register("numero_documento", { required: true })} className="input" defaultValue={
                                            objeto?.numero_documento
                                        } />


                                    </div>
                                </div>

                            </div>

                            {
                                tipoFuncionario === 'FUNCIONARIO' && <Funcionario register={register} errors={errors} objeto={objeto} conrtol={control} />
                            }
                            {
                                tipoFuncionario === 'PROFESOR' && <Profesor register={register} errors={errors} objeto={objeto} relacion={relType} conrtol={control} />
                            }
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">REMUNERACION MENSUAL</label>
                                    {errors.remuneracion_mensual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si la remuneración mensual!</span>}
                                    <div className="control">
                                        <input {...register("remuneracion_mensual", { required: true })} className="input" />


                                    </div>
                                </div>
                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small">AREA</label>
                                        {errors.area && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Por favor seleccione el area institucional!</span>}

                                    </div>

                                    <Controller
                                        name="area"
                                        control={control}
                                        rules={{ required: true, valueAsNumber: true }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    aria-label="area institucional"
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    {...field}
                                                    options={
                                                        areasState.map(
                                                            a => ({ label: a.nombre, value: a.id, key: a.id })
                                                        )
                                                    }
                                                />
                                            )
                                        }

                                    />
                                </div>

                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small">SUB AREA</label>
                                    </div>
                                    <Controller
                                        name="area"
                                        control={control}
                                        rules={{ valueAsNumber: true }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    aria-label="area institucional"
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    {...field}
                                                    options={
                                                        areasState.map(
                                                            a => ({ label: a.nombre, value: a.id, key: a.id })
                                                        )
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
            {
                showModalTipoContrato && <TipoContratoModal title="Registrar tipo contrato" handler={postContrato}>
                    <div className="columns is-centered">
                        <div className="column">
                            {
                                respModal && respModal.type === 'warning'
                                && <Alert type={'is-warning is-light'} content={respModal.content}>
                                    <button className="delete" onClick={() => setRespModal(null)}></button>
                                </Alert>
                            }

                            {
                                respModal && respModal.type === 'success'
                                && <Alert type={'is-success is-light'} content={respModal.content}>
                                    <button className="delete" onClick={() => {
                                        setRespModal(null)
                                        setShowModalTipoContrato(false)
                                        dispatch(loadTiposContratos())
                                    }}></button>
                                </Alert>
                            }


                            {
                                errorModal
                                && <Alert type={'is-danger is-light'} content={errorModal.message}>
                                    <button className="delete" onClick={() => setErrorModal(null)}></button>
                                </Alert>
                            }

                        </div>
                    </div>
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalTipoContrato(false)
                    }}>Cancelar</button>
                </TipoContratoModal>
            }
            {
                showModalTipoNombramiento && <NombramientoModalFrom title="Registar tipo nombramiento" handler={postNombramiento}>
                    <div className="columns is-centered">
                        <div className="column">
                            {
                                respModal && respModal.type === 'warning'
                                && <Alert type={'is-warning is-light'} content={respModal.content}>
                                    <button className="delete" onClick={() => setRespModal(null)}></button>
                                </Alert>
                            }

                            {
                                respModal && respModal.type === 'success'
                                && <Alert type={'is-success is-light'} content={respModal.content}>
                                    <button className="delete" onClick={() => {
                                        setRespModal(null)
                                        setShowModalTipoNombramiento(false)
                                        dispatch(loadTiposNombramientos())
                                    }}></button>
                                </Alert>
                            }


                            {
                                errorModal
                                && <Alert type={'is-danger is-light'} content={errorModal.message}>
                                    <button className="delete" onClick={() => setErrorModal(null)}></button>
                                </Alert>
                            }

                        </div>
                    </div>
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalTipoNombramiento(false)
                    }}>Cancelar</button>

                </NombramientoModalFrom>
            }
        </>
    )
}

export default ModalForm