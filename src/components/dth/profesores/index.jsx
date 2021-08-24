import React from 'react';
import { useHistory } from 'react-router-dom'

let Profesores = (props) => {
    
    const history = useHistory();
    let goBack = ()=>{
        history.goBack()
    }
    return (
        <div className="container">
            <button  className="button is-small is-info mt-4" onClick={event => goBack(event)}>Regresar</button>
            <div className="mt-2 centered">
                <table className="table is-bordered is-striped is-hoverable">
                    <thead>
                        <tr>
                            <th>Tipo Identificacación</th>
                            <th>Identificación</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Nombres</th>
                            <th>Email Institucional</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    )
}

export default Profesores;