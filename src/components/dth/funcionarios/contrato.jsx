import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom'

let ContratoFuncionario = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const {id} = useParams();
    const history = useHistory();
    let goBack = () => {
        history.goBack()
    }
    return (
        <div className="conatiner">

            <div className="columns is-multiline is-centered">
                <div className="column is-6 mb-6">
                    <button className="button is-small is-info mt-4" onClick={event => goBack(event)}>Regresar</button>
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
                                <label className="label is-small">NUMERO DOCUMENTO</label>
                                <div className="control">
                                    <input  {...register("numero_documento", { required: true })} className="input is-small" />

                                    {errors.numero_documento && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
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
                                <label className="label is-small">INGRESO POR CONCURSO</label>
                                <div class="select">
                                    <select {...register("ingreso_concurso", { required: true })} className="input is-small">
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>


                                    {errors.ingreso_concurso && <span>¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    REMUNERACION
                                </label>
                                <div className="control"><input type="text" {...register("remuneracion", { required: true })} className="input is-samll" />
                                    {errors.remuneracion && <span>¡Por favor, Ingrese la remuneración!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">TIPO FUNCIONARIO</label>
                                <div class="select">
                                    <select {...register("tipo_funcionario", { required: true })} className="input is-small">
                                        <option value="ADMNISTARTIVO">ADMNISTARTIVO</option>
                                        <option value="TRABAJADOR">TRABAJADOR</option>
                                        <option value="DIRECTIVO">DIRECTIVO</option>
                                        <option value="DOCENTE LOES">DOCENTE LOES</option>
                                    </select>


                                    {errors.tipo_funcionario && <span>¡Por favor, Seleccione el tipo de funcionario!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    CARGO
                                </label>
                                <div className="control"><input type="text" {...register("cargo", { required: true })} className="input is-samll" />
                                    {errors.cargo && <span>¡Por favor, Seleccione si el cargo del funcionario!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label className="label is-small">TIPO DECENTE LOES</label>
                                <div class="select">
                                    <select {...register("tipo_docente", { required: true })} className="input is-small">
                                        <option value="TECNICO DOCENTE">TECNICO DOCENTE</option>
                                        <option value="TECNICO LABORATORIO">TECNICO LABORATORIO</option>
                                        <option value="TECNICO INVESTIGACION">TECNICO INVESTIGACION</option>
                                        <option value="TECNICO ARTES">TECNICO ARTES</option>
                                        <option value="NO APLICA">NO APLICA</option>
                                    </select>


                                    {errors.tipo_deocente && <span>¡Por favor, Seleccione el tipo de funcionario!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            
                            <p className="control">
                                <label className="label is-small">CATEGORIA DOCENTE</label>
                                <div class="select">
                                    <select {...register("catagoria_docente", { required: true })} className="input is-small">
                                        <option value="CATGORIA 1">CATGORIA 1</option>
                                        <option value="CATGORIA 2">CATGORIA 2</option>
                                        <option value="CATGORIA 3">CATGORIA 3</option>
                                        <option value="CATGORIA 4">CATGORIA 4</option>
                                        <option value="CATGORIA 5">CATGORIA 5</option>
                                        <option value="NO APLICA">NO APLICA</option>
                                    </select>


                                    {errors.categoria_deocente && <span>¡Por favor, Seleccione la categoria de docente!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    UNIDAD ACADEMICA
                                </label>
                                <div className="control"><input type="text" {...register("unidad_academica", { required: true })} className="input is-samll" />
                                    {errors.cargo && <span>¡Por favor, Ingrese la unidad académica!</span>}
                                </div>
                            </p>
                        </div>
                        <div className="field is-grouped">
                            
                            <p className="control">
                                <label className="label is-small">PUESTO JERARQUICO SUPERIOR</label>
                                <div class="select">
                                    <select {...register("catagoria_docente", { required: true })} className="input is-small">
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                        
                                    </select>


                                    {errors.pueesto_jerarquico && <span>¡Por favor, Seleccione una opción!</span>}
                                </div>
                            </p>
                            <p className="control">
                                <label htmlFor="" className="label is-small">
                                    HORAS LABORABLES SEMANA
                                </label>
                                <div className="control"><input type="horas_laborables_semana" {...register("unidad_academica", { required: true })} className="input is-samll" />
                                    {errors.horas_laborables_semana && <span>¡Por favor, Ingrese las horas laborables por semana!</span>}
                                </div>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContratoFuncionario;