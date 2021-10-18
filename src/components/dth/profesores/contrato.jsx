import { useSelector } from 'react-redux'
import { useEffect, useState} from 'react'
import { useDispatch } from 'react-redux'


let ContratoProfesor = ({ objeto, register, errors, relacion }) => {
    const dispatch = useDispatch()
    

    let nivelesEducativosState = useSelector(state => state.nivelesEducativos.data.nivelesEducativos)
    let tiposEscalafonesState = useSelector(state => state.tipoEscalafones.data.tipoEscalafones)
    let categoriasContratosState = useSelector(state => state.categoriasContratos.data.categoriasContrato)
    let tiemposDedicacionesState = useSelector(state => state.tiemposDedicaciones.data.tiemposDedicaciones)
    const [scaleType, setScaleType] = useState(null)

console.log(relacion);
    return (
        <>

            <div className="columns">
                <div className="column">
                    <label className="label is-small">CONTRATO RELACIONADO</label>
                    <div className="control">
                        <input  {...register("contrato_relacionado")} className="input is-small" />

                        {errors.contrato_relacionado && <span>¡Por favor, Ingrese el número de documento!</span>}
                    </div>
                </div>
                <div className="column">
                    <div className="control">
                        <label className="label is-small">TIPO ESCALAFON</label>
                        {errors.tipo_escalafon && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de escalafón!</span>}
                    </div>
                    <div className="select">
                        <select  {...register("tipo_escalafon", { required: true })} className="input is-small"  onChange={
                            ev=>setScaleType(ev.target.options[ev.target.selectedIndex].text)
                        }>
                            <option> </option>
                            {
                              relacion ==='NOMBRAMIENTO' ? tiposEscalafonesState.map(

                                    (row) => (
                                        row.escalafon_nombramiento !== 'NO APLICA' && <option key={row.id} value={row.id}> {row.escalafon_nombramiento}</option>
                                    )
                                ): relacion !== null && relacion !== '' && tiposEscalafonesState.map(
                                    (row) => (
                                        row.escalafon_nombramiento === 'NO APLICA' &&  <option key={row.id} value={row.id}> {row.escalafon_nombramiento}</option>
                                    )
                                )
                            }
                        </select>

                    </div>
                </div>

                <div className="column">
                    <div className="control">
                        <label className="label is-small">CATEGORIA</label>
                        {errors.categoria && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la categoria contrato!</span>}
                    </div>
                    <div className="select">
                        <select  {...register("categoria", { required: true })} className="input is-small" >
                            <option> </option>
                            {
                               relacion ==='NOMBRAMIENTO' && scaleType ==='LABORAL PREVIO' ? categoriasContratosState.map(
                                    (row) => (
                                        row.categoria_contrato.includes('TITULAR') &&<option key={row.id} value={row.id}> {row.categoria_contrato}</option>
                                    )
                                ):
                                relacion ==='NOMBRAMIENTO' && scaleType ==='LABORAL ACTUAL' ?
                                        categoriasContratosState.map(
                                            (row) =>(
                                                (row.categoria_contrato.startsWith('PRINCIPAL')
                                                || row.categoria_contrato.startsWith('AGREGADO')
                                                || row.categoria_contrato.startsWith('AUXILIAR'))
                                                && <option key={row.id} value={row.id}> {row.categoria_contrato}</option>
                                            )
                                        ):
                                scaleType !== null && scaleType!== '' && categoriasContratosState.map(
                                    (row) =>(
                                        (row.categoria_contrato.startsWith('OCASIONAL')
                                        || row.categoria_contrato.startsWith('HONORARIO')
                                        || row.categoria_contrato.startsWith('INVITADO')
                                        || row.categoria_contrato.startsWith('NO TITULAR'))
                                        && <option key={row.id} value={row.id}> {row.categoria_contrato}</option>
                                    )
                                )
                            }
                        </select>

                    </div>
                </div>


            </div>


            <div className="columns">
                <div className="column">
                    <div className="control">
                        <label className="label is-small">NIVEL</label>
                        {errors.nivel && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el nivel educativo en el que dicta clase el profesor!</span>}
                    </div>

                    <div className="select">
                        <select {...register("nivel", { required: true })} className="input is-small">
                            <option> </option>
                            {
                                nivelesEducativosState.map(
                                    (row) => (
                                        <option key={row.id} value={row.id}> {row.nivel}</option>
                                    )
                                )
                            }

                        </select>

                    </div>

                </div>
                <div className="column">
                    <div className="control">
                        <label className="label is-small">TIEMPO DEDICACION</label>
                        {errors.tiempo_dedicacion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el timepo de decicación!</span>}
                    </div>
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

                    </div>
                </div>
                <div className="column">
                    <div className="control">
                        <label className="label is-small">
                            REMUNERACION HORA
                        </label>
                        {errors.remuneracion_hora && <span>¡Por favor, Ingrese la remuneración por hora!</span>}
                    </div>
                    <div className="control">
                        <input type="text" {...register("remuneracion_hora")} className="input is-small" />

                    </div>
                </div>



            </div>



        </>
    )
}

export default ContratoProfesor;