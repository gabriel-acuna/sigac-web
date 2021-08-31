import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { putNacionalidades, loadNacionalidad } from '../../../../store/core/nacionalidades'
import Alert from '../../../Alert'
import { useEffect } from 'react'

let EditarNacionalidad = (props) => {
    
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)
    
    

    
    useEffect(
        ()=>{
            dispatch(
                loadNacionalidad(id)  
            )
            .then((resp) => {
                
                reset({
                    nacionalidad: resp.payload.nacionalidad
                })
            })
            .catch(err=>console.log(err))
        },[id, dispatch, reset]
    )

    let onSubmit = (data) => {
        
        console.log(data);
        dispatch(
            putNacionalidades(
                {
                    id,
                    nacionalidad: data.nacionalidad.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => { setError(err); }
            )
       
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="box mt-4 px-2">
                <button className="button is-small is-info mt-2 ml-3" onClick={event => navigate(-1)}>Regresar</button>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label is-small">Nacionalidad</label>
                        <div className="control">
                           
                            
                            <input type="text" {...register("nacionalidad", { required: true })} className="input is-samll is-uppercase" />

                            {errors.nacionalidad && <span className="has-text-danger">¡Por favor, Ingrese la nacionalidad!</span>}
                            {error && <span className="has-text-danger">{error.message}</span>}
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

export default EditarNacionalidad;