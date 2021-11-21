import { useEffect, useState } from 'react';
import ReactDatatable from '@yun548/bulma-react-datatable'
import { useDispatch, useSelector } from 'react-redux';
import { loadInformacionPersonal, postInformacionPersonal, putInformacionPersonal, deleteInformacionPersonal } from '../../store/dth/informacion_personal'
import { IoPersonAddOutline } from 'react-icons/io5'
import { FaRegEdit } from 'react-icons/fa'
import { VscFileSubmodule } from 'react-icons/vsc'
import RegistarPersona from './nuevo'
import Alert from '../Alert';
import { logOut } from '../../store/user'
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai'
import ConfirmDialog from '../ConfirmDialog'



let DTH = (props) => {

    let dispatch = useDispatch()

    const [showRegistarPersona, setShowRegistrarPersona] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [respShowConfirmDialog, setRespShowConfirmDialog] = useState(null)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [id, setId] = useState(null)




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

    const doDelete = () => {
        dispatch(
            deleteInformacionPersonal(
                id
            )
        ).unwrap()
            .then(
                (resp) => setRespShowConfirmDialog(resp)
            ).catch(
                (err) => console.error(err)
            )
    }

    const deleteHandler = (obj) => {
        setId(obj.identificacion)
        setShowConfirmDialog(true)

    }
    let informacionPersonalState = useSelector(
        state => state.informacionPersonal.data.personal
    )
    const columns = [
        { key: 'id', text: 'Doc. Id.', sortable: true },
        { key: 'apellidos', text: 'Apellidos', sortable: true },
        { key: 'nombres', text: 'Nombres', sortable: true },
        { key: 'correo_institucional', text: 'Correo institucional', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]


    let rows = informacionPersonalState.map(
        (row, index) => {
            return {
                id: row.identificacion,
                apellidos: `${row.primer_apellido} ${row.segundo_apellido}`,
                nombres: `${row.primer_nombre} ${row.segundo_nombre}`,
                correo_institucional: row.correo_institucional,
                opciones: [
                    <button className="button is-primary is-outlined  mx-2" key={`${row.identificacion}0`} onClick={ev => {
                        setPersona(row)
                        setShowRegistrarPersona(true)
                    }}>
                        <span className="icon is-small">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <Link className="button is-info is-outlined mx-2" key={`${row.identificacion}1`} to='/dth/expediente' state={row}>
                        <span className="icon is-small">
                            <VscFileSubmodule />
                        </span>
                    </Link>,
                    <button className="button is-danger is-outlined mx-2" key={`${row.identificacion}2`} onClick={ev => deleteHandler(row)} >
                        <span className="icon is-small">
                            <AiOutlineDelete />
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
                    console.log(err);
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
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
            putInformacionPersonal(params)
        ).unwrap()
            .then(
                resp => {
                    setResponse(resp)
                }
            ).catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) {
                        console.error("No hay conexión con el backend");
                        setError({ 'message': 'No es posible establecer conexión, intente mas tarde.' })
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
                    <div className="column  is-3">
                        {respShowConfirmDialog && respShowConfirmDialog.type === 'warning' && <Alert type={'is-warning is-light'} content={respShowConfirmDialog.content}>
                            <button className="delete" onClick={event => setRespShowConfirmDialog(null)}></button>
                        </Alert>}
                        {respShowConfirmDialog && respShowConfirmDialog.type === 'success' && <Alert type={'is-success is-light'} content={respShowConfirmDialog.content}>
                            <button className="delete" onClick={event => {
                                setRespShowConfirmDialog(null)
                                dispatch(loadInformacionPersonal())
                            }}></button>
                        </Alert>}
                    </div>
                </div>

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
                <RegistarPersona title={persona !== null ? "Editando datos personales de: " : "Registrar personal"} handler={persona !== null ? putHandler : postHandler} person={persona}>
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

                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowRegistrarPersona(false)
                        setPersona(null)
                    }}>Cancelar</button>

                </RegistarPersona>}
            {
                showConfirmDialog &&
                <ConfirmDialog info="el registro" title="Eliminar registro">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialog(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialog(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
        </>
    )
}

export default DTH;