import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loadNivelesEducativos } from '../../../store/core/nivelesEducativos'
import { loadTiemposDedicacionesProfesores } from '../../../store/core/tiemposDedicaciones'
import { loadTiposEscalafonesNombramientos } from '../../../store/core/tiposEscalafones'
import { loadCategoriasContratoProfesores } from '../../../store/core/categoriasContratos'
import { useDispatch, useSelector } from 'react-redux';

let ContratoProfesor = ({ objeto, register, errors }) => {
  

    const dispatch = useDispatch()
    let nivelesEducativosState = useSelector(state => state.nivelesEducativos.data.nivelesEducativos)
    let tiposEscalafonesState = useSelector(state => state.tipoEscalafones.data.tipoEscalafones)
    let categoriasContratosState = useSelector(state => state.categoriasContratos.data.categoriasContrato)
    let tiemposDedicacionesState = useSelector(state => state.tiemposDedicaciones.data.tiemposDedicaciones)

    useEffect(
        () => {

            dispatch(loadCategoriasContratoProfesores())
            dispatch(loadTiemposDedicacionesProfesores())
            dispatch(loadNivelesEducativos())
            dispatch(loadTiposEscalafonesNombramientos())

        }, []
    )


    return (
        <>

            <div className="field is-grouped">
                <div className="control">
                    <label className="label is-small">CONTARTO RELACIONADO</label>
                    <div className="control">
                        <input  {...register("contrato_relacionado", { required: true })} className="input is-small" />

                        {errors.contrato_relacionado && <span>¡Por favor, Ingrese el número de documento!</span>}
                    </div>
                </div>
                <div className="control">
                    <label className="label is-small">TIPO ESCALAFON</label>
                    <div className="select">
                        <select  {...register("tipo_esclafon", { required: true })} className="input is-small" >
                            <option> </option>
                            {
                                tiposEscalafonesState.map(

                                    (row) => (
                                        <option key={row.id} value={row.id}> {row.escalafon_nombramiento}</option>
                                    )
                                )
                            }
                        </select>
                        {errors.tipo_escalafon && <span>¡Por favor, Seleccione la relación del funcionario con la IES!</span>}
                    </div>
                </div>

            </div>
            <div className="field is-grouped">

                <div className="control">
                    <label className="label is-small">CATEGORIA</label>
                    <div className="select">
                        <select  {...register("categoria", { required: true })} className="input is-small" >
                            <option> </option>
                            {
                                categoriasContratosState.map(
                                    (row) => (
                                        <option key={row.id} value={row.id}> {row.categoria_contrato}</option>
                                    )
                                )
                            }
                        </select>
                        {errors.categoria && <span>¡Por favor, Seleccione la categoria contrato!</span>}
                    </div>
                </div>
                <div className="control">
                    <label className="label is-small">TIEMPO DEDICACION</label>
                    <div className="select">
                        <select  {...register("tiempo_dedicacion", { required: true })} className="input is-small" >
                            <option> </option>
                            {
                                tiemposDedicacionesState.map(
                                    (row) => (
                                        <option key={row.id} value={row.id}> {row.tiempo_dedicacion}</option>
                                    )
                                )
                            }
                        </select>
                        {errors.tiempo_dedicacion && <span>¡Por favor, Seleccione el timepo de decicación!</span>}
                    </div>
                </div>

            </div>


            <div className="field is-grouped">
                <div className="control">
                    <label htmlFor="" className="label is-small">
                        REMUNERACION HORA
                    </label>
                    <div className="control"><input type="text" {...register("remuneracion_hora")} className="input is-small" />
                        {errors.remuneracion_hora && <span>¡Por favor, Ingrese la remuneración por hora!</span>}
                    </div>
                </div>
                <div className="control">
                    <label className="label is-small">NIVEL</label>
                    <div class="select">
                        <select {...register("nivel_educativo", { required: true })} className="input is-small">
                            <option> </option>
                            {
                                nivelesEducativosState.map(
                                    (row) => (
                                        <option key={row.id} value={row.id}> {row.nivel}</option>
                                    )
                                )
                            }

                        </select>


                        {errors.nivel_educativo && <span>¡Por favor, Seleccione el nivel educativo en el uqe dicta clase el profesor!</span>}
                    </div>
                </div>


            </div>



        </>
    )
}

export default ContratoProfesor;