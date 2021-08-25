import { FcSettings, FcHome, FcRight } from 'react-icons/fc'
import { Link } from 'react-router-dom'


let NavBar = (props) => {

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
                    Hola,

                </span>
                <div className="navbar-dropdown is-boxed">
                    <Link className="navbar-item" to="/change-password" >
                        <span className="mr-2">
                            <FcSettings />
                        </span>
                        Cambiar contraseña
                    </Link>
                    <Link className="navbar-item"  to="/">
                        <span className="mr-2"> <FcRight /></span>
                        Cerrar sesión
                    </Link>

                </div>



            </div>





        </nav >
    )
}

export default NavBar;