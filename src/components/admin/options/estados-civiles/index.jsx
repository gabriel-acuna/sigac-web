import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadEstadosCiviles, clearData, deleteEstadosCiviles, postEstadoCivil, putEstadosCiviles } from '../../../../store/core/estado_civil'
import ConfirmDialog from '../../../ConfirmDialog'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modalForm'
import AlertModal from '../../../AlertModal'


let ListadoEstadosCiviles = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadEstadosCiviles()
            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'estado_civil', text: 'Estado civil', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    const [loading, setLoading] = useState(true)

    let eatdosCivilesState = useSelector(state => state.estadosCiviles.data.estadosCiviles)

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
            deleteEstadosCiviles(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadEstadosCiviles()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = eatdosCivilesState.map(
        (row, index) => {
            return {
                id: row.id,
                estado_civil: row.estado_civil,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}
                        title="Editar"
                    >
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={event => {
                        deleteHandler(row.id)
                    }}
                        title="Eliminar">
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
            postEstadoCivil(
                { estado_civil: data.estadoCivil.toUpperCase() }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
                if (resp.type === 'success') {
                    dispatch(loadEstadosCiviles())
                    setShowModalForm(false)
                }
            })
            .catch(
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

    }


    let putHandler = (data) => {


        dispatch(
            putEstadosCiviles(
                {
                    id: objeto.id,
                    estado_civil: data.estadoCivil.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadEstadosCiviles())
                    setShowModalForm(false)
                    setObjeto(null)
                }
            })
            .catch(
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

    }
    return (

        <>
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

                    <button className="button  is-success mt-4 is-outlined" onClick={() => setShowModalForm(true)}>
                        <span className="icon">
                            <IoIosAddCircleOutline />
                        </span>
                        <span>Registrar</span>
                    </button>
                </div>

            </div>
            <div className="columns is-centered">


                <div className="column is-half">
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
                                length_menu: "Mostrar _MENU_ estados civiles por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay estados civiles registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ estados civiles",
                                pagination: {
                                    first: "Primera",
                                    previous: "Anterior",
                                    next: "Siguiente",
                                    last: "Ultima"
                                },
                                loading_text: 'cargando ...'
                            }
                        }}
                        records={rows}
                        columns={columns}
                        loading={loading}
                    />
                </div>
            </div>
            {
                showModal &&
                <ConfirmDialog info="la etnia" title="Eliminar estado civil">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar estado civil' : 'Registrar estado civil'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>

                    <button className="button is-small is-danger mx-3 is-pulled-rigth" onClick={ev => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ModalForm>
            }
            {
                response?.type && <AlertModal type={response.type} message={response.content}>
                    <button className="delete" aria-label="close" onClick={() => setResponse(null)}></button>
                </AlertModal>
            }
            {
                error?.message && <AlertModal type={'danger'} message={error.message}>
                    <button className="delete" aria-label="close" onClick={() => setError(null)}></button>
                </AlertModal>
            }
        </>


    )
}

export default ListadoEstadosCiviles;
