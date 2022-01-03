import { FcSettings, FcHome, FcRight } from 'react-icons/fc'
import { CgProfile } from 'react-icons/cg'
import { ImProfile } from 'react-icons/im'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../store/user'
import { useState } from 'react'

let NavBar = (props) => {

    let distpach = useDispatch();
    let user = useSelector(state => state.user.user.userInfo)
    let [today] = useState(new Date())
    const [isActive, setisActive] = useState(false);

    let doLogOut = () => {
        distpach(
            logOut()
        )
    }
    return (
        <nav className="navbar is-light">
            <div className="navbar-brand">
                <Link className="navbar-item" to="/">
                    <span className="mr-2">
                        <FcHome />
                    </span>
                    Inicio
                </Link>
                <p className="nav-item mt-4 is-size-7 mx-4">
                    <span className='has-text-weight-medium'>Fecha: </span>
                    {today.getDate()}-{today.getMonth() < 10 && today.getMonth() > 0 ? `0${today.getMonth()}` : today.getMonth() === 0 ? '01' : today.getMonth()}-{today.getFullYear()}
                </p>
                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false"
                    data-target="navbarBasicExample" onClick={() => {
                        setisActive(!isActive);
                    }}>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>



            <div className={`navbar-menu ${isActive ? "is-active" : ""}`} id="navbarBasicExample">

                <div className="navbar-end">

                    <div className="navbar-item has-dropdown is-hoverable is-pulled-rig">
                        <span className="navbar-link has-text-weight-bold">
                            <CgProfile /> Hola, {user.nombre} {user.apellido}
                        </span>
                        <div className="navbar-dropdown is-boxed">
                            <Link className="navbar-item" to="/change-password" >
                                <span className="mr-2">
                                    <FcSettings />
                                </span>
                                Cambiar contraseña
                            </Link>
                            <Link className="navbar-item" to="/cv">
                                <span className="mr-2">
                                    <ImProfile />
                                </span>
                                CV</Link>
                            <a className="navbar-item" onClick={() => doLogOut()}>
                                <span className="mr-2"> <FcRight /></span>
                                Cerrar sesión
                            </a>

                        </div>



                    </div>
                </div>
            </div>





        </nav >
    )
}

export default NavBar;