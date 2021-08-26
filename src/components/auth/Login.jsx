import { useForm } from "react-hook-form";
import logo from '../../logo-ies.png';
import cp_logo from '../../assets/undraw_control_panel1_20gm.png';
import { useDispatch, useSelector, selectError } from 'react-redux';
import { signIn } from '../../store/user';
import { useNavigate } from 'react-router';
import { useState } from "react";
import Alert from "../Alert";


let Login = () => {

    const estilos = {

        width: '300px',
        height: 'auto',
        margin: "100px auto auto",
    }

    let distpach = useDispatch()

    let navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    const [error, setError] = useState(null);

    let onSubmit = (data) => {


        distpach(
            signIn({
                credentials: data
            })
        ).unwrap()
        .then(
            navigate('/')
        )
        .catch((error) => setError(error.message))




    };

    return (
        <div className="columns">

            <div className="column" style={{ background: 'linear-gradient(-90deg, #019c67, #888)' }}>
                <div className="box is-primary" style={estilos}>
                    <div className="has-text-centered">
                        <figure>
                            <img src={logo} style={{ height: '150px' }} alt="logo UNESUM"></img>
                        </figure>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input  {...register("email", { required: true })} className="input" />
                            {errors.email && <span className="has-text-danger">¡Por favor, Ingrese su correo electrónico</span>}
                        </div>
                        <label className="label">Contraseña</label>
                        <div className="control">
                            <input type="password" {...register("password", { required: true })} className="input" />

                            {errors.password && <span className="has-text-danger">¡Por favor, Ingrese su contraseña</span>}
                        </div>

                        <button type="submit" className="button is-success">Send</button>
                        {
                            error && <Alert type={'is-danger is-light'}
                                content={error}
                            >
                                <button className="delete" onClick={event => setError(null)}></button>
                            </Alert>
                        }
                    </form>


                </div>
            </div>
            <div className="column">
                <figure>
                    <img src={cp_logo} alt="control panel logo" />
                </figure>
            </div>

        </div>
    )
}

export default Login;