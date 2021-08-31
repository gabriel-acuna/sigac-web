import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { postNacionalidades } from '../../../../store/core/nacionalidades'
import Alert from '../../../Alert'


let RegistrarNacionalidad = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)


    let onSubmit = (data) => {

        dispatch(
            postNacionalidades(
                { nacionalidad: data.nacionalidad.toUpperCase() }
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

export default RegistrarNacionalidad;