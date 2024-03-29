import React from 'react';
import { useNavigate, Link } from 'react-router-dom'

let Profesores = (props) => {
    
    const navigate = useNavigate();

    return (
     
    
        <div className="container">
            <button  className="button is-small is-info mt-4" onClick={event => navigate(-1)}>Regresar</button>
            <Link  className="button is-small is-primary mt-4 mx-2" to="/dth/profesores/nuevo">Registrar profesor</Link>
            <div className="mt-2 table-container">
                <table className="table is-bordered is-striped is-hoverable is-size-7">
                    <thead>
                        <tr>
                            <th>Tipo Identificacación</th>
                            <th>Identificación</th>
                            <th>Primer Apellido</th>
                            <th>Segundo Apellido</th>
                            <th>Nombres</th>
                            <th>Email Institucional</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>CEDULA</td>
                            <td>1314056407</td>
                            <td>Acuña</td>
                            <td>Regalado</td>
                            <td>Gabriel Stefano</td>
                            <td>gabriel.acuna@unesum.edu.ec</td>
                            <td>
                                <button className="is-small mx-2">Editar</button>
                                <Link className="is-small mx-2" to={`/dth/profesor-contrato/${1314056407}`}>Agregar información contractual</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Profesores;