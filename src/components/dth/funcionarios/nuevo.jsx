import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'


let RegistarFuncionario = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();


    return (
        <div style={{ display:'flex', justifyContent: 'center'}}>

            <div className="box mt-4 px-2">

                <button className="button is-small is-info mt-2 ml-3" onClick={event => navigate(-1)}>Regresar</button>
                <form className="mt-4">
                    <div className="field is-grouped">
                        <p className="control">
                            <label className="label is-small">CODIGO IES</label>
                            <div className="control">
                                <input  {...register("codigo_ies", { required: true })} className="input is-small" value="1025" />
                                {errors.codigo_ies && <span>¡Por favor, Ingrese el códigode la IES</span>}
                            </div>
                        </p>
                        <p className="control">
                            <label className="label is-small">CODIGO MATRIZ</label>
                            <div className="control">
                                <input  {...register("codigo_matriz", { required: true })} className="input is-small" />
                                {errors.codigo_matriz && <span>¡Por favor, Ingrese el código de matriz</span>}
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
                            <label className="label is-small">NOMBRES</label>
                            <div className="control">
                                <input  {...register("nombres", { required: true })} className="input is-small" />

                                {errors.nombres && <span>¡Por favor, Ingrese los nombres</span>}
                            </div>
                        </p>

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
                    </div>
                    <div className="field is-grouped">
                        <p className="control">
                            <label className="label is-small">FECHA NACIMIENTO</label>
                            <div className="control">
                                <input type="date" {...register("fecha_nacimiento", { required: true })} className="input is-small" />

                                {errors.fecha_nacimiento && <span>¡Por favor, Ingrese la fecha de nacimiento</span>}
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
                                {errors.sexo && <span>¡Por favor, Seleccione laautoidentificación étnica</span>}
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
                            <label className="label is-small">DIRECCION</label>
                            <div className="control">
                                <input  {...register("direccion", { required: true })} className="input is-small" />
                                {errors.direccion && <span>¡Por favor, Ingrese su correo electrónico</span>}
                            </div>
                        </p>
                    </div>

                    <div className="field is-grouped">
                        <p className="control">
                            <label className="label is-small">EMAIL PERSONAL</label>
                            <div className="control">
                                <input  {...register("email_personal", { required: true })} className="input is-small" value="1025" />
                                {errors.codigo_ies && <span>¡Por favor, Ingrese el email personal</span>}
                            </div>
                        </p>
                        <p className="control">
                            <label className="label is-small">EMAIL INSTITUCIONAL</label>
                            <div className="control">
                                <input  {...register("email_institucional", { required: true })} className="input is-small" />
                                {errors.codigo_matriz && <span>¡Por favor, Ingrese el email institucional</span>}
                            </div>
                        </p>
                    </div>
                    <div className="control">
                        <button type="submit" className="button is-success is-small">Guardar</button>
                    </div>
                </form>

            </div>

        </div>
    )
}

export default RegistarFuncionario