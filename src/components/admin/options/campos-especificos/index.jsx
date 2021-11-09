import ReactDatatable from '@yun548/bulma-react-datatable'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadCamposEspecificosPorCampoAmplio, clearData, deleteCamposEspecificos, putCamposEspecificos, postCamposEspecificos } from '../../../../store/core/campoEspecifico'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { HiViewList} from 'react-icons/hi'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modal'


let ListadoCamposEstudiosEspecificos = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let location = useLocation()

    useEffect(
        () => {
            dispatch(
                loadCamposEspecificosPorCampoAmplio(location.state.id)
            ).unwrap()
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch, location.state.id]
    )

    const columns = [
        { key: 'codigo', text: 'Código', sortable: true },
        { key: 'nombre', text: 'Nombre', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    let camposEspecificosState = useSelector(state => state.camposEspecificos.data.campos)

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(null)
    const [objeto, setObjeto] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let doDelete = () => {
        dispatch(
            deleteCamposEspecificos(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadCamposEspecificosPorCampoAmplio(location.state.id)
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = camposEspecificosState.map(
        (row) => {
            return {
                id: row.id,
                codigo: row.codigo,
                nombre: row.descripcion,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}.`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <Link to="detallados" key={`${row.id}*`} className="button is-small mx-2 is-info is-outlined" state={row}><span className="icon"><HiViewList /></span></Link>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}+`}  onClick={() => {
                        deleteHandler(row.id)
                    }}>
                        <span className="icon">
                            <AiOutlineDelete />
                        </span>
                    </button>
                ]
            }
        }
    )


    let postHandler = (data) => {

        dispatch(
            postCamposEspecificos(
                {
                    descripcion: data.descripcion,
                    codigo: data.codigo,
                    campo_amplio: location.state.id
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message === "Cannot read property 'data' of undefined") {
                        console.error("No hay conexión con el backend");

                    } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )

    }


    let putHandler = (data) => {


        dispatch(
            putCamposEspecificos(
                
                {
                    id: objeto.id,
                    descripcion: data.descripcion,
                    codigo: data.codigo.toUpperCase(),
                    campo_amplio: location.state.id,
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.message.includes("undefined (reading 'data')")) { 
                    console.error("No hay conexión con el backend");
                    setError({'message':'No es posible establecer conexión, intente mas tarde.'})
                 } else if (err.message === "Rejected") {
                        dispatch(
                            logOut()
                        )
                    }

                    else { setError(err) }
                }
            )

    }
    return (

        <div className="conatiner">
            <div className="columns is-centered">
                <div className="column is-half">
                    <button className="button is-info mt-4 mx-3 is-outlined"
                        onClick={() => {
                            navigate(-1);
                            dispatch(clearData())
                        }}>
                        <span className="icon">
                            <IoIosArrowBack />
                        </span>
                    </button>

                    <button className="button  is-success mt-4 is-outlined" onClick={ev => setShowModalForm(true)}>
                        <span className="icon">
                            <IoIosAddCircleOutline />
                        </span>
                    </button>
                </div>
                {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                    <button className="delete" onClick={() => setResponse(null)}></button>
                </Alert>}
            </div>
            <div className="columns is-centered">


                <div className="column is-half mb-6">
                <span> Campo Amplio: {location.state.descripcion}</span>
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
                                length_menu: "Mostrar _MENU_ campos de estudio por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay campos de estudio  registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ campos de estudio especifico",
                                pagination: {
                                    first: "Primera",
                                    previous: "Anterior",
                                    next: "Siguiente",
                                    last: "Ultima"
                                },
                                loading_text: "cargando ..."
                            }
                            
                        }}
                        records={rows}
                        columns={columns}
                        loading ={ camposEspecificosState.length === 0}
                    />
                </div>
            </div>
            {
                showModal &&
                <ConfirmDialog info="el campo de estudio" title="Eliminar el campo de estudio específico">

                    <button className="button is-small is-danger is-pulled-left" onClick={() => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar campo de estudio específico' : 'Registrar campo de estudio específico'}  objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={() => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={() => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadCamposEspecificosPorCampoAmplio(location.state.id)
                            )
                        }}></button>
                    </Alert>}
                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={() => setError(null)}></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ModalForm>
            }
        </div >
    )
}

export default ListadoCamposEstudiosEspecificos;
