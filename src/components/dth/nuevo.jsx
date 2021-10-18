import React, { Fragment, useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loadPaises } from '../../store/core/paises';
import { loadDiscapacidades } from '../../store/core/discapacidades';
import { loadEtnias } from '../../store/core/etnias'
import { loadEstadosCiviles } from '../../store/core/estado_civil'
import { loadNacionalidades } from '../../store/core/nacionalidades'
import { loadCantonesProvincia, loadProvincias } from '../../store/core/provincias'


let RegistrarPersona = ({ title, handler, children, person }) => {
    const { register, handleSubmit, reset, setError, clearErrors, getValues, formState: { errors } } = useForm();
    const [paises, setPaises] = useState([])
    const [nacionalidades, setNacionalidades] = useState([])
    const [provincias, setProvincias] = useState([])
    const [cantones, setCantones] = useState([])
    const [ind, setInd] = useState(false);
    let hoy = new Date();
    const MIN_FECHA_NAC = new Date(hoy.setFullYear(hoy.getFullYear() - 18)).toISOString().slice(0, 10)

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
            if (person !== null) {

                reset({
                    fecha_ingreso_ies: person.fecha_ingreso,
                    tipo_identificacion: person.tipo_identificacion,
                    identificacion: person.identificacion,
                    primer_apellido: person.primer_apellido,
                    segundo_apellido: person.segundo_apellido,
                    primer_nombre: person.primer_nombre,
                    segundo_nombre: person.segundo_nombre,
                    sexo: person.sexo,
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

    const onChangeEtinia = (name) => {
        setNacionalidades([])

        if (name === 'INDIGENA') {
            setInd(true)
        } else if (name !== null) {
            setInd(false)
            filtrarNacionalidades()
        }


    }

    let filtrarNacionalidades = (ev) => {

        let filtrados = []

        if (ind && ev) {
            nacionalidadesState.forEach(
                (nacionalidad) => {
                    if (nacionalidad.nacionalidad.startsWith(ev.toUpperCase()) && nacionalidad.nacionalidad !== 'NO APLICA') {
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

    let filtrarProvincias = (ev) => {
        let filtrados = []

        provinciasState.forEach(
            (provincia) => {
                if (provincia.provincia.startsWith(ev.toUpperCase())) {
                    filtrados.push(provincia)
                }
            }
        )
        setProvincias(filtrados)
    }


    let cargarCantones = (provincia) => {
        console.log(provincia)
        if (provincia !== null) {
            dispatch(
                loadCantonesProvincia(provincia)

            ).unwrap()
                .then(
                    resp => setCantones(resp)
                )
        }
    }
    useEffect(() => {
        person && paisesState && setPaises([person.pais_origen])
        person && provinciasState && setProvincias([person.direccion_domicilio.provincia])
        person && cantones && setCantones([person.direccion_domicilio.canton])
        person && nacionalidadesState && setNacionalidades([person.nacionalidad])
    }


        , [])

    return (

        <div className="modal is-active">
            <div className="modal-background"></div>

            <div className="modal-card" style={{ width: '80%' }}>
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic" >{title} {person && `${person.primer_nombre} ${person.primer_apellido} ${person.segundo_apellido}`}</span>

                </header>
                <div className="modal-card-body">
                    <form className="mt-2 px-2" onSubmit={handleSubmit(handler)}>


                        <fieldset style={{ border: '1px solid ', padding: '10px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">DATOS PERSONALES</legend>



                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">TIPO IDENTIFICACION</label>
                                    {errors.tipo_identificacion && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, Ingrese el tipo de identificación</span>}
                                    <div className="select">
                                        <select  {...register("tipo_identificacion", { required: true })} className="input is-small">
                                            <option></option>
                                            <option>CEDULA</option>
                                            <option>PASAPORTE</option>
                                        </select>

                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">NO. IDENTIFICACION</label>
                                    {errors.identificacion?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la identificación</span>}
                                    {errors.identificacion?.type === 'maxLength' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Máximo 10 caracteres¡</span>}
                                    <div className="control">
                                        <input type="text" {...register("identificacion", { required: true, maxLength: 10 })}
                                            className="input is-small"
                                            readOnly={person !== null ? true : false}
                                        />


                                    </div>

                                </div>


                                <div className="column">
                                    <label className="label is-small">PRIMER APELLIDO</label>
                                    {errors.primer_apellido && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el primer apellido</span>}
                                    <div className="control">
                                        <input type="text" {...register("primer_apellido", { required: true })} className="input is-small is-uppercase" />

                                    </div>

                                </div>

                                <div className="column">
                                    <label className="label is-small">SEGUNDO APELLIDO</label>
                                    {errors.segundo_apellido && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese segundo apellido</span>}
                                    <div className="control">
                                        <input type="text" {...register("segundo_apellido", { required: true })} className="input is-small is-uppercase" />


                                    </div>
                                </div>

                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">PRIMER NOMBRE</label>
                                    {errors.primer_nombre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el primer nombre </span>}
                                    <div className="control">
                                        <input type="text" {...register("primer_nombre", { required: true })} className="input is-small is-uppercase" />


                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">SEGUNDO NOMBRE</label>
                                    {errors.segundo_nombre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el segundo nombre</span>}
                                    <div className="control">
                                        <input type="text" {...register("segundo_nombre", { required: true })} className="input is-small is-uppercase" />


                                    </div>

                                </div>



                                <div className="column">
                                    <label className="label is-small">SEXO</label>
                                    {errors.sexo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el sexo</span>}
                                    <div className="select">
                                        <select  {...register("sexo", { required: true })} className="input is-small is-uppercase">
                                            <option></option>
                                            <option>HOMBRE</option>
                                            <option>MUJER</option>
                                        </select>

                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">FECHA NACIMIENTO</label>
                                    {errors.fecha_nacimiento?.type === "required" && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de nacimiento</span>}
                                    {errors.fecha_nacimiento?.type === "max" && <span className="has-text-danger is-size-7 has-background-danger-light">¡La persona debe tener mínimo 18 años!</span>}
                                    <div className="control">
                                        <input type="date" {...register("fecha_nacimiento", {
                                            required: true,

                                        })} className="input is-small is-uppercase"

                                            onChange={
                                                ev => {
                                                    console.log(new Date(ev.target.value) > new Date(MIN_FECHA_NAC), new Date(ev.target.value),new Date(MIN_FECHA_NAC))
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
                                    {errors.estado_civil && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el estado civil</span>}
                                    <div className="select">
                                        <select  {...register("estado_civil", { required: true })} className="input is-small">
                                            <option></option>
                                            {
                                                estadosCivilesState.map(
                                                    (row) => (
                                                        <option value={row.id} key={row.id}>{row.estado_civil}</option>)

                                                )
                                            }
                                        </select>

                                    </div>
                                </div>


                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small">PAIS ORIGEN</label>
                                        {errors.pais_origen && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el país de origen</span>}
                                        <input onChange={ev => filtrarPaises(ev.target.value)} className="input is-small" />
                                    </div>
                                    <div className="select">

                                        <select  {...register("pais_origen", { required: true })} className="input is-small">
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



                                <div className="column">
                                    <label className="label is-small">DISCAPACIDAD</label>
                                    {errors.discapacidad && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione una discapacidad</span>}
                                    <div className="select">
                                        <select {...register("discapacidad", { required: true })} className="input is-small" defaultValue={person && person.discapacidad.id}>
                                            <option></option>
                                            {
                                                discapacidadesState && discapacidadesState.map(
                                                    (d) => (
                                                        <option value={d.id} key={d.id}>{d.discapacidad}</option>
                                                    )
                                                )
                                            }
                                        </select>


                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">NUMERO CONADIS</label>
                                    {errors.numero_conadis && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el numero de carnet del CONADIS</span>}
                                    <div className="control">
                                        <input type="text" {...register("numero_conadis")} className="input is-small is-uppercase" />

                                    </div>

                                </div>

                            </div>

                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">PORCENTAJE DISCAPACIDAD</label>
                                    {errors.porcentaje_discapacidad && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el porcentaje de discapacidad</span>}
                                    <div className="control">
                                        <input type="number" min="0" {...register("porcentaje_discapacidad", { required: true, max: 100 })} className="input is-small" />


                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">ETNIA</label>
                                    {errors.etnia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la autoidentificación étnica</span>}
                                    <div className="select">
                                        <select  {...register("etnia", { required: true })} className="input is-small" onChange={ev => onChangeEtinia(ev.target.options[ev.target.selectedIndex].text)}>
                                            <option> </option>
                                            {
                                                etinasState && etinasState.map(
                                                    (row) => (
                                                        <option value={row.id} key={row.id}>{row.etnia}</option>
                                                    )
                                                )
                                            }
                                        </select>

                                    </div>

                                </div>

                                <div className="column">
                                    <div className="control">
                                        <label className="label is-small is-uppercase">Nacionalidad</label>
                                        <input type="text" onChange={ev => filtrarNacionalidades(ev.target.value)} className="input is-small" />

                                    </div>
                                    {errors.nacionalidad && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la nacionalidad </span>}
                                    <div className="select">
                                        <select  {...register("nacionalidad", { required: true })} className="input is-small">
                                            <option></option>
                                            {nacionalidades && nacionalidades.map(
                                                (row) => (
                                                    <option value={row.id} key={row.nacionalidad}>{row.nacionalidad}</option>
                                                )
                                            )}
                                        </select>

                                    </div>

                                </div>


                                <div className="column">
                                    <label className="label is-small">TIPO DE SANGRE</label>
                                    {errors.tipo_sangre && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el tipo de sangre</span>}
                                    <div className="control">
                                        <input type="text" {...register("tipo_sangre", { required: true })} className="input is-small is-uppercase" />

                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">LINCENCIA DE CONDUCCION</label>
                                    <div className="control">
                                        <input type="text" {...register("licencia_conduccion")} className="input is-small is-uppercase" />

                                    </div>
                                </div>

                            </div>
                        </fieldset>
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">DIRECCION DOMICILIARIA</legend>
                            <div className="columns">
                                <div className="column">

                                    <div className="control">
                                        <label className="label is-small">
                                            PROVINCIA
                                        </label>
                                        <input type="text" className="input is-small" onChange={ev => filtrarProvincias(ev.target.value)} />

                                    </div>
                                    {errors.id_provincia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Selecione una provincia!</span>}
                                    <div className="select">
                                        <select {...register("id_provincia", { required: true })} className="input is-small" onChange={ev => cargarCantones(ev.target.value)}>
                                            <option></option>
                                            {
                                                provincias && provincias.map(
                                                    (row) => (
                                                        <option value={row.id} key={row.id}>{row.provincia}</option>
                                                    )
                                                )
                                            }
                                        </select>

                                    </div>

                                </div>

                                <div className="column">
                                    <label className="label is-small">
                                        CANTON
                                    </label>
                                    {errors.id_provincia && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione un cantón!</span>}
                                    <div className="select">
                                        <select {...register("id_canton", { required: true })} className="input is-small">

                                            {
                                                cantones && cantones.map(
                                                    (row) => (
                                                        <option value={row.id} key={row.id}> {row.canton} </option>
                                                    )
                                                )
                                            }
                                        </select>

                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">PARROQUIA</label>
                                    {errors.parroquia && <span className="has-text-danger is-size-7 has-background-danger-light"> ¡Por favor, ingrese la parroquia!</span>}
                                    <div className="control">
                                        <input type="text"  {...register("parroquia", { required: true })} className="input is-small is-uppercase" />
                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">CALLE 1</label>
                                    {errors.calle1 && <span className="has-text-danger is-size-7 has-background-danger-light"> ¡Por favor, ingrese la calle principal!</span>}
                                    <div className="control">
                                        <input type="text"  {...register("calle1", { required: true })} className="input is-small is-uppercase" />
                                    </div>

                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">CALLE 2</label>
                                    <div className="control">
                                        <input type="text"  {...register("calle2",)} className="input is-small is-uppercase" />
                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">REFERENCIA</label>
                                    <div className="control">
                                        <input type="text"  {...register("referencia")} className="input is-small is-uppercase" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">CONTACTOS</legend>
                            <div className="columns">
                                <div className="column">
                                    <label className="label is-small">TELEFONO MOVIL</label>
                                    {errors.telefono_movil && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el teléfono movil</span>}
                                    <div className="control">
                                        <input type="tel" {...register("telefono_movil", { required: true })} className="input is-small" />

                                    </div>

                                </div>
                                <div className="column">
                                    <label className="label is-small">TELEFONO DOMICILIO</label>
                                    <div className="control">
                                        <input type="tel" {...register("telefono_domicilio")} className="input is-small" />

                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">EMAIL PERSONAL</label>
                                    {errors.email_personal && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el email personal</span>}
                                    <div className="control">
                                        <input type="email" {...register("email_personal", { required: true })} className="input is-small" placeholder="example@email.com" />

                                    </div>
                                </div>
                                <div className="column">
                                    <label className="label is-small">EMAIL INSTITUCIONAL</label>
                                    {errors.email_institucional && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el email institucional</span>}
                                    <div className="control">
                                        <input type="email" {...register("email_institucional", { required: true })} className="input is-small" placeholder="example@unesum.edu.ec" />

                                    </div>
                                </div>
                            </div>

                        </fieldset>
                        <fieldset style={{ border: '1px solid ', padding: '10px', marginTop: '20px' }}>
                            <legend className="has-text-weight-bold is-size-6 has-text-grey-dark">INGRESO A LA INSTITUCION</legend>



                            <div className="columns">
                                <div className="column is-3">
                                    <label className="label is-small">FECHA INGRESO IES</label>
                                    {errors.fecha_ingreso_ies?.type === 'required' && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese la fecha de ingreso a la institución!</span>}
                                    {errors.fecha_ingreso_ies?.type === 'max' && <span className="has-text-danger is-size-7 has-background-danger-light">¡La fecha de ingreso no puede ser mayor a la fecha actual!</span>}

                                    <div className="control">
                                        <input type="date" {...register("fecha_ingreso_ies", { required: true })} className="input is-small is-uppercase"
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