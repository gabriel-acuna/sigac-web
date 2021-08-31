import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { putDiscapacidades, loadDiscapacidad } from '../../../../store/core/discapacidades'
import Alert from '../../../Alert'
import { useEffect } from 'react'

let EditarDiscapacidad = (props) => {
    
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)
   
    

    
    useEffect(
        ()=>{
            dispatch(
                loadDiscapacidad(id)  
            )
            .then((resp) => {
                
                reset({
                    discapacidad: resp.payload.discapacidad
                })
            })
            .catch(err=>console.log(err))
        },[id, dispatch, reset]
    )

    let onSubmit = (data) => {
        
        console.log(data);
        dispatch(
            putDiscapacidades(
                {
                    id,
                    discapacidad: data.discapacidad.toUpperCase()
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
                        <label className="label is-small">Discapacidad</label>
                        <div className="control">
                           
                            
                            <input type="text" {...register("discapacidad", { required: true })} className="input is-samll is-uppercase" />

                            {errors.discapacidad && <span className="has-text-danger">¡Por favor, Ingrese la discapacidad!</span>}
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

export default EditarDiscapacidad;