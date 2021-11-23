import React, { Fragment, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loadPaises } from '../../store/core/paises';
import { loadDiscapacidades } from '../../store/core/discapacidades';
import { loadEtnias } from '../../store/core/etnias'
import { loadEstadosCiviles } from '../../store/core/estado_civil'
import { loadNacionalidades } from '../../store/core/nacionalidades'
import { loadCantonesProvincia, loadProvincias } from '../../store/core/provincias'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import Select from 'react-select'


let RegistrarPersona = ({ title, handler, children, person }) => {
    const { register, handleSubmit, reset, setError, clearErrors, getValues, setValue, control, formState: { errors } } = useForm();
    const [nacionalidades, setNacionalidades] = useState([])
    const [cantones, setCantones] = useState([])
    let hoy = new Date();
    const MIN_FECHA_NAC = new Date(hoy.setFullYear(hoy.getFullYear() - 18)).toISOString().slice(0, 10)
    const TIPO_LICENCIA = [
        'A', 'A1', 'B', 'C', 'C1', 'D', 'D1', 'E', 'E1', 'F', 'G'
    ]

    let dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(
                loadPaises()
            )
            dispatch(
                loadEstadosCiviles()
            )
            dispatch(
                loadEtnias()
            )
            dispatch(
                loadDiscapacidades()
            )
            dispatch(
                loadNacionalidades()
            )
            dispatch(loadProvincias())



        }, [dispatch]
    )

    useEffect(
        () => {
            if (person) {

                reset({
                    fecha_ingreso_ies: person.fecha_ingreso,
                    tipo_identificacion: person?.tipo_identificacion,
                    identificacion: person.identificacion,
                    primer_apellido: person.primer_apellido,
                    segundo_apellido: person.segundo_apellido,
                    primer_nombre: person.primer_nombre,
                    segundo_nombre: person.segundo_nombre,
                    sexo: person?.sexo,
                    estado_civil: person?.estado_civil.id,
                    fecha_nacimiento: person.fecha_nacimiento,
                    email_institucional: person.correo_institucional,
                    email_personal: person.correo_personal,
                    porcentaje_discapacidad: person.porcentaje_discapacidad,
                    numero_conadis: person.carnet_conadis,
                    telefono_movil: person.telefono_movil,
                    telefono_domicilio: person.telefono_domicilio,
                    tipo_sangre: person.tipo_sangre,
                    licencia_conduccion: person.licencia_conduccion,
                    parroquia: person.direccion_domicilio.parroquia,
                    calle1: person.direccion_domicilio.calle1,
                    calle2: person.direccion_domicilio.calle2,
                    referencia: person.direccion_domicilio.referencia,
                    etnia: { label: person?.etnia.etnia, value: person?.etnia.id },
                    discapacidad: { label: person?.discapacidad.discapacidad, value: person?.discapacidad.id },
                    pais_origen: { label: person.pais_origen.pais, value: person.pais_origen.id },
                    id_provincia: { label: person.direccion_domicilio.provincia.provincia, value: person.direccion_domicilio.provincia.id },
                    id_canton: { label: person.direccion_domicilio.canton.canton, value: person.direccion_domicilio.canton.id },
                    nacionalidad: { label: person.nacionalidad.nacionalidad, value: person.nacionalidad.id },
                    apellidosContacto: person.contacto_emergencia?.apellidos,
                    nombresContacto: person.contacto_emergencia?.nombres,
                    telefonoContacto: person.contacto_emergencia?.telefono_domicilio,
                    movilContacto: person.contacto_emergencia?.telefono_movil,
                    direccionContacto: person.contacto_emergencia?.direccion,
                    institucion: person.informacion_bancaria?.institucion_financiera,
                    tipoCuenta:person.informacion_bancaria?.tipo_cuenta,
                    numeroCuenta: person.informacion_bancaria?.numero_cuenta






                })


            } else {
                reset({
                    porcentaje_discapacidad: 0
                })
            }

        }, [person, reset]
    )
    let paisesState = useSelector(
        state => state.paises.data.paises
    )

    let discapacidadesState = useSelector(
        state => state.discapacidades.data.discapacidades
    )

    let etinasState = useSelector(state => state.etnias.data.etnias)

    let estadosCivilesState = useSelector(state => state.estadosCiviles.data.estadosCiviles)

    let nacionalidadesState = useSelector(
        state => state.nacionalidades.data.nacionalidades
    )

    let provinciasState = useSelector(
        state => state.provincias.data.provincias
    )


    const onChangeEtinia = (name) => {
        console.log(name, name === 'INDIGENA');
        setNacionalidades([])
        filtrarNacionalidades(name === 'INDIGENA')

    }


    let filtrarNacionalidades = (esIndigena) => {

        let filtrados = []

        if (esIndigena) {
            nacionalidadesState.forEach(
                (nacionalidad) => {
                    if (nacionalidad.nacionalidad !== 'NO APLICA') {
                        filtrados.push(nacionalidad)
                    }
                }
            )

        }
        else {
            nacionalidadesState.forEach(
                (nacionalidad) => {
                    if (nacionalidad.nacionalidad === 'NO APLICA') {
                        filtrados.push(nacionalidad)
                    }
                }
            )
        }



        setNacionalidades(filtrados)
    }

    let cargarCantones = (provincia) => {
        if (provincia !== null) {
            dispatch(
                loadCantonesProvincia(provincia)

            ).unwrap()
                .then(
                    resp => setCantones(resp)
                )
        }
    }
    // useEffect(() => {
    //     person && paisesState && setPaises([person.pais_origen])
    //     person && provinciasState && setProvincias([person.direccion_domicilio.provincia])
    //     person && cantones && setCantones([person.direccion_domicilio.canton])
    //     person && nacionalidadesState && setNacionalidades([person.nacionalidad])
    // }


    //     , [])
    return (

        <div className="modal is-active">
            <div className="modal-background"></div>

            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic" >{title} {person && `${person.primer_nombre} ${person.segundo_nombre} ${person.primer_apellido} ${person.segundo_apellido}`}</span>

                </header>
                <div className="modal-card-body">
                    <form className="mt-2 px-2" onSubmit={handleSubmit(handler)}>

                        {/*datos personales*/}
                        <fieldset style={{ border: '1px solid ', padding: '10px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">DATOS PERSONALES</legend>



                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">TIPO IDENTIFICACION</label>
                                    {errors.tipo_identificacion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, seleccione el tipo de identificación!</span>}
                                    <Controller
                                        control={control}
                                        name="tipo_identificacion"
                                        rules={{ required: true }}
                                        defaultValue={person?.tipo_identificacion}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup
                                                    row
                                                    aria-label="tipo_identificacion"
                                                    {...field}
                                                    onChange={(ev) => {
                                                        setValue('tipo_identificacion', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })
                                                    }}
                                                >
                                                    <FormControlLabel value="CEDULA" label="CEDULA" control={<Radio size="small" key="dff5000" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                    <FormControlLabel value="PASAPORTE" label="PASAPORTE" control={<Radio size="small" key="hro6567" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                </RadioGroup>
                                            )
                                        }
                                    />


                                </div>
                                <div className="column">
                                    <label className="label is-small">NO. IDENTIFICACION</label>
                                    {errors.identificacion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la identificación!</span>}
                                    {errors.identificacion?.type === 'maxLength' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Máximo 10 caracteres!</span>}
                                    <div className="control">
                                        <input type="text" {...register("identificacion", { required: true, maxLength: 10 })}
                                            className="input"
                                            readOnly={person !== null ? true : false}
                                        />


                                    </div>

                                </div>


                                <div className="column">
                                    <label className="label is-small">PRIMER APELLIDO</label>
                                    {errors.primer_apellido && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el primer apellido!</span>}
                                    <div className="control">
                                        <input type="text" {...register("primer_apellido", { required: true })} className="input is-uppercase" />

                                    </div>

                                </div>

                                <div className="column">
                                    <label className="label is-small">SEGUNDO APELLIDO</label>
                                    {errors.segundo_apellido && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese segundo apellido!</span>}
                                    <div className="control">
                                        <input type="text" {...register("segundo_apellido", { required: true })} className="input is-uppercase" />


                                    </div>
                                </div>

                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">PRIMER NOMBRE</label>
                                    {errors.primer_nombre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el primer nombre!</span>}
                                    <div className="control">
                                        <input type="text" {...register("primer_nombre", { required: true })} className="input is-uppercase" />


                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">SEGUNDO NOMBRE</label>
                                    {errors.segundo_nombre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el segundo nombre!</span>}
                                    <div className="control">
                                        <input type="text" {...register("segundo_nombre", { required: true })} className="input is-uppercase" />


                                    </div>

                                </div>



                                <div className="column">
                                    <label className="label is-small">SEXO</label>
                                    {errors.sexo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, seleccione el sexo!</span>}
                                    <Controller
                                        control={control}
                                        name="sexo"
                                        defaultValue={person?.sexo}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup
                                                    row
                                                    aria-label="sexo"
                                                    {...field}
                                                    onChange={(ev) => {
                                                        setValue('sexo', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })
                                                    }}
                                                >
                                                    <FormControlLabel value="HOMBRE" label="HOMBRE" control={<Radio size="small" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                    <FormControlLabel value="MUJER" label="MUJER" control={<Radio size="small" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                </RadioGroup>
                                            )
                                        }
                                    />

                                </div>
                                <div className="column">
                                    <label className="label is-small">FECHA NACIMIENTO</label>
                                    {errors.fecha_nacimiento?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de nacimiento!</span>}
                                    {errors.fecha_nacimiento?.type === "max" && <span className="has-text-danger is-size-7 has-background-danger-light">¡La persona debe tener mínimo 18 años!</span>}
                                    <div className="control">
                                        <input type="date" {...register("fecha_nacimiento", {
                                            required: true,

                                        })} className="input is-uppercase"

                                            onChange={
                                                ev => {
                                                    clearErrors('fecha_nacimiento')
                                                    if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) > new Date(MIN_FECHA_NAC)) {
                                                        setError("fecha_nacimiento", {
                                                            type: 'max'

                                                        })
                                                    }
                                                }} />


                                    </div>

                                </div>

                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">ESTADO CIVIL</label>
                                    {errors.estado_civil && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el estado civil!</span>}
                                    <Controller
                                        control={control}
                                        rules={{ required: true }}
                                        defaultValue={person?.estado_civil ? person?.estado_civil.id : ''}
                                        name="estado_civil"
                                        render={
                                            ({ field }) =>
                                            (<RadioGroup aria-label="estado_civil" {...field} onChange={(ev) => {
                                                setValue('estado_civil', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })

                                            }}>

                                                {estadosCivilesState.map((estado) => (<FormControlLabel
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                    value={estado.id}
                                                    control={<Radio size="small" />}
                                                    label={estado.estado_civil}
                                                />))}



                                            </RadioGroup>)}
                                    />
                                </div>


                                <div className="column">

                                    <label className="label is-small">PAIS ORIGEN</label>
                                    {errors.pais_origen && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el país de origen!</span>}

                                    <Controller
                                        name="pais_origen"
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
                                                    setValue('pais_origen', ev, { shouldValidate: true })

                                                }}


                                            />
                                        )}
                                    />
                                </div>



                                <div className="column">
                                    <label className="label is-small">DISCAPACIDAD</label>
                                    {errors.discapacidad && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione una discapacidad!</span>}
                                    <Controller
                                        name="discapacidad"
                                        control={control}

                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select


                                                placeholder="Seleccione"
                                                isClearable


                                                {...field}


                                                options={
                                                    discapacidadesState.map(
                                                        (d) => ({ value: d.id, label: d.discapacidad, key: d.id }))
                                                }

                                                onChange={(ev) => {
                                                    setValue('discapacidad', ev, { shouldValidate: true })

                                                }}


                                            />
                                        )}
                                    />


                                </div>
                                <div className="column">
                                    <label className="label is-small">NUMERO CONADIS</label>
                                    {errors.numero_conadis && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el numero de carnet del CONADIS!</span>}
                                    <div className="control">
                                        <input type="text" {...register("numero_conadis")} className="input is-uppercase" />

                                    </div>

                                </div>

                            </div>

                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">PORCENTAJE DISCAPACIDAD</label>
                                    {errors.porcentaje_discapacidad && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el porcentaje de discapacidad!</span>}
                                    <div className="control">
                                        <input type="number" min="0" {...register("porcentaje_discapacidad", { required: true, max: 100 })} className="input" />


                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">ETNIA</label>
                                    {errors.etnia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la autoidentificación étnica!</span>}


                                    <Controller
                                        name="etnia"
                                        control={control}

                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select


                                                placeholder="Seleccione"
                                                isClearable


                                                {...field}


                                                options={
                                                    etinasState.map(
                                                        (d) => ({ value: d.id, label: d.etnia, key: d.id }))
                                                }

                                                onChange={(ev) => {
                                                    onChangeEtinia(ev?.label)
                                                    setValue('etnia', ev, { shouldValidate: true })

                                                }}


                                            />
                                        )}
                                    />

                                </div>

                                <div className="column">

                                    <label className="label is-small is-uppercase">Nacionalidad</label>



                                    {errors.nacionalidad && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la nacionalidad </span>}


                                    <Controller
                                        name="nacionalidad"
                                        control={control}

                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select


                                                placeholder="Seleccione"
                                                isClearable


                                                {...field}


                                                options={
                                                    nacionalidades.map(
                                                        (d) => ({ value: d.id, label: d.nacionalidad, key: d.id }))
                                                }

                                                onChange={(ev) => {
                                                    setValue('nacionalidad', ev, { shouldValidate: true })

                                                }}


                                            />
                                        )}
                                    />

                                </div>


                                <div className="column">
                                    <label className="label is-small">TIPO DE SANGRE</label>
                                    {errors.tipo_sangre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el tipo de sangre!</span>}
                                    <div className="control">
                                        <input type="text" {...register("tipo_sangre", { required: true })} className="input is-uppercase" />

                                    </div>
                                </div>


                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">LINCENCIA DE CONDUCCION</label>
                                    {errors.licencia_conduccion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Escoga una opción!</span>}

                                    <Controller
                                        control={control}
                                        name="licencia_conduccion"
                                        defaultValue={person?.licencia_conduccion ? person.licencia_conduccion : ''}
                                        rules={{ required: true }}
                                        render={
                                            ({ field }) => (
                                                <RadioGroup
                                                    row
                                                    aria-label="licencia_conduccion"
                                                    {...field}
                                                    onChange={(ev) => {
                                                        setValue('licencia_conduccion', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })
                                                    }}
                                                >
                                                    <FormControlLabel value="SI" label="SI" control={<Radio size="small" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                    <FormControlLabel value="NO" label="NO" control={<Radio size="small" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                </RadioGroup>
                                            )
                                        }
                                    />
                                </div>
                                {getValues('licencia_conduccion') === 'SI' && <div className="column">
                                    <label className="label is-small">Tipo licencia</label>
                                    {errors.tipo_licencia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Escoga el tipo de licencia!</span>}

                                    <Controller
                                        name="tipo_licencia"
                                        control={control}
                                        defaultValue={person?.tipo_licencia ? person.tipo_licencia : ''}
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <RadioGroup
                                                row
                                                aria-label="tipo_licencia"
                                                {...field}
                                                onChange={(ev) => {
                                                    setValue('tipo_licencia', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })
                                                }}
                                            >
                                                {TIPO_LICENCIA.map((t) => (<FormControlLabel value={t} label={t} control={<Radio size="small" />} sx={{
                                                    '& .MuiFormControlLabel-label': {
                                                        fontSize: 14,
                                                        fontWeight: 500
                                                    },
                                                }} />))}

                                            </RadioGroup>
                                        )
                                        }
                                    />

                                </div>}
                            </div>
                        </fieldset>

                        {/*direccion*/}
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">DIRECCION DOMICILIARIA</legend>
                            <div className="columns">
                                <div className="column">


                                    <label className="label is-small">
                                        PROVINCIA
                                    </label>



                                    {errors.id_provincia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione una provincia!</span>}

                                    <Controller
                                        name="id_provincia"
                                        control={control}

                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select


                                                placeholder="Seleccione"
                                                isClearable


                                                {...field}


                                                options={
                                                    provinciasState.map(
                                                        (p) => ({ value: p.id, label: p.provincia, key: p.id }))
                                                }

                                                onChange={(ev) => {
                                                    cargarCantones(ev?.value)
                                                    setValue('id_provincia', ev, { shouldValidate: true })
                                                    setValue('id_canton', { label: '', value: '' }, { shouldValidate: true })

                                                }}


                                            />
                                        )}
                                    />



                                </div>

                                <div className="column">
                                    <label className="label is-small">
                                        CANTON
                                    </label>
                                    {errors.id_canton && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione un cantón!</span>}
                                    <Controller
                                        name="id_canton"
                                        control={control}

                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Select


                                                placeholder="Seleccione"
                                                isClearable


                                                {...field}


                                                options={
                                                    cantones.map(
                                                        (p) => ({ value: p.id, label: p.canton, key: p.id }))
                                                }

                                                onChange={(ev) => {

                                                    setValue('id_canton', ev, { shouldValidate: true })

                                                }}


                                            />
                                        )}
                                    />




                                </div>
                                <div className="column">
                                    <label className="label is-small">PARROQUIA</label>
                                    {errors.parroquia && <span className="has-text-danger is-size-7 has-background-danger-light"> ¡Por favor, ingrese la parroquia!</span>}
                                    <div className="control">
                                        <input type="text"  {...register("parroquia", { required: true })} className="input is-uppercase" />
                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">CALLE 1</label>
                                    {errors.calle1 && <span className="has-text-danger is-size-7 has-background-danger-light"> ¡Por favor, ingrese la calle principal!</span>}
                                    <div className="control">
                                        <input type="text"  {...register("calle1", { required: true })} className="input is-uppercase" />
                                    </div>

                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">CALLE 2</label>
                                    <div className="control">
                                        <input type="text"  {...register("calle2",)} className="input is-uppercase" />
                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">REFERENCIA</label>
                                    <div className="control">
                                        <input type="text"  {...register("referencia")} className="input is-uppercase" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        {/*contactos*/}
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">CONTACTOS</legend>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">TELEFONO MOVIL</label>
                                    {errors.telefono_movil && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el teléfono movil!</span>}
                                    <div className="control">
                                        <input type="tel" {...register("telefono_movil", { required: true })} className="input" />

                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">TELEFONO DOMICILIO</label>
                                    <div className="control">
                                        <input type="tel" {...register("telefono_domicilio")} className="input" />

                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">EMAIL PERSONAL</label>
                                    {errors.email_personal && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el email personal!</span>}
                                    <div className="control">
                                        <input type="email" {...register("email_personal", { required: true })} className="input" placeholder="example@email.com" />

                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">EMAIL INSTITUCIONAL</label>
                                    {errors.email_institucional && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el email institucional!</span>}
                                    <div className="control">
                                        <input type="email" {...register("email_institucional", { required: true })} className="input" placeholder="example@unesum.edu.ec" />

                                    </div>
                                </div>
                            </div>

                        </fieldset>

                         {/*contacto emergencia*/}
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">CONTACTO DE EMERGENCIA</legend>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">APELLIDOS</label>
                                    {errors.apellidosContacto && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los apellidos!</span>}

                                    <input type="text" {...register("apellidosContacto", { required: true })} className="input is-uppercase" />
                                </div>
                                <div className="column">
                                    <label className="label is-small">NOMBRES</label>
                                    {errors.nombresContacto && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese los nombres!</span>}

                                    <input type="text" {...register("nombresContacto", { required: true })} className="input is-uppercase" />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">DIRECCION</label>
                                    {errors.direccionContacto && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la direccion!</span>}

                                    <input type="text" {...register("direccionContacto", { required: true })} className="input is-uppercase" />
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">TELEFONO DOMICILIO</label>


                                    <input type="text" {...register("telefonoContacto")} className="input" />
                                </div>
                                <div className="column">
                                    <label className="label is-small">TELEFONO MOVIL</label>
                                    {errors.movilContacto && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese teléfono movil!</span>}

                                    <input type="text" {...register("movilContacto", { required: true })} className="input" />
                                </div>
                            </div>
                        </fieldset>

                        {/*informacion bancaria*/}
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">INFORMACION BANCARIA</legend>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">INSTITUCION FINANCIERA</label>
                                    {errors.institucion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la institución financiera!</span>}
                                    <input type="text" {...register('institucion', { required: true })} className="input is-uppercase" />
                                </div>

                           
                                <div className="column">
                                    <label className="label is-small">TIPO CUENTA</label>
                                    {errors.institucion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Escoja el tipo de cuenta!</span>}
                                    <Controller
                                        control={control}
                                        name="tipoCuenta"
                                        render={
                                            ({ ...field }) => (
                                                <RadioGroup
                                                    aria-label="tipoCuenta"
                                                    row
                                                    defaultValue={ person?.informacion_bancaria ? person.informacion_bancaria.tipo_cuenta: '' }
                                                    {...field}
                                                    onChange={
                                                        (ev) => setValue('tipoCuenta', ev.currentTarget.value ? ev.currentTarget.value : null, { shouldValidate: true })
                                                    }>
                                                    <FormControlLabel value="AHORRO" label="AHORRO" control={<Radio size="small" key="IU8dff5000" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                    <FormControlLabel value="CORRIENTE" label="CORRIENTE" control={<Radio size="small" key="RDRhro6567" />} sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }} />
                                                </RadioGroup>

                                            )
                                        }
                                    />

                                </div>
                                <div className="column">
                                    <label className="label is-small"> NO. CUENTA</label>
                                    {errors.institucion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el número de cuenta!</span>}
                                    <input type="text" className="input"  {...register("numeroCuenta")}/>
                                </div>
                            </div>


                        </fieldset>
                         {/*informacion bancaria*/}
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">INGRESO A LA INSTITUCION</legend>



                            <div className="columns">
                                <div className="column is-3">
                                    <label className="label is-small">FECHA INGRESO IES</label>
                                    {errors.fecha_ingreso_ies?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de ingreso a la institución!</span>}
                                    {errors.fecha_ingreso_ies?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de ingreso no puede ser mayor a la fecha actual!</span>}

                                    <div className="control">
                                        <input type="date" {...register("fecha_ingreso_ies", { required: true })} className="input is-uppercase"
                                            onChange={
                                                ev => {
                                                    clearErrors('fecha_ingreso_ies')
                                                    if ((ev.target.value !== null || ev.target.value !== '') && new Date(ev.target.value) > new Date()) {
                                                        setError("fecha_ingreso_ies", {
                                                            type: 'max'

                                                        })
                                                    }
                                                }}

                                        />


                                    </div>
                                </div>
                            </div>

                        </fieldset>
                        <div className="field is-grouped mt-2" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="control has-text-centered">
                                <Fragment>
                                    {children}
                                </Fragment>

                                <button type="submit" className="button is-success is-small mx-3">Guardar</button>

                            </div>
                        </div>
                    </form>


                </div>

            </div>
        </div >

    )
}

export default RegistrarPersona