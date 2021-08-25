import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { options } from '../../admin/options';

let ContratoProfesor = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();
    
    return (
        <div className="conatiner">

            <div className="columns is-multiline is-centered">
                <div className="column is-6 mb-6">
                    <button className="button is-small is-info mt-4" onClick={event => navigate(-1)}>Regresar</button>
                    <form className="mt-4 px-2">

                        <div className="field is-grouped">

                            <p className="control">
                                <label className="label is-small">IDENTIFICACION</label>
                                <div className="control">
                                    <input  {...register("identificacion", { required: true })} className="input is-small" value={id} />

                                    {errors.identificacion && <span>¡Por favor, Ingrese la identificación!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">TIPO DOCUMENTO</label>
                                <div select="control">
                                    <select  {...register("tipo_documento", { required: true })} className="input is-small" >
                                        <options>CONTRATO</options>
                                        <option>ACCION DE PERSONAL</option>
                                        <option>NOMBRAMIENTO</option>

                                    </select>
                                    {errors.tipo_documento && <span>¡Por favor, Seleccione el tipo de documento!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">INGRESO POR CONCURSO</label>
                                <div class="select">
                                    <select {...register("ingreso_concurso", { required: true })} className="input is-small">
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>


                                    {errors.ingreso_concurso && <span>¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">NUMERO DOCUMENTO</label>
                                <div className="control">
                                    <input  {...register("numero_documento", { required: true })} className="input is-small" />

                                    {errors.numero_documento && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </p>

                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">CONTARTO RELACIONADO</label>
                                <div className="control">
                                    <input  {...register("contrato_relacionado", { required: true })} className="input is-small" />

                                    {errors.contrato_relacionado && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">RELACION IES</label>
                                <div className="select">
                                    <select  {...register("relacion_ies", { required: true })} className="input is-small" >
                                        <option>NOMBRAMIENTO</option>
                                        <option>CONTRATO CON RELACION DE DEPENDENCIA</option>
                                        <option>CONTRATO SIN RELACION DE DEPENDENCIA</option>
                                        <option>PROMETEO</option>
                                    </select>
                                    {errors.relacion_ies && <span>¡Por favor, Seleccione la relación del funcionario con la IES!</span>}
                                </div>
                            </p>

                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">TIPO ESCALAFON</label>
                                <div className="select">
                                    <select  {...register("tipo_esclafon", { required: true })} className="input is-small" >
                                        <option>LABORAL PREVIO</option>
                                        <option>LABORAL ACTUAL</option>
                                        <option>NO APLICA</option>

                                    </select>
                                    {errors.tipo_escalafon && <span>¡Por favor, Seleccione la relación del funcionario con la IES!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">CATEGORIA</label>
                                <div className="select">
                                    <select  {...register("categoria", { required: true })} className="input is-small" >
                                        <option>TITULAR PRINCIPAL</option>
                                        <option>TITULAR AGREGADO</option>
                                        <option>TITULAR AUXILIAR</option>

                                    </select>
                                    {errors.categoria && <span>¡Por favor, Seleccione la relación del funcionario con la IES!</span>}
                                </div>
                            </p>

                        </div>

                        <div className="field is-grouped">
                            <p className="control">
                                <label className="label is-small">TIEMPO DEDICACION</label>
                                <div className="select">
                                    <select  {...register("tiempo_dedicacion", { required: true })} className="input is-small" >
                                        <option>EXCLUSIVA O TIEMPO COMPLETO</option>
                                        <option>SEMIEXCLUSIVA O MEDIO TIEMPO</option>
                                        <option>TIEMPO PARCIAL</option>

                                    </select>
                                    {errors.tiempo_dedicacion && <span>¡Por favor, Seleccione la relación del funcionario con la IES!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    REMUNERACION MENSUAL
                                </label>
                                <div className="control"><input type="text" {...register("remuneracion_mes", { required: true })} className="input is-samll" />
                                    {errors.remuneracion_es && <span>¡Por favor, Ingrese la remuneración mesual!</span>}
                                </div>
                            </p>

                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    REMUNERACION HORA
                                </label>
                                <div className="control"><input type="text" {...register("remuneracion_hora", { required: true })} className="input is-samll" />
                                    {errors.remuneracion_hora && <span>¡Por favor, Ingrese la remuneración por hora!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">FECHA INICIO</label>
                                <div className="control">
                                    <input  {...register("fecha_inicio", { required: true })} className="input is-small" />

                                    {errors.fecha_inicio && <span>¡Por favor, Ingrese la fecha de inicio de gestión!</span>}
                                </div>
                            </p>


                        </div>

                        <div className="field is-grouped">


                            <p className="control">
                                <label className="label is-small">FECHA FIN</label>
                                <div className="control">
                                    <input  {...register("fecha_fin")} className="input is-small" />

                                    {errors.fecha_inicio && <span>¡Por favor, Ingrese la fecha de fin de gestión!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">NIVEL</label>
                                <div class="select">
                                    <select {...register("nivel_educativo", { required: true })} className="input is-small">
                                        <option value="TERCER NIVEL">TERCER NIVEL</option>
                                        <option value="CUARTO NIVEL">CUARTO NIVEL</option>
                                        <option value="TERCER/CUARTO NIVEL">CUARTO NIVEL</option>
                                    </select>


                                    {errors.nivel_educativo && <span>¡Por favor, Seleccione el nivel educativo en el uqe dicta clase el profesor!</span>}
                                </div>
                            </p>

                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    UNIDAD ACADEMICA
                                </label>
                                <div className="control"><input type="text" {...register("unidad_academica", { required: true })} className="input is-samll" />
                                    {errors.cargo && <span>¡Por favor, Ingrese la unidad académica!</span>}
                                </div>
                            </p>
                            <p className="control mt-4">

                                <button type="submit" className="button is-success is-small">Guardar</button>

                            </p>
                        </div>

                    </form>
                </div>
            </div>
        </div >
    )
}

export default ContratoProfesor;