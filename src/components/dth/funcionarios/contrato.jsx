import React from 'react';
import { useForm } from 'react-hook-form';

let ContratoFuncionario = ({objeto}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    return (


        <>

                <div className="field is-grouped">
                <p className="control">
                    <label className="label is-small">TIPO FUNCIONARIO</label>
                    <div className="select">
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
                    <div className="select">
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
                    <div className="select">
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
            </div>
            <div className="field is-grouped">

                <p className="control">
                    <label className="label is-small">PUESTO JERARQUICO SUPERIOR</label>
                    <div className="select">
                        <select {...register("puesto_jerarquico", { required: true })} className="input is-small">
                            <option value="SI">SI</option>
                            <option value="NO">NO</option>

                        </select>


                        {errors.puesto_jerarquico && <span>¡Por favor, Seleccione una opción!</span>}
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
       
        </>

    )
}

export default ContratoFuncionario;