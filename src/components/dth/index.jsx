import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import ReactDatatable from '@yun548/bulma-react-datatable'
import { useDispatch, useSelector } from 'react-redux';
import { loadInformacionPersonal, loadPersona, postInformacionPersonal , putInformacionPersonal} from '../../store/dth/informacion_personal'
import { IoPersonAddOutline } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
import { VscFileSubmodule } from 'react-icons/vsc'
import RegistarPersona from './nuevo'
import Alert from '../Alert';
import { logOut} from '../../store/user'
import { reset } from 'react-hook-form' 


let DTH = (props) => {

    let dispatch = useDispatch()

    const [showRegistarPersona, setShowRegistrarPersona] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)


    useEffect(
        () => {
            dispatch(
                loadInformacionPersonal()
            ).unwrap()
                .catch(
                    (err) => console.error(err)
                )

        }, [dispatch]
    )
    let informacionPersonalState = useSelector(
        state => state.informacionPersonal.data.personal
    )
    const columns = [
        { key: 'identificacion', text: 'Doc. Id.', sortable: true },
        { key: 'apellidos', text: 'Apellidos', sortable: true },
        { key: 'nombres', text: 'Nombres', sortable: true },
        { key: 'correo_institucional', text: 'Correo institucional', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]
    let rows = informacionPersonalState.map(
        (row, index) => {
            return {
                identificacion: row.identificacion,
                apellidos: `${row.primer_apellido} ${row.segundo_apellido}`,
                nombres: `${row.primer_nombre} ${row.segundo_nombre}`,
                correo_institucional: row.correo_institucional,
                opciones: [
                    <button className="button is-primary is-outlined  mx-2" key={`${row.id}0`} onClick={ev=>{
                        setPersona(row)
                        setShowRegistrarPersona(true)
                    }}>
                        <span className="icon is-small">
                            <FaRegEdit/>
                        </span>
                    </button>,
                    <button className="button is-info is-outlined mx-2" key={`${row.id}1`}> 
                        <span className="icon is-small">
                            <VscFileSubmodule/>
                        </span>
                    </button>

                ]
            }
        }
    )
    const postHandler = (data) => {
        dispatch(
            postInformacionPersonal(data)
        ).unwrap()
            .then(
                resp => {
                    setResponse(resp)
                }
            ).catch(
                (err) => {
                    if (err.messsage === "Cannot read property 'data' of undefined") {
                        console.error("No hay conexión con el backend");

                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()

                        )
                    }

                    else { setError(err) }
                }
            )
    };
    const putHandler = (data) => {
        let params = {
            id: persona.identificacion,
            datosPersonales: data
        }
        dispatch(
            putInformacionPersonal( params)
        ).unwrap()
            .then(
                resp => {
                    setResponse(resp)
                }
            ).catch(
                (err) => {
                    if (err.messsage === "Cannot read property 'data' of undefined") {
                        console.error("No hay conexión con el backend");

                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()

                        )
                    }

                    else { setError(err) }
                }
            )
    };
    const [persona, setPersona] = useState(null);
    
    
    return (
        <>
            <div className="container">

                <div className="columns is-centered">
                    <div className="column is-half mt-4">
                        <button className="button is-primary is-outlined mx-3" onClick={ev => setShowRegistrarPersona(true)}>
                            <span className="icon is-small">
                                <IoPersonAddOutline />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="columns is-centered">
                    <div className="column mt-4" style={{ overflowX: "scroll" }}>
                        <ReactDatatable style={{ justifyContent: 'center' }}
                            className="table is-bordered is-striped"
                            tHeadClassName="is-info"
                            config={{
                                page_size: 10,
                                length_menu: [10, 20, 50],
                                show_pagination: true,
                                pagination: 'advance',
                                button: {
                                    excel: false,
                                    print: false
                                },
                                language: {
                                    length_menu: "Mostrar _MENU_ personal por página",
                                    filter: "Buscar en registros ...",
                                    no_data_text: "No hay personal registrado",
                                    info: "Mostrando _START_ a _END_ de _TOTAL_ personal",
                                    pagination: {
                                        first: "Primera",
                                        previous: "Anterior",
                                        next: "Siguiente",
                                        last: "Ultima"
                                    }
                                }
                            }}
                            records={rows}
                            columns={columns}
                        />
                    </div>
                </div>
            </div>
            {showRegistarPersona &&
                <RegistarPersona title={ persona !== null ? "Editar personal":"Registrar personal"} handler={persona !== null? putHandler:postHandler} person={persona}>
                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={event => setError(null)}></button>
                    </Alert>}
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setShowRegistrarPersona(false)
                            dispatch(
                                loadInformacionPersonal()
                            )
                            }}></button>
                    </Alert>}

                    <button className="button is-small is-danger mx-3" onClick={ev => setShowRegistrarPersona(false)}>Cancelar</button>

                </RegistarPersona>}
        </>
    )
}

export default DTH;