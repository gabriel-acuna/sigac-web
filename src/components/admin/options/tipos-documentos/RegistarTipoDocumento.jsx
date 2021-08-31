import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { postTiposDocumentos } from '../../../../store/core/tiposDocumentos'
import Alert from '../../../Alert'


let RegistrarTipoDocumento = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [response, setResponse] = useState(null)


    let onSubmit = (data) => {

        dispatch(
            postTiposDocumentos(
                { tipo_documento: data.tipoDocumento.toUpperCase() }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => { 
                    if (err.meessage ==="Cannot read property 'data' of undefined")
                        console.error("No hay conexión con el backend");
                    else setError(err)
                 }
            )

    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="box mt-4 px-2">
                <button className="button is-small is-info mt-2 ml-3" onClick={event => navigate(-1)}>Regresar</button>

                <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="field">
                        <label className="label is-small">Tipo documento</label>
                        <div className="control">
                            <input type="text" {...register("tipoDocumento", { required: true })} className="input is-samll is-uppercase" />
                            {errors.tipoDocumento && <span className="has-text-danger">¡Por favor, Ingrese la tipo documento!</span>}
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

export default RegistrarTipoDocumento;