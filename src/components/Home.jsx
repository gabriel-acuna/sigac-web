import { Fragment, useState } from "react";
import Alert from "./Alert";
import Spinner from './Spinner'
import { useNavigate} from 'react-router-dom'

let Home = (props) => {
    
    const navigate = useNavigate()
    let redirigir = (rol)=>{
        if (rol)
             if (rol.toLowerCase().includes('admin')){
                navigate('/admin')
             }
    }
    return (
        <Fragment>
            <div className="container">
                {props.child}

                
                <div style={{ display: 'flex', justifyContent:'center'}}>
                   

                    <div className="field mt-4">
                        <label className="label">Roles asignados</label>
                        <div className="select" onChange={ event=> redirigir(event.target.value)}>
                            <select>
                                <option></option>
                                {
                                    props.roles.map(
                                        (rol, index) =>
                                        (
                                            <option value={rol} key={index+1}>{rol}</option>
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