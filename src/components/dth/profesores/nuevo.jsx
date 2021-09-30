import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'


let RegistrarProfesor = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();

    return (

        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>

                </header>
                <section className="modal-card-body" style={{ display:'flex', justifyContent: 'center'}}>
                    <form className="mt-4 px-2" >
                        <div className="field is-grouped">

                            <p className="control">
                                <label className="label is-small">FECHA INGRESO IES</label>
                                <div className="control">
                                    <input type="date" {...register("fecha_ingreso_ies", { required: true })} className="input is-small" />

                                    {errors.fecha_ingreso_ies && <span>¡Por favor, Ingrese la fecha de ingreso del profesor a la IES!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">TIPO IDENTIFICACION</label>
                                <div className="select">
                                    <select  {...register("tipo_identificacion", { required: true })} className="input is-small">
                                        <option>CEDULA</option>
                                        <option>PASAPORTE</option>
                                    </select>
                                    {errors.tipo_identificacion && <span>¡Por favor, Ingrese el tipo de identificación</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">IDENTIFICACION</label>
                                <div className="control">
                                    <input  {...register("identificacion", { required: true })} className="input is-small" />

                                    {errors.identificacion && <span>¡Por favor, Ingrese la identificación</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">PRIMER APELLIDO</label>
                                <div className="control">
                                    <input  {...register("primer_apellido", { required: true })} className="input is-small" />

                                    {errors.primer_apellido && <span>¡Por favor, Ingrese el primer apellido</span>}
                                </div>
                            </p>

                            <p className="control">
                                <label className="label is-small">SEGUNDO APELLIDO</label>
                                <div className="control">
                                    <input  {...register("segundo_apellido", { required: true })} className="input is-small" />

                                    {errors.segundo_apellido && <span>¡Por favor, Ingrese segundo apellido</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">PRIMER NOMBRE</label>
                                <div className="control">
                                    <input  {...register("nombres", { required: true })} className="input is-small" />

                                    {errors.primer_nombre && <span>¡Por favor, Ingrese los nombres</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">SEGUNDO NOMBRE</label>
                                <div className="control">
                                    <input  {...register("nombres", { required: true })} className="input is-small" />

                                    {errors.segundo_nombre && <span>¡Por favor, Ingrese los nombres</span>}
                                </div>
                            </p>

                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">SEXO</label>
                                <div className="select">
                                    <select  {...register("sexo", { required: true })} className="input is-small">
                                        <option>HOMBRE</option>
                                        <option>MUJER</option>
                                    </select>
                                    {errors.sexo && <span>¡Por favor, Ingrese el sexo</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">FECHA NACIMIENTO</label>
                                <div className="control">
                                    <input type="date" {...register("fecha_nacimiento", { required: true })} className="input is-small" />

                                    {errors.fecha_nacimiento && <span>¡Por favor, Ingrese la fecha de nacimiento</span>}
                                </div>
                            </p>

                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">ESTADO CIVIL</label>
                                <div className="select">
                                    <select  {...register("estado_civil", { required: true })} className="input is-small">
                                        <option>HOMBRE</option>
                                        <option>MUJER</option>
                                    </select>
                                    {errors.estado_civil && <span>¡Por favor, Ingrese el estado civil</span>}
                                </div>
                            </p>


                            <p className="control">
                                <label className="label is-small">PAIS ORIGEN</label>
                                <div className="select">
                                    <select  {...register("pais_origen", { required: true })} className="input is-small">
                                        <option>ABJASIA</option>
                                        <option>AFGANISTAN</option>
                                    </select>
                                    {errors.pais_origen && <span>¡Por favor, Ingrese el país de origen</span>}
                                </div>
                            </p>
                        </div>

                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">DISCPACIDAD</label>
                                <div className="select">
                                    <select type="date" {...register("discpacidad", { required: true })} className="input is-small">
                                        <option>AUDITIVA</option>
                                        <option>FISICA MOTORA</option>
                                        <option>INTELECTUAL</option>
                                    </select>

                                    {errors.discapacidad && <span>¡Por favor, Seleccione una discapacidad</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">NUMERO CONADIS</label>
                                <div className="control">
                                    <input   {...register("numero_conadis", { required: true })} className="input is-small" />

                                    {errors.numero_conadis && <span>¡Por favor, Ingrese el numero de carnet del CONADIS</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">PORCENTAJE DISCPACIDAD</label>
                                <div className="control">
                                    <input min="0" max="100" type="number" {...register("porcentaje_discpacidad", { required: true, max: 100 })} className="input is-small" />

                                    {errors.porcentaje_discapacidad && <span>¡Por favor, Ingrese el porcentaje de discapacidad</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">ETNIA</label>
                                <div className="select">
                                    <select  {...register("etnia", { required: true })} className="input is-small">
                                        <option>INDIGENA</option>
                                        <option>AFROECUATORIANO/A</option>
                                        <option>NEGRO/A</option>
                                    </select>
                                    {errors.etnia && <span>¡Por favor, Seleccione la autoidentificación étnica</span>}
                                </div>
                            </p>
                        </div>

                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">NACIONALIDAD</label>
                                <div className="select">
                                    <select  {...register("nacionalidad")} className="input is-small">
                                        <option>TSACHILA</option>
                                        <option>WAOARANI</option>
                                    </select>
                                    {errors.nacionalidad && <span>¡Por favor, Seleccione la nacionalidad </span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">TELEFONO DOMICILIO</label>
                                <div className="control">
                                    <input  {...register("telefono_domicilio")} className="input is-small" />

                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">TELEFONO MOVIL</label>
                                <div className="control">
                                    <input  {...register("telefono_domicilio")} className="input is-small" />
                                    {errors.telefono_domicilio && <span>¡Por favor, Ingrese el teléfono movil</span>}
                                </div>
                            </p>
                        </div>
                        <fieldset style={{ border: "dotted 1px", padding: '20px' }}>
                            <legend className="has-text-weight-bold is-size-7 has-text-centered">DIRECCION DOMICILIARIA</legend>
                            <div className="field is-grouped">
                                <p className="control">
                                    <label className="label is-small">
                                        PROVINCIA
                                    </label>
                                    <div className="select">
                                        <select {...register("id_provincia", { required: true })} className="input is-small">

                                        </select>
                                        {errors.id_provincia}
                                    </div>
                                </p>
                                <p className="control">
                                    <label className="label is-small">
                                        CANTON
                                    </label>
                                    <div className="select">
                                        <select {...register("id_canton", { required: true })} className="input is-small">

                                        </select>
                                        {errors.id_canton}
                                    </div>
                                </p>
                            </div>
                            <div className="field is-grouped">
                                <p className="control">
                                    <label className="label is-small">PARROQUIA</label>
                                    <div className="control">
                                        <input type="text"  {...register("parroquia", { required: true })} className="input is-small" />
                                    </div>
                                </p>
                                <p className="control">
                                    <label className="label is-small">CALLE 1</label>
                                    <div className="control">
                                        <input type="text"  {...register("calle1", { required: true })} className="input is-small" />
                                    </div>
                                </p>
                            </div>

                            <div className="field is-grouped">
                                <p className="control">
                                    <label className="label is-small">CALLE 2</label>
                                    <div className="control">
                                        <input type="text"  {...register("calle2", { required: true })} className="input is-small" />
                                    </div>
                                </p>
                                <p className="control">
                                    <label className="label is-small">REFERENCIA</label>
                                    <div className="control">
                                        <input type="text"  {...register("referencia", { required: true })} className="input is-small" />
                                    </div>
                                </p>
                            </div>
                        </fieldset>
                        <div className="field is-grouped mt-6">
                            <p className="control">
                                <label className="label is-small">EMAIL PERSONAL</label>
                                <div className="control">
                                    <input  {...register("email_personal", { required: true })} className="input is-small" />
                                    {errors.codigo_ies && <span>¡Por favor, Ingrese el email personal</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">EMAIL INSTITUCIONAL</label>
                                <div className="control">
                                    <input  {...register("email_institucional", { required: true })} className="input is-small" value="@unesum.edu.ec" />
                                    {errors.codigo_matriz && <span>¡Por favor, Ingrese el email institucional</span>}
                                </div>
                            </p>
                        </div>

                        <div className="field is-grouped mt-6">
                            <p className="control">
                                <label className="label is-small">TIPO DE SANGRE</label>
                                <div className="control">
                                    <input  {...register("tipo_sangre", { required: true })} className="input is-small" />
                                    {errors.tipo_sangre && <span>¡Por favor, Ingrese el tipo de sangre</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">LINCENCIA DE CONCUCCION</label>
                                <div className="control">
                                    <input  {...register("licencia_conduccion", { required: true })} className="input is-small" />
                                    {errors.codigo_matriz && <span>¡Por favor, Ingrese el email institucional</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped" style={{ display:'flex', justifyContent: 'center'}}>
                            <p className="control has-text-centered">
                                
                                <button className="button is-small is-danger mx-3">Cancelar</button>
                                <button type="submit" className="button is-success is-small mx-3">Guardar</button>
                            </p>
                        </div>
                    </form>

                </section>
            </div>
        </div >
    )
}

export default RegistrarProfesor