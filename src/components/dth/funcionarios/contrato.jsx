import React, { useState } from 'react'
import { useSelector } from 'react-redux'

let ContratoFuncionario = ({ objeto, register, errors }) => {


    let tiposFuncionariosState = useSelector(state => state.tiposFuncionarios.data.tiposFuncionarios)
    let tiposDocentesState = useSelector(state => state.tiposDocentesLOES.data.tiposDocentes)
    let categoriasDocentesState = useSelector(state => state.categoriasDocentesLOSEP.data.categoriasDocentes)
    
    const [funcType, setFuncType] = useState(null)
  
    
    return (


        <>

            <div className="columns">
                <div className="column">
                    <label className="label is-small">TIPO FUNCIONARIO</label>
                    <div className="select">
                        <select {...register("tipo_funcionario", { required: true })} className="input is-small" onChange={ev => setFuncType(ev.target.options[ev.target.selectedIndex].text)}>
                            <option> </option>
                            {
                                tiposFuncionariosState.map(
                                    (row) => (<option key={row.id} value={row.id}> {row.tipo} </option>)
                                )
                            }
                        </select>



                    </div>
                    {errors.tipo_funcionario && <span className="has-text-danger is-size-7">¡Por favor, Seleccione el tipo de funcionario!</span>}
                </div>


                <div className="column">
                    <label htmlFor="" className="label is-small">
                        CARGO
                    </label>
                    <div className="control"><input type="text" {...register("cargo", { required: true })} className="input is-small" />

                    </div>
                    {errors.cargo && <span className="has-text-danger is-size-7">¡Por favor, Ingrese el cargo del funcionario!</span>}
                </div>
                <div className="column">
                    <label className="label is-small">TIPO DECENTE LOES</label>
                    <div className="select">
                        <select {...register("tipo_docente", { required: true })} className="input is-small is-uppercase">
                            <option> </option>
                            {
                                funcType === 'DOCENTE LOES' ? tiposDocentesState.map(
                                    (row) => (row.tipo_docente !== 'NO APLICA' && <option key={row.id} value={row.id}> {row.tipo_docente} </option>)
                                ) :funcType !== null &&  funcType !== '' && tiposDocentesState.map(
                                    (row) => (row.tipo_docente === 'NO APLICA' && <option key={row.id} value={row.id}> {row.tipo_docente} </option>)
                                )
                            }
                        </select>



                    </div>
                    {errors.tipo_docente && <span className="has-text-danger is-size-7">¡Por favor, Seleccione el tipo de funcionario!</span>}
                </div>
            </div>
            <div className="columns">

                <div className="column">
                    <label className="label is-small">CATEGORIA DOCENTE</label>
                    <div className="select">
                        <select {...register("categoria_docente", { required: true })} className="input is-small">
                            <option></option>
                            {
                                funcType === 'DOCENTE LOES' ? categoriasDocentesState.map(
                                    (row) => (row.categoria_docente !== 'NO APLICA' && <option key={row.id} value={row.id}> {row.categoria_docente} </option>)
                                ) : funcType !== null && funcType !== '' && categoriasDocentesState.map(
                                    row => (row.categoria_docente === 'NO APLICA' && <option key={row.id} value={row.id} > {row.categoria_docente} </option>)
                                )
                            }
                        </select>



                    </div>
                    {errors.categoria_docente && <span className="has-text-danger is-size-7">¡Por favor, Seleccione la categoria de docente!</span>}
                </div>



                <div className="column">
                    <label className="label is-small">PUESTO JERARQUICO SUPERIOR</label>
                    <div className="select">
                        <select {...register("puesto_jerarquico", { required: true })} className="input is-small">
                            <option></option>
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>

                        </select>



                    </div>
                    {errors.puesto_jerarquico && <span className="has-text-danger is-size-7">¡Por favor, Seleccione una opción!</span>}
                </div>
                <div className="column">
                    <label htmlFor="" className="label is-small">
                        HORAS LABORABLES SEMANA
                    </label>
                    <div className="control">
                        <input type="text" {...register("horas_laborables_semanales", { required: true })} className="input is-small" />

                    </div>
                    {errors.horas_laborables_semanales && <span className="has-text-danger is-size-7">¡Por favor, Ingrese las horas laborables por semana!</span>}
                </div>
            </div>

        </>

    )
}

export default ContratoFuncionario;