import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom'
import { options } from '../../admin/options';

let ContratoProfesor = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { id } = useParams();
    const navigate = useNavigate();

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
                           

                        </select>
                        {errors.categoria && <span>¡Por favor, Seleccione la relación del funcionario con la IES!</span>}
                    </div>
                </div>
                <div className="control">
                    <label className="label is-small">TIEMPO DEDICACION</label>
                    <div className="select">
                        <select  {...register("tiempo_dedicacion", { required: true })} className="input is-small" >
                           

                        </select>
                        {errors.tiempo_dedicacion && <span>¡Por favor, Seleccione el timepo de decicación!</span>}
                    </div>
                </div>

            </div>

            <div className="field is-grouped">
               
                <div className="control">
                    <label htmlFor="" className="label is-small">
                        REMUNERACION MENSUAL
                    </label>
                    <div className="control"><input type="text" {...register("remuneracion_mes", { required: true })} className="input is-samll" />
                        {errors.remuneracion_es && <span>¡Por favor, Ingrese la remuneración mesual!</span>}
                    </div>
                </div>

            </div>
            <div className="field is-grouped">
                <div className="control">
                    <label htmlFor="" className="label is-small">
                        REMUNERACION HORA
                    </label>
                    <div className="control"><input type="text" {...register("remuneracion_hora", { required: true })} className="input is-samll" />
                        {errors.remuneracion_hora && <span>¡Por favor, Ingrese la remuneración por hora!</span>}
                    </div>
                </div>
                <div className="control">
                    <label className="label is-small">NIVEL</label>
                    <div class="select">
                        <select {...register("nivel_educativo", { required: true })} className="input is-small">
                           
                        </select>


                        {errors.nivel_educativo && <span>¡Por favor, Seleccione el nivel educativo en el uqe dicta clase el profesor!</span>}
                    </div>
                </div>


            </div>
            


        </>
    )
}

export default ContratoProfesor;