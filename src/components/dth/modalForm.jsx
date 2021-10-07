import { useState } from "react"
import Funcionario from './funcionarios/contrato'
import Profesor from './profesores/contrato'
import { useForm } from 'react-hook-form'
import { options } from './options'
let ModalForm = ({ title }) => {
    const [tipoFuncionario, setTipoFuncionario] = useState('')
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="modal-card-title">{title}</span>
                </header>
                <section className="modal-card-body" style={{ display: 'flex', justifyContent: 'center' }}>
                    <form>
                        <div className="field">
                            <label className="label is-small is-uppercase">Tipo Funcionario</label>
                            <div className="select">
                                <select onChange={ev => setTipoFuncionario(ev.target.value)} className="input is-small"
                                >
                                    <option></option>
                                    <option>FUNCIONARIO</option>
                                    <option>PROFESOR</option>
                                </select>
                            </div>

                        </div>
                        <div className="field is-grouped">

                            <div className="control">
                                <label className="label is-small">TIPO DOCUMENTO</label>
                                <div select="control">
                                    <select  {...register("tipo_documento", { required: true })} className="input is-small" >


                                    </select>
                                    {errors.tipo_documento && <span>¡Por favor, Seleccione el tipo de documento!</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">MOTIVO ACCIÓN</label>
                                <div className="select">
                                    <select {...register("motivo_accion")} className="input is-small">
                                        <option> </option>
                                        {
                                            options.map((op) => (
                                                <option>{op}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">
                                    FECHA INICIO
                                </label>
                                <input type="date" {...register("fecha_inicio")} className="input is-small" />
                            </div>
                            <div className="control">
                                <label className="label is-small">
                                    FECHA FIN
                                </label>
                                <input type="date" {...register("fecha_fin")} className="input is-small" />
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">INGRESO POR CONCURSO</label>
                                <div class="select">
                                    <select {...register("ingreso_concurso", { required: true })} className="input is-small">
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>


                                    {errors.ingreso_concurso && <span>¡Por favor, Seleccione si el ingreso fue por concurso!</span>}
                                </div>
                            </div>
                        </div>
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">RELACION IES</label>
                                <div class="select">
                                    <select {...register("realacion_ies", { required: true })} className="input is-small">

                                    </select>


                                    {errors.realacion_ies && <span>¡Por favor, Seleccione si la relación!</span>}
                                </div>
                            </div>
                            <div className="control">
                                <label className="label is-small">NUMERO DOCUMENTO</label>
                                <div className="control">
                                    <input  {...register("numero_documento", { required: true })} className="input is-small" />

                                    {errors.numero_documento && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </div>

                        </div>

                        {
                            tipoFuncionario === 'FUNCIONARIO' && <Funcionario />
                        }
                        {
                            tipoFuncionario === 'PROFESOR' && <Profesor />
                        }
                        <div className="field is-grouped">
                            <div className="control">
                                <label className="label is-small">REMUNERACION</label>
                                <div class="control">
                                    <input {...register("remuneracion", { required: true })} className="input is-small" />




                                    {errors.remuneracion && <span>¡Por favor, Seleccione si la remuneración mensual!</span>}
                                </div>
                            </div>
                            <div className="control">
                                <div className="control">
                                    <label className="label is-small">AREA</label>
                                    <input type="text" />
                                </div>
                                <div className="select">

                                    <select {...register("area", { required: true })} className="input is-small" >
                                    </select>

                                    {errors.area && <span>¡Por favor, Ingrese el número de documento!</span>}
                                </div>
                            </div>

                        </div>
                        <div className="field">
                        <div className="control">
                                    <label className="label is-small">SUBAREA</label>
                                    <input type="text" />
                                </div>
                            <div className="select">

                                <select {...register("subarea", { required: true })} className="input is-small" >
                                </select>

                                {errors.subarea && <span>¡Por favor, Ingrese el número de documento!</span>}
                            </div>
                        </div>
                    
                
                </form>

            </section>
        </div>
        </div >
    )
}

export default ModalForm