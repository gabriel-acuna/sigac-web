import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { loadPersonaEmail } from '../store/dth/informacion_personal'
import { useDispatch } from 'react-redux'

let Home = ({ email, roles, child }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        dispatch(loadPersonaEmail(email)).unwrap()
        .then(
            resp=>setCurrentUser(resp)
        )
    }, [currentUser])
    let redirigir = (rol) => {
        if (rol)
            if (rol.toLowerCase().includes('admin')) {
                navigate('/admin')
            }
    }
    return (
        <Fragment>
            <div className="container">
                {child}

                <div className="columns is-centered is-multiline">
                    <div className="column is-half mt-3">
                        <div className=" panel is-info">
                            <p className="panel-heading is-size-6">
                                {/* <span className="icon" style={{ cursor: 'pointer' }}
                                    onClick={event => {

                                        navigate(-1)

                                    }}>

                                    <IoIosArrowBack />


                                </span> */}
                                Datos personales </p>
                            <div className="panel-block has-background-info-light">
                                {currentUser &&
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', padding: '20px' }}>

                                        <div>
                                            <span className="has-text-weight-medium">Nombres: </span> {currentUser.primer_nombre} {currentUser.segundo_nombre}
                                        </div>
                                        <div >
                                            <span className="has-text-weight-medium">Apellidos: </span> {currentUser.primer_apellido} {currentUser.segundo_apellido}
                                        </div>

                                        <div><span className="has-text-weight-medium">Edad: </span> {currentUser?.edad.años}  años </div>
                                        <div><span className="has-text-weight-medium">Estado civil: </span> {currentUser.estado_civil.estado_civil}</div>
                                        <div><span className="has-text-weight-medium">Teléfono movil: </span> {currentUser.telefono_movil}</div>
                                        <div><span className="has-text-weight-medium">Correo: </span> {currentUser.correo_personal}</div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>


                    <div className="field mt-4">
                        <label className="label">Roles asignados</label>
                        <div className="select" onChange={event => redirigir(event.target.value)}>
                            <select>
                                <option></option>
                                {
                                    roles && roles.map(
                                        (rol, index) =>
                                        (
                                            <option value={rol} key={index + 1}>{rol}</option>
                                        )

                                    )
                                }
                            </select>
                        </div>
                        <p className="help">Seleccione el rol con el que desea interactuar</p>
                    </div>
                </div>

            </div>
        </Fragment>

    )
}

export default Home;