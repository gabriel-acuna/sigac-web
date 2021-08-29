import { FcSettings, FcHome, FcRight } from 'react-icons/fc'
import { Link } from 'react-router-dom'
import {  useDispatch , useSelector} from 'react-redux'
import { logOut} from '../store/user'

let NavBar = (props) => {

    let distpach = useDispatch();
    let user = useSelector(state => state.user.user.userInfo)
    
    let doLogOut = ()=>{
        distpach(
            logOut()
        )
    }
    return (
        <nav className="navbar is-primary" style={{ background: 'linear-gradient(-90deg, #888,#48c78e)' }}>
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <span className="mr-2">
                        <FcHome />
                    </span>
                    Inicio
                </Link>
            </div>



            <div className="navbar-item has-dropdown is-hoverable">
                <span className="navbar-link has-text-weight-bold">
                    Hola, { user.nombre} { user.apellido}

                </span>
                <div className="navbar-dropdown is-boxed">
                    <Link className="navbar-item" to="/change-password" >
                        <span className="mr-2">
                            <FcSettings />
                        </span>
                        Cambiar contraseña
                    </Link>
                    <a className="navbar-item" onClick={ event=>doLogOut()}>
                        <span className="mr-2"> <FcRight /></span>
                        Cerrar sesión
                    </a>

                </div>



            </div>





        </nav >
    )
}

export default NavBar;