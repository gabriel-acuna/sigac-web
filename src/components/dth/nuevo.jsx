import React, { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { loadPaises } from '../../store/core/paises';
import { loadDiscapacidades } from '../../store/core/discapacidades';
import { loadEtnias } from '../../store/core/etnias'
import { loadEstadosCiviles } from '../../store/core/estado_civil'
import { loadNacionalidades } from '../../store/core/nacionalidades'
import { loadCantonesProvincia, loadProvincias } from '../../store/core/provincias'

let RegistrarPersona = (props) => {
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();

    const navigate = useNavigate();
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


    const [paises, setPaises] = useState([])
    const [nacionalidades, setNacionalidades] = useState([])
    const [provincias, setProvincias] = useState([])
    const [cantones, setCantones] = useState([])

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

    return (

        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="modal-card-title">{props.title}</span>

                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>
                    <form className="mt-4 px-2" >
                        <div className="field is-grouped">

                            <div className="control">
                                <label className="label is-small">FECHA INGRESO IES</label>
                                <div className="control">
                                    <input type="date" {...register("fecha_ingreso_ies", { required: true })} className="input is-small" />

                                    {errors.fecha_ingreso_ies && <span>¡Por favor, Ingrese la fecha de ingreso del profesor a la IES!</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">TIPO IDENTIFICACION</label>
                                <div className="select">
                                    <select  {...register("tipo_identificacion", { required: true })} className="input is-small">
                                        <option>CEDULA</option>
                                        <option>PASAPORTE</option>
                                    </select>
                                    {errors.tipo_identificacion && <span>¡Por favor, Ingrese el tipo de identificación</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">IDENTIFICACION</label>
                                <div className="control">
                                    <input  {...register("identificacion", { required: true })} className="input is-small" />

                                    {errors.identificacion && <span>¡Por favor, Ingrese la identificación</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">PRIMER APELLIDO</label>
                                <div className="control">
                                    <input  {...register("primer_apellido", { required: true })} className="input is-small" />

                                    {errors.primer_apellido && <span>¡Por favor, Ingrese el primer apellido</span>}
                                </div>
                            </div>

                            <div className="control">
                                <label className="label is-small">SEGUNDO APELLIDO</label>
                                <div className="control">
                                    <input  {...register("segundo_apellido", { required: true })} className="input is-small" />

                                    {errors.segundo_apellido && <span>¡Por favor, Ingrese segundo apellido</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">PRIMER NOMBRE</label>
                                <div className="control">
                                    <input  {...register("nombres", { required: true })} className="input is-small" />

                                    {errors.primer_nombre && <span>¡Por favor, Ingrese los nombres</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">SEGUNDO NOMBRE</label>
                                <div className="control">
                                    <input  {...register("nombres", { required: true })} className="input is-small" />

                                    {errors.segundo_nombre && <span>¡Por favor, Ingrese los nombres</span>}
                                </div>
                            </div>

                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">SEXO</label>
                                <div className="select">
                                    <select  {...register("sexo", { required: true })} className="input is-small">
                                        <option>HOMBRE</option>
                                        <option>MUJER</option>
                                    </select>
                                    {errors.sexo && <span>¡Por favor, Ingrese el sexo</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">FECHA NACIMIENTO</label>
                                <div className="control">
                                    <input type="date" {...register("fecha_nacimiento", { required: true })} className="input is-small" />

                                    {errors.fecha_nacimiento && <span>¡Por favor, Ingrese la fecha de nacimiento</span>}
                                </div>
                            </div>

                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">ESTADO CIVIL</label>
                                <div className="select">
                                    <select  {...register("estado_civil", { required: true })} className="input is-small">
                                        {
                                            estadosCivilesState.map(
                                                (row) => (
                                                    <option id={row.etnia} key={row.id}>{row.estado_civil}</option>
                                                )
                                            )
                                        }
                                    </select>
                                    {errors.estado_civil && <span>¡Por favor, Ingrese el estado civil</span>}
                                </div>
                            </div>


                            <div className="control">
                                <div className="control">
                                    <label className="label is-small">PAIS ORIGEN</label>
                                    <input onChange={ev => filtrarPaises(ev.target.value)} className="input is-small" />
                                </div>
                                <div className="select">
                                    <select  {...register("pais_origen", { required: true })} className="input is-small" >
                                        {
                                            paises.map(
                                                (pais) => (
                                                    <option value={pais.id} key={pais.id}>{pais.pais}</option>
                                                )
                                            )
                                        }
                                    </select>
                                    {errors.pais_origen && <span>¡Por favor, Ingrese el país de origen</span>}
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">DISCPACIDAD</label>
                                <div className="select">
                                    <select {...register("discpacidad", { required: true })} className="input is-small">
                                        {
                                            discapacidadesState.map(
                                                (d) => (
                                                    <option value={d.id} key={d.id}>{d.discapacidad}</option>
                                                )
                                            )
                                        }
                                    </select>

                                    {errors.discapacidad && <span>¡Por favor, Seleccione una discapacidad</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">NUMERO CONADIS</label>
                                <div className="control">
                                    <input   {...register("numero_conadis", { required: true })} className="input is-small" />

                                    {errors.numero_conadis && <span>¡Por favor, Ingrese el numero de carnet del CONADIS</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">PORCENTAJE DISCPACIDAD</label>
                                <div className="control">
                                    <input min="0" max="100" type="number" {...register("porcentaje_discpacidad", { required: true, max: 100 })} className="input is-small" />

                                    {errors.porcentaje_discapacidad && <span>¡Por favor, Ingrese el porcentaje de discapacidad</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">ETNIA</label>
                                <div className="select">
                                    <select  {...register("etnia", { required: true })} className="input is-small">
                                        {
                                            etinasState.map(
                                                (row) => (
                                                    <option value={row.id} key={row.id}>{row.etnia
                                                    }</option>
                                                )
                                            )
                                        }
                                    </select>
                                    {errors.etnia && <span>¡Por favor, Seleccione la autoidentificación étnica</span>}
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped">
                            <div className="control">
                                <div className="control">
                                    <label className="label is-small">Nacionalidad</label>
                                    <input onChange={ev => filtrarNacionalidades(ev.target.value)} className="input is-small" />
                                </div>

                                <div className="select">
                                    <select  {...register("nacionalidad")} className="input is-small">
                                        {nacionalidades.map(
                                            (row) => (
                                                <option value={row.id} key={row.nacionalidad}>{row.nacionalidad}</option>
                                            )
                                        )}
                                    </select>
                                    {errors.nacionalidad && <span>¡Por favor, Seleccione la nacionalidad </span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">TELEFONO DOMICILIO</label>
                                <div className="control">
                                    <input  {...register("telefono_domicilio")} className="input is-small" />

                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">TELEFONO MOVIL</label>
                                <div className="control">
                                    <input  {...register("telefono_domicilio")} className="input is-small" />
                                    {errors.telefono_domicilio && <span>¡Por favor, Ingrese el teléfono movil</span>}
                                </div>
                            </div>
                        </div>
                        <hr />
                        <fieldset>
                            <legend className="has-text-weight-bold is-size-7 has-text-centered">DIRECCION DOMICILIARIA</legend>
                            <div className="field is-grouped">
                                <div className="control">
                                    <div className="control">
                                        <label className="label is-small">
                                            PROVINCIA
                                        </label>
                                        <input className="input is-small" onChange={ev => filtrarProvincias(ev.target.value)} />
                                    </div>
                                    <div className="select">
                                        <select {...register("id_provincia", { required: true })} className="input is-small" onChange={ev => cargarCantones(ev.target.value)}>
                                            {
                                                provincias.map(
                                                    (row) => (
                                                        <option value={row.id} key={row.id}>{row.provincia}</option>
                                                    )
                                                )
                                            }
                                        </select>
                                        {errors.id_provincia}
                                    </div>
                                </div>
                                <div className="control">
                                    <label className="label is-small">
                                        CANTON
                                    </label>
                                    <div className="select">
                                        <select {...register("id_canton", { required: true })} className="input is-small">
                                            {
                                                cantones.map(
                                                    (row) => (
                                                        <option id={row.id} key={row.id}> {row.canton} </option>
                                                    )
                                                )
                                            }
                                        </select>
                                        {errors.id_canton}
                                    </div>
                                </div>
                            </div>
                            <div className="field is-grouped">
                                <div className="control">
                                    <label className="label is-small">PARROQUIA</label>
                                    <div className="control">
                                        <input type="text"  {...register("parroquia", { required: true })} className="input is-small" />
                                    </div>
                                </div>
                                <div className="control">
                                    <label className="label is-small">CALLE 1</label>
                                    <div className="control">
                                        <input type="text"  {...register("calle1", { required: true })} className="input is-small" />
                                    </div>
                                </div>
                            </div>

                            <div className="field is-grouped">
                                <div className="control">
                                    <label className="label is-small">CALLE 2</label>
                                    <div className="control">
                                        <input type="text"  {...register("calle2", { required: true })} className="input is-small" />
                                    </div>
                                </div>
                                <div className="control">
                                    <label className="label is-small">REFERENCIA</label>
                                    <div className="control">
                                        <input type="text"  {...register("referencia", { required: true })} className="input is-small" />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <hr />
                        <div className="field is-grouped mt-6">
                            <div className="control">
                                <label className="label is-small">EMAIL PERSONAL</label>
                                <div className="control">
                                    <input  {...register("email_personal", { required: true })} className="input is-small" />
                                    {errors.codigo_ies && <span>¡Por favor, Ingrese el email personal</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">EMAIL INSTITUCIONAL</label>
                                <div className="control">
                                    <input  {...register("email_institucional", { required: true })} className="input is-small" value="@unesum.edu.ec" />
                                    {errors.codigo_matriz && <span>¡Por favor, Ingrese el email institucional</span>}
                                </div>
                            </div>
                        </div>

                        <div className="field is-grouped mt-6 mb-4">
                            <div className="control">
                                <label className="label is-small">TIPO DE SANGRE</label>
                                <div className="control">
                                    <input  {...register("tipo_sangre", { required: true })} className="input is-small" />
                                    {errors.tipo_sangre && <span>¡Por favor, Ingrese el tipo de sangre</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">LINCENCIA DE CONCUCCION</label>
                                <div className="control">
                                    <input  {...register("licencia_conduccion", { required: true })} className="input is-small" />
                                    {errors.codigo_matriz && <span>¡Por favor, Ingrese el email institucional</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="control has-text-centered">
                                <Fragment>
                                    {props.children}
                                </Fragment>


                            </div>
                        </div>
                    </form>

                </section>
            </div>
        </div >
    )
}

export default RegistrarPersona