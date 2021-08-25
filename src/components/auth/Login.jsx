import { useForm } from "react-hook-form";
import logo from '../../logo-ies.png';
import cp_logo from '../../assets/undraw_control_panel1_20gm.png';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../../store/user';
import { useNavigate } from 'react-router';


let Login = () => {

    const estilos = {

        width: '300px',
        height: 'auto',
        margin: "100px auto auto",
    }

    let distpach = useDispatch()

    let navigate = useNavigate()

    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    let onSubmit = (data) => {
        distpach(
            signIn({
                credentials: data
            })

        )
        navigate("/")
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
                        <label className="label">Usuario</label>
                        <div className="control">
                            <input  {...register("correo", { required: true })} className="input" />
                            {errors.uauario && <span>¡Por favor, Ingrese su correo electrónico</span>}
                        </div>
                        <label className="label">Contraseña</label>
                        <div className="control">
                            <input type="password" {...register("clave", { required: true })} className="input" />

                            {errors.clave && <span>¡Por favor, Ingrese su contraseña</span>}
                        </div>

                        <button type="submit" className="button is-success">Send</button>
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