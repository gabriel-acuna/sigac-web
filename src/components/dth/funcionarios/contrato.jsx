import React, { useEffect } from 'react'

import { loadTiposFuncionarios } from '../../../store/core/tiposFuncionarios'
import { loadTiposDocentesLOES } from '../../../store/core/tiposDocentes'
import { loadCategoriasDocentesLOSEP } from '../../../store/core/categoriasDocentes'
import { useDispatch, useSelector } from 'react-redux'

let ContratoFuncionario = ({ objeto, register, errors }) => {
    
    
    let tiposFuncionariosState = useSelector(state => state.tiposFuncionarios.data.tiposFuncionarios)
    let tiposDocentesState = useSelector(state => state.tiposDocentesLOES.data.tiposDocentes)
    let categoriasDocentesState = useSelector(state => state.categoriasDocentesLOSEP.data.categoriasDocentes)
    const dispatch = useDispatch()
    useEffect(
        () => {
            dispatch(loadTiposFuncionarios())
            dispatch(loadTiposDocentesLOES())
            dispatch(loadCategoriasDocentesLOSEP())
        }, []
    )

    return (


        <>

            <div className="field is-grouped">
                <div className="control">
                    <label className="label is-small">TIPO FUNCIONARIO</label>
                    <div className="select">
                        <select {...register("tipo_funcionario", { required: true })} className="input is-small">
                            <option> </option>
                            {
                                tiposFuncionariosState.map(
                                    (row) => (<option key={row.id} value={row.id}> {row.tipo} </option>)
                                )
                            }
                        </select>


                       
                    </div>
                    {errors.tipo_funcionario && <span>¡Por favor, Seleccione el tipo de funcionario!</span>}
                </div>
            </div>
            <div className="field is-grouped">
                <div className="control">
                    <label htmlFor="" className="label is-small">
                        CARGO
                    </label>
                    <div className="control"><input type="text" {...register("cargo", { required: true })} className="input is-small" />
                        
                    </div>
                    {errors.cargo && <span>¡Por favor, Ingrese el cargo del funcionario!</span>}
                </div>
                <div className="control">
                    <label className="label is-small">TIPO DECENTE LOES</label>
                    <div className="select">
                        <select {...register("tipo_docente", { required: true })} className="input is-small is-uppercase">
                            <option> </option>
                            {
                                tiposDocentesState.map(
                                    (row) => (<option key={row.id} value={row.id}> {row.tipo_docente} </option>)
                                )
                            }
                        </select>


                       
                    </div>
                    {errors.tipo_docente && <span>¡Por favor, Seleccione el tipo de funcionario!</span>}
                </div>
            </div>
            <div className="field is-grouped">

                <div className="control">
                    <label className="label is-small">CATEGORIA DOCENTE</label>
                    <div className="select">
                        <select {...register("categoria_docente", { required: true })} className="input is-small">
                            <option> </option>
                            {
                                categoriasDocentesState.map(
                                    (row) => (<option key={row.id} value={row.id}> {row.categoria_docente} </option>)
                                )
                            }
                        </select>


                        
                    </div>
                    {errors.categoria_docente && <span>¡Por favor, Seleccione la categoria de docente!</span>}
                </div>
            </div>
            <div className="field is-grouped">

                <div className="control">
                    <label className="label is-small">PUESTO JERARQUICO SUPERIOR</label>
                    <div className="select">
                        <select {...register("puesto_jerarquico", { required: true })} className="input is-small">
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>

                        </select>


                       
                    </div>
                    {errors.puesto_jerarquico && <span>¡Por favor, Seleccione una opción!</span>}
                </div>
                <div className="control">
                    <label htmlFor="" className="label is-small">
                        HORAS LABORABLES SEMANA
                    </label>
                    <div className="control">
                        <input type="text" {...register("horas_laborables_semanales", { required: true })} className="input is-small" />
                       
                    </div>
                    {errors.horas_laborables_semana && <span>¡Por favor, Ingrese las horas laborables por semana!</span>}
                </div>
            </div>

        </>

    )
}

export default ContratoFuncionario;