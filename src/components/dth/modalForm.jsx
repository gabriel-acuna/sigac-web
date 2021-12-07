import { useEffect, useState, Fragment } from "react"
import Funcionario from './funcionarios/contrato'
import Profesor from './profesores/contrato'
import { useForm, Controller } from 'react-hook-form'
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
import { postTiposContratos, loadTiposContratos } from '../../store/dth/tipo_contrato'
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
            postTiposNombramientos({ nombramiento: data.nombramiento.toUpperCase() })
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
            dispatch(loadTiposContratos())
            dispatch(loadTiposNombramientos())


        }, [dispatch]
    )




    useEffect(() => {


        if (objeto !== null) {
            console.log(objeto);
            setTipoFuncionario(objeto.tipo_personal)
            setDocType(objeto.tipo_documento)
            setActReason(objeto.motivo_accion)
            setRelType(objeto.relacion_ies.relacion)
            if (objeto.tipo_personal === 'FUNCIONARIO') {
                reset({
                    tipoPersonal: objeto.tipo_personal,
                    tipoDocumento: objeto.tipo_documento.id,
                    fechaInicio: objeto.fecha_inicio,
                    fechaFin: objeto.fecha_fin,
                    ingresoConcurso: objeto.ingreso_concurso,
                    remuneracionMensual: objeto.remuneracion_mensual,
                    area: { value: objeto.area.id, label: objeto.area.nombre },
                    subArea: objeto.sub_area !== null ? { label: objeto.sub_area.nombre, value: objeto.sub_area.id } : null,
                    motivoAccion: { label: objeto.motivo_accion, value: objeto.motivo_accion },
                    tipoContrato: objeto.tipo_contrato !== null ? { label: objeto.tipo_contrato.contrato, value: objeto.tipo_contrato.id } : null,
                    tipoNombramiento: objeto.tipo_nombramiento !== null ? { label: objeto.tipo_nombramiento.nombramiento, value: objeto.tipo_nombramiento.id } : null,
                    relacionIES: objeto.relacion_ies.id,
                    cargo: objeto.cargo,
                    horasLaborablesSemanales: objeto.horas_laborables_semanales,
                    puestoJerarquico: objeto.puesto_jerarquico
                })
            } else if (objeto.tipo_personal === 'PROFESOR') {
                reset({
                    tipoDocumento: objeto.tipo_documento.id,
                    motivoAccion: { label: objeto.motivo_accion, value: objeto.motivo_accion },
                    tipoPersonal: objeto.tipo_personal,
                    fechaInicio: objeto.fecha_inicio,
                    fechaFin: objeto.fecha_fin,
                    ingresoConcurso: objeto.ingreso_concurso,
                    area: { value: objeto.area.id, label: objeto.area.nombre },
                    subArea: objeto.sub_area !== null ? { label: objeto.sub_area.nombre, value: objeto.sub_area.id } : null,
                    remuneracionMensual: objeto.remuneracion_mensual,
                    remuneracionHora: objeto.remuneracion_hora ? objeto.remuneracion_hora : 0,
                    relacionIES: objeto.relacion_ies.id,
                    contratoRelacionado: objeto.contrato_relacionado,
                    escalafonNombramiento: { label: objeto.escalafon_nombramiento?.escalafon_nombramiento, value: objeto.escalafon_nombramiento?.id },
                    tipoContrato: objeto.tipo_contrato !== null ? { label: objeto.tipo_contrato.contrato, value: objeto.tipo_contrato.id } : null,
                    tipoNombramiento: objeto.tipo_nombramiento !== null ? { label: objeto.tipo_nombramiento.nombramiento, value: objeto.tipo_nombramiento.id } : null,
                    tiempoDedicacion: objeto.tiempo_dedicacion.id,
                    nivel: objeto.nivel.id,
                    categoriaContrato: { value: objeto.categoria_contrato.id, label: objeto.categoria_contrato.categoria_contrato }




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
                                    {errors.tipoPersonal && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione el tipo!</span>}

                                    <Controller
                                        name="tipoPersonal"
                                        rules={{ required: true }}
                                        defaultValue={objeto?.tipo_personal ? objeto.tipo_personal : ''}
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
                                                        setValue("tipoPersonal", ev.target.value)
                                                    }
                                                } >
                                                <FormControlLabel
                                                    key='type000'
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
                                                    key="type001"
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
                                        {errors.tipoDocumento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione el tipo de documento!</span>}
                                    </div>
                                    <Controller
                                        name="tipoDocumento"
                                        rules={{ required: true }}
                                        defaultValue={objeto?.tipo_documento.id ? objeto.tipo_documento : ''}
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
                                                        setValue("tipoDocumento", ev.target.value, { shouldValidate: true })
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
                                    {errors.motivoAccion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el motivo de la acción de personal!</span>}
                                    <Controller
                                        name="motivoAccion"
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
                                                            setValue('motivoAccion', ev)
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
                                        defaultValue={objeto?.tipo_contrato}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    {...field}
                                                    placeholder="Seleccione"
                                                    isClearable
                                                    options={
                                                        tiposContratosState.map(
                                                            con => ({ label: con.contrato, value: con.id, key: con.id })
                                                        )
                                                    }
                                                />
                                            )
                                        }
                                    />
                                </div>}
                                {
                                    (actReason === 'NOMBRAMIENTO' || relType === 'NOMBRAMIENTO') && <div className="column">
                                        <label className="label is-small">TIPO NOMBRAMIENTO
                                            <span className="has-text-success has-text-weight-bold" style={{ cursor: 'pointer' }} onClick={() => setShowModalTipoNombramiento(true)}><IoIosAdd /></span>
                                        </label>
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
                                                        options={
                                                            tiposNombramientosState.map(
                                                                (nom) => ({ label: nom.nombramiento, value: nom.id, key: nom.id })
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
                                    {errors.fechaInicio?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de inicio!</span>}
                                    {errors.fechaInicio?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de ingreso no puede ser mayor a la fecha actual!</span>}
                                    <input type="date" {...register("fechaInicio", { required: true })} className="input" onChange={
                                        ev => {
                                            let fecha = new Date(ev.target.value)
                                            clearErrors('fechaInicio')
                                            if (fecha > new Date()) {
                                                setError('fechaInicio', {
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
                                    {errors.fechaFin?.type === 'min' && <span className="has-text-danger is-size-7 has-background-danger-light"> {errors.fechaFin.message} </span>}
                                    <input type="date" {...register("fechaFin")} className="input" onChange={
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
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small">INGRESO POR CONCURSO</label>
                                        {errors.ingresoConcurso && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                    </div>
                                    <Controller
                                        name="ingresoConcurso"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.ingreso_concurso ? objeto.ingreso_concurso : ''}
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup aria-label="ingreso_concurso" row {...field} onChange={(ev) => {
                                                setValue('ingresoConcurso', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })

                                            }}>

                                                <FormControlLabel
                                                    key="in000"
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
                                                    key="in001"
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
                                    {errors.relacionIES && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si la relación!</span>}


                                    <Controller
                                        name="relacionIES"
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={objeto?.relacion_ies ? objeto.relacion_ies.id : ''}
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup aria-label="relacion_ies" row {...field} onChange={(ev) => {
                                                let relacion = relacionesIESState.find(r => r.id === ev.target.value)
                                                setRelType(relacion?.relacion)
                                                setValue('escalafonNombramiento', null)
                                                setValue('relacionIES', ev.target.value ? ev.target.value : null, { shouldValidate: true })

                                            }}>

                                                {relacionesIESState.map((rel) => (<FormControlLabel
                                                    key={rel.id}
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
                                    {errors.numeroDocumento && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Ingrese el número de documento!</span>}
                                    <div className="control">
                                        <input  {...register("numeroDocumento", { required: true })} className="input" defaultValue={
                                            objeto?.numero_documento
                                        } />


                                    </div>
                                </div>

                            </div>

                            {
                                tipoFuncionario === 'FUNCIONARIO' && <Funcionario register={register} errors={errors} objeto={objeto} control={control} setValue={setValue} />
                            }
                            {
                                tipoFuncionario === 'PROFESOR' && <Profesor register={register} errors={errors} objeto={objeto} relacion={relType} control={control} setValue={setValue} />
                            }
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">REMUNERACION MENSUAL</label>
                                    {errors.remuneracionMensual && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Seleccione si la remuneración mensual!</span>}
                                    <div className="control">
                                        <input type="number" defaultValue="0.00" min="0" {...register("remuneracionMensual", { required: true })} className="input" step="any" />


                                    </div>
                                </div>
                                <div className="column">

                                    <label className="label is-small">AREA</label>
                                    {errors.area && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Por favor seleccione el area institucional!</span>}



                                    <Controller
                                        name="area"
                                        control={control}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    menuPlacement='auto'
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

                                    <label className="label is-small">SUB AREA</label>

                                    <Controller
                                        name="subArea"
                                        control={control}
                                        render={
                                            ({ field }) => (
                                                <Select
                                                    menuPlacement='auto'
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
                showModalTipoNombramiento && <NombramientoModalFrom title="Registrar tipo nombramiento" handler={postNombramiento}>
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