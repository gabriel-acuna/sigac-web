import { useForm } from "react-hook-form";
import logo from '../../logo-ies.png';
import fondo from '../../assets/fondo.png';
import cp_logo from '../../assets/undraw_control_panel1_20gm.png'
import { useDispatch, useSelector } from 'react-redux';
import { signIn, logOut } from '../../store/user';
import { useState } from "react";
import Alert from "../Alert";
import isValid from "../../services/auth";
import { useEffect } from "react"
import { HiOutlineMail, HiOutlineKey } from "react-icons/hi"


let Login = () => {

    const estilos = {

        width: '320px',
        height: 'auto',
        margin: "100px auto auto",
    }

    let dispatch = useDispatch()


    const { register, handleSubmit, formState: { errors } } = useForm()

    const [error, setError] = useState(null);
    let user = useSelector(state => state.user.user)

    useEffect(
        () => {
            if (user)
                if (!isValid(user.jwt))
                    dispatch(
                        logOut()
                    )


        }, [user, dispatch]
    )

    let onSubmit = (data) => {


        dispatch(
            signIn({
                credentials: data
            })
        ).unwrap()
            .catch((err) => {
                if (err.message.includes("undefined (reading 'data')")) { 
                    console.error("No hay conexión con el backend");
                    setError({'message':'No es posible estrablecer conexión, intente mas tarde.'})
                 }
                else { setError(err) }


            })




    };

    return (
        <div className="columns">

            <div className="column" style={{
            backgroundImage:`url(${fondo})`,
            backgroundPosition:'center',
            backgroundSize:'cover',
            backgroundRpeat: 'no-repeat',
           }}>
                <div className="box" style={estilos}>
                    <div className="has-text-centered">
                        <figure>
                            <img src={logo} style={{ height: '150px' }} alt="logo UNESUM"></img>
                        </figure>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="field mb-6">
                        <label className="label">Email</label>
                        <div className="control has-icons-left">
                            <span className="icon is-left">
                                <HiOutlineMail />
                            </span>
                            <input  {...register("email", { required: true })} className="input" placeholder="example@unesum.edu.ec" />
                            {errors.email && <span className="has-text-danger">¡Por favor, Ingrese su correo electrónico</span>}
                        </div>
                        <label className="label">Contraseña</label>
                        <div className="control has-icons-left">
                            <span className="icon is-left">
                                <HiOutlineKey/>
                            </span>
                            <input type="password" {...register("password", { required: true })} className="input" />

                            {errors.password && <span className="has-text-danger">¡Por favor, Ingrese su contraseña</span>}
                        </div>

                        <button type="submit" className="button is-success mt-2 is-pulled-right">Iniciar sesión</button>
                        {
                            error && <Alert type={'is-danger is-light'}
                                content={error.message}
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