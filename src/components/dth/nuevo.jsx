import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loadPaises } from '../../store/core/paises';
import { loadDiscapacidades } from '../../store/core/discapacidades';
import { loadEtnias } from '../../store/core/etnias'
import  { loadEstadosCiviles } from '../../store/core/estado_civil'
import { loadNacionalidades } from '../../store/core/nacionalidades'
import { loadCantonesProvincia, loadProvincias } from '../../store/core/provincias'

let RegistrarPersona = ({ title, handler, children, person }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [paises, setPaises] = useState([])
    const [nacionalidades, setNacionalidades] = useState([])
    const [provincias, setProvincias] = useState([])
    const [cantones, setCantones] = useState([])

    // const navigate = useNavigate();
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
                    email_institucional: '@unesum.edu.ec',
                    porcentaje_discapacidad: 0
                })
            }

        }, [person]
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

    let filtrarNacionalidades = (ev) => {
        let filtrados = []

        nacionalidadesState.forEach(
            (nacionalidad) => {
                if (nacionalidad.nacionalidad.startsWith(ev.toUpperCase())) {
                    filtrados.push(nacionalidad)
                }
            }
        )
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
        <div className="modal-card">
            <header className="modal-card-head">
                <span className="modal-card-title">{title}</span>

            </header>
            <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>
                <form className="mt-4 px-2" onSubmit={handleSubmit(handler)}>
                    <div className="field is-grouped">

                        <div className="control">
                            <label className="label is-small">FECHA INGRESO IES</label>
                            <div className="control">
                                <input type="date" {...register("fecha_ingreso_ies", { required: true })} className="input is-small is-uppercase" />


                            </div>
                            {errors.fecha_ingreso_ies && <span className="has-text-danger is-size-7">¡Por favor, Ingrese la fecha de ingreso a la institución!</span>}
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">TIPO IDENTIFICACION</label>
                            <div className="select">
                                <select  {...register("tipo_identificacion", { required: true })} className="input is-small">
                                    <option>Seleccionar</option>
                                    <option>CEDULA</option>
                                    <option>PASAPORTE</option>
                                </select>

                            </div>
                            {errors.tipo_identificacion && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el tipo de identificación</span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">IDENTIFICACION</label>
                            <div className="control">
                                <input type="text" {...register("identificacion", { required: true })} className="input is-small" />


                            </div>
                            {errors.identificacion && <span className="has-text-danger is-size-7">¡Por favor, Ingrese la identificación</span>}
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">PRIMER APELLIDO</label>
                            <div className="control">
                                <input type="text" {...register("primer_apellido", { required: true })} className="input is-small is-uppercase" />

                            </div>
                            {errors.primer_apellido && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el primer apellido</span>}
                        </div>

                        <div className="control">
                            <label className="label is-small">SEGUNDO APELLIDO</label>
                            <div className="control">
                                <input type="text" {...register("segundo_apellido", { required: true })} className="input is-small is-uppercase" />

                                {errors.segundo_apellido && <span className="has-text-danger is-size-7">¡Por favor, Ingrese segundo apellido</span>}
                            </div>
                        </div>
                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">PRIMER NOMBRE</label>
                            <div className="control">
                                <input type="text" {...register("primer_nombre", { required: true })} className="input is-small is-uppercase" />


                            </div>
                            {errors.primer_nombre && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el primer nombre </span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">SEGUNDO NOMBRE</label>
                            <div className="control">
                                <input type="text" {...register("segundo_nombre", { required: true })} className="input is-small is-uppercase" />


                            </div>
                            {errors.segundo_nombre && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el segundo nombre</span>}
                        </div>

                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">SEXO</label>
                            <div className="select">
                                <select  {...register("sexo", { required: true })} className="input is-small is-uppercase">
                                    <option>HOMBRE</option>
                                    <option>MUJER</option>
                                </select>

                            </div>
                            {errors.sexo && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el sexo</span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">FECHA NACIMIENTO</label>
                            <div className="control">
                                <input type="date" {...register("fecha_nacimiento", { required: true })} className="input is-small is-uppercase" />


                            </div>
                            {errors.fecha_nacimiento && <span className="has-text-danger is-size-7">¡Por favor, Ingrese la fecha de nacimiento</span>}
                        </div>

                    </div>
                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">ESTADO CIVIL</label>
                            <div className="select">
                                <select  {...register("estado_civil", { required: true })} className="input is-small"> 
                                    <option>Seleccionar</option>
                                    {
                                        estadosCivilesState.map(
                                            (row) => (
                                                <option value={row.id} key={row.id}>{row.estado_civil}</option>)

                                        )
                                    }
                                </select>
                                {errors.estado_civil && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el estado civil</span>}
                            </div>
                        </div>


                        <div className="control">
                            <div className="control">
                                <label className="label is-small">PAIS ORIGEN</label>
                                <input onChange={ev => filtrarPaises(ev.target.value)} className="input is-small" />
                            </div>
                            <div className="select">

                                <select  {...register("pais_origen", { required: true })} className="input is-small">
                                    <option>Seleccionar</option>

                                    {

                                        paises && paises.map(
                                            (pais) => (
                                                <option value={pais.id} key={pais.id}>{pais.pais}</option>
                                            )
                                        )
                                    }
                                </select>
                                {errors.pais_origen && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el país de origen</span>}
                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">DISCPACIDAD</label>
                            <div className="select">
                                <select {...register("discapacidad", { required: true })} className="input is-small" defaultValue={person && person.discapacidad.id}>
                                    <option>Seleccionar</option>
                                    {
                                        discapacidadesState && discapacidadesState.map(
                                            (d) => (
                                                <option value={d.id} key={d.id}>{d.discapacidad}</option>
                                            )
                                        )
                                    }
                                </select>


                            </div>
                            {errors.discapacidad && <span className="has-text-danger is-size-7">¡Por favor, Seleccione una discapacidad</span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">NUMERO CONADIS</label>
                            <div className="control">
                                <input type="text" {...register("numero_conadis")} className="input is-small is-uppercase" />

                            </div>
                            {errors.numero_conadis && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el numero de carnet del CONADIS</span>}
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">PORCENTAJE DISCPACIDAD</label>
                            <div className="control">
                                <input type="number" min="0" {...register("porcentaje_discapacidad", { required: true, max: 100 })} className="input is-small" />


                            </div>
                            {errors.porcentaje_discapacidad && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el porcentaje de discapacidad</span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">ETNIA</label>
                            <div className="select">
                                <select  {...register("etnia", { required: true })} className="input is-small">
                                    <option>Seleccionar</option>
                                    {
                                        etinasState && etinasState.map(
                                            (row) => (
                                                <option value={row.id} key={row.id}>{row.etnia}</option>
                                            )
                                        )
                                    }
                                </select>

                            </div>
                            {errors.etnia && <span className="has-text-danger is-size-7">¡Por favor, Seleccione la autoidentificación étnica</span>}
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <div className="control">
                                <label className="label is-small">Nacionalidad</label>
                                <input type="text" onChange={ev => filtrarNacionalidades(ev.target.value)} className="input is-small" />
                            </div>

                            <div className="select">
                                <select  {...register("nacionalidad", { required: true })} className="input is-small">
                                    <option>Seleccionar</option>
                                    {nacionalidades && nacionalidades.map(
                                        (row) => (
                                            <option value={row.id} key={row.nacionalidad}>{row.nacionalidad}</option>
                                        )
                                    )}
                                </select>

                            </div>
                            {errors.nacionalidad && <span className="has-text-danger is-size-7">¡Por favor, Seleccione la nacionalidad </span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">TELEFONO DOMICILIO</label>
                            <div className="control">
                                <input type="tel" {...register("telefono_domicilio")} className="input is-small" />

                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">TELEFONO MOVIL</label>
                            <div className="control">
                                <input type="tel" {...register("telefono_movil", { required: true })} className="input is-small" />

                            </div>
                            {errors.telefono_movil && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el teléfono movil</span>}
                        </div>
                    </div>
                    <hr />

                    <span className="has-text-weight-bold is-size-7 has-text-centered">DIRECCION DOMICILIARIA</span>
                    <div className="field is-grouped">
                        <div className="control">

                            <div className="control">
                                <label className="label is-small">
                                    PROVINCIA
                                </label>
                                <input type="text" className="input is-small" onChange={ev => filtrarProvincias(ev.target.value)} />

                            </div>
                            <div className="select">
                                <select {...register("id_provincia", { required: true })} className="input is-small" onChange={ev => cargarCantones(ev.target.value)}>
                                    <option>Seleccionar</option>
                                    {
                                        provincias && provincias.map(
                                            (row) => (
                                                <option value={row.id} key={row.id}>{row.provincia}</option>
                                            )
                                        )
                                    }
                                </select>

                            </div>
                            {errors.id_provincia && errors.id_provincia.message}
                        </div>

                        <div className="control">
                            <label className="label is-small">
                                CANTON
                            </label>
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
                            {errors.id_canton && errors.id_canton.message}
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">PARROQUIA</label>
                            <div className="control">
                                <input type="text"  {...register("parroquia", { required: true })} className="input is-small is-uppercase" />
                            </div>
                            {errors.parroquia && <span className="has-text-danger is-size-7"> ¡Por favor, ingrese la parroquia!</span>}
                        </div>
                        <div className="control">
                            <label className="label is-small">CALLE 1</label>
                            <div className="control">
                                <input type="text"  {...register("calle1", { required: true })} className="input is-small" />
                            </div>
                            {errors.calle1 && <span className="has-text-danger is-size-7"> ¡Por favor, ingrese la parroquia!</span>}
                        </div>
                    </div>

                    <div className="field is-grouped">
                        <div className="control">
                            <label className="label is-small">CALLE 2</label>
                            <div className="control">
                                <input type="text"  {...register("calle2",)} className="input is-small is-uppercase" />
                            </div>
                        </div>
                        <div className="control">
                            <label className="label is-small">REFERENCIA</label>
                            <div className="control">
                                <input type="text"  {...register("referencia")} className="input is-small is-uppercase" />
                            </div>
                        </div>
                    </div>

                    <hr />
                    <div className="field is-grouped mt-6">
                        <div className="control">
                            <label className="label is-small">EMAIL PERSONAL</label>
                            <div className="control">
                                <input type="email" {...register("email_personal", { required: true })} className="input is-small" />
                                {errors.email_personal && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el email personal</span>}
                            </div>
                        </div>
                        <div className="control">
                            <label className="label is-small">EMAIL INSTITUCIONAL</label>
                            <div className="control">
                                <input type="email" {...register("email_institucional", { required: true })} className="input is-small" />
                                {errors.email_institucional && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el email institucional</span>}
                            </div>
                        </div>
                    </div>

                    <div className="field is-grouped mt-6 mb-4">
                        <div className="control">
                            <label className="label is-small">TIPO DE SANGRE</label>
                            <div className="control">
                                <input type="text" {...register("tipo_sangre", { required: true })} className="input is-small is-uppercase" />
                                {errors.tipo_sangre && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el tipo de sangre</span>}
                            </div>
                        </div>
                        <div className="control">
                            <label className="label is-small">LINCENCIA DE CONCUCCION</label>
                            <div className="control">
                                <input type="text" {...register("licencia_conduccion")} className="input is-small is-uppercase" />

                            </div>
                        </div>
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
    </div >
)
}

export default RegistrarPersona