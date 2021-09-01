import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { postTiposEscalafonesNombramientos } from '../../../../store/core/tiposEscalafones'
import Alert from '../../../Alert'
import { logOut } from '../../../../store/user'


let RegistrarTipoEscalafon = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)


    let onSubmit = (data) => {

        dispatch(
            postTiposEscalafonesNombramientos(
                { escalafon_nombramiento: data.tipoEscalafon.toUpperCase() }
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
                        <label className="label is-small">Tipo escalafón</label>
                        <div className="control">
                            <input type="text" {...register("tipoEscalafon", { required: true })} className="input is-samll is-uppercase" />
                            {errors.tipoEscalafon && <span className="has-text-danger">¡Por favor, Ingrese el tipo escalafón!</span>}
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

export default RegistrarTipoEscalafon;