import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { putTiposFuncionarios, loadTipoFuncionario } from '../../../../store/core/tiposFuncionarios'
import Alert from '../../../Alert'
import { useEffect } from 'react'
import { logOut } from '../../../../store/user'

let EditarTipoFuncionario = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)




    useEffect(
        () => {
            dispatch(
                loadTipoFuncionario(id)
            )
                .then((resp) => {

                    reset({
                        tipoFuncionario: resp.payload.tipo
                    })
                })
                .catch(err => console.log(err))
        }, [id, dispatch, reset]
    )

    let onSubmit = (data) => {

        
        dispatch(
            putTiposFuncionarios(
                {
                    id,
                    tipo: data.tipoFuncionario.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.messsage === "Cannot read property 'data' of undefined") {
                        console.error("No hay conexión con el backend");
                        
                    }else if(err.message==="Rejected"){
                        dispatch(
                            logOut()
                
                        )
                    }

                    else { setError(err) }
                }
            )

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="box mt-4 px-2">
                <button className="button is-small is-info mt-2 ml-3" onClick={event => navigate(-1)}>Regresar</button>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label is-small">Tipo funcionario</label>
                        <div className="control">


                            <input type="text" {...register("tipoFuncionario", { required: true })} className="input is-samll is-uppercase" />

                            {errors.tipoFuncionario && <span className="has-text-danger">¡Por favor, Ingrese el tipo funcionario!</span>}
                            {
                                error && <Alert type={'is-danger is-light'} content={error.message}>
                                    <button className="delete" onClick={event => setError(null)}></button>
                                </Alert>
                            }
                            {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                                <button className="delete" onClick={event => setResponse(null)}></button>
                            </Alert>}
                            {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                                <button className="delete" onClick={event => setResponse(null)}></button>
                            </Alert>}

                        </div>
                    </div>
                    <div className="control is-pulled-right">
                        <button type="submit" className="button is-success is-small"> Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditarTipoFuncionario;