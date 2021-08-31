import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { putEtnias, loadEtnia } from '../../../../store/core/etnias'
import Alert from '../../../Alert'
import { useEffect } from 'react'
let EditarEtnia = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)
    
    

    
    useEffect(
        ()=>{
            dispatch(
                loadEtnia(id)  
            )
            .then((resp) => {
                
                reset({
                    etnia: resp.payload.etnia
                })
            })
            .catch(err=>console.log(err))
        },[id, dispatch, reset]
    )

    let onSubmit = (data) => {
        
        console.log(data);
        dispatch(
            putEtnias(
                {
                    id,
                    etnia: data.etnia.toUpperCase()
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
                        <label className="label is-small">Etnia</label>
                        <div className="control">
                           
                            
                            <input type="text" {...register("etnia", { required: true })} className="input is-samll is-uppercase" />

                            {errors.etnia && <span className="has-text-danger">¡Por favor, Ingrese la etnia!</span>}
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

export default EditarEtnia;