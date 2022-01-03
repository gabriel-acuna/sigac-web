import { useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { changePassword } from '../../store/user'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import AlertModal from '../AlertModal'

let ChangePassword = (props) => {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const [errorResponse, setErrorResponse] = useState(null)
    const [response, setResponse] = useState(null)
    const dispatch = useDispatch()

    let postHandler = (data) => {
        dispatch(
            changePassword(data)
        ).unwrap()
            .then((resp) => {
                if (resp?.type === 'success') {
                    reset({
                        current_pass: '',
                        pass1: '',
                        pass2: ''
                    })
                    
                }
                setResponse(resp)
                
            })
            .catch((err)=>setErrorResponse(err)
            )


    }
    return (
        <>
            <div className="columns is-centered">

                <div className="column is-4 mt-3">
                    <div className="panel">
                        <p className="panel-heading"> <span className="icon" style={{ cursor: 'pointer' }}
                            onClick={() => {
                                navigate(-1)

                            }}>

                            <IoIosArrowBack />


                        </span>Cambiar contraseña</p>

                        <div className="block-panel mt-4">

                            <form className='field mt-4' onSubmit={handleSubmit(postHandler)}>
                                <div className="columns is-centered is-multiline">
                                    <div className="column is-8 mx-3">
                                        <label className="label has-text-info is-small">Contraseña anterior</label>
                                        {errors.current_pass && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese la contraseña actual!</span>}

                                        <input type="password" className="input"{...register("current_pass", { required: true })} />
                                    </div>


                                    <div className="column is-8 mx-3">
                                        <label className="label has-text-info is-small">Nueva contraseña</label>
                                        {errors.pass1 && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese la nueva contraseña!</span>}

                                        <input type="password" className="input" {...register("pass1", { required: true })} />
                                    </div>

                                    <div className="column is-8 mx-3">
                                        <label className="label has-text-info is-small">Repita la nueva contraseña</label>
                                        {errors.pass2 && <span className="has-text-danger is-size-7 has-background-danger-light p3">¡Por favor, ingrese la nueva contraseña!</span>}
                                        <input type="password" className="input" {...register("pass2", { required: true })} />
                                    </div>
                                </div>
                                <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
                                    <div className="control hast-text-centered mb-3">
                                        <button type="button" className="button is-danger is-small mx-3"> Cancelar </button>
                                        <button type="submit" className="button is-success is-small mx-3" >Guardar</button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

            {
                response?.type && <AlertModal type={response.type} message={response.content}>
                    <button className="delete" aria-label="close" onClick={() => setResponse(null)}></button>
                </AlertModal>
            }
            {
                errorResponse?.message && <AlertModal type={'danger'} message={errorResponse.message}>
                    <button className="delete" aria-label="close" onClick={() => setErrorResponse(null)}></button>
                </AlertModal>
            }
        </>
    )
}
export default ChangePassword