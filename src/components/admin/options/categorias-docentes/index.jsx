import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadCategoriasDocentesLOSEP, clearData, deleteCategoriasDocentesLOSEP, postCategoriasDocentesLOSEP, putCategoriasDocentesLOSEP } from '../../../../store/core/categoriasDocentes'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modal'



let ListadoCategoriasDocentes = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            dispatch(
                loadCategoriasDocentesLOSEP()
            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'categoria', text: 'Categoría', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    let categoriasDocentesState = useSelector(state => state.categoriasDocentesLOSEP.data.categoriasDocentes)

    const [delResponse, setDelResponse] = useState(null)
    const [response, setResponse] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showModalForm, setShowModalForm] = useState(false)
    const [objeto, setObjeto] = useState(null)
    const [error, setError] = useState(null)

    const [id, setId] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let doDelete = () => {
        dispatch(
            deleteCategoriasDocentesLOSEP(id)

        ).unwrap()
            .then(resp => {
                setDelResponse(resp)
                dispatch(
                    loadCategoriasDocentesLOSEP()
                )

            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = categoriasDocentesState.map(
        (row) => {
            return {
                id: row.id,
                categoria: row.categoria_docente,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}1`} onClick={() => {
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
            postCategoriasDocentesLOSEP(
                {
                    categoria_docente: data.categoriaDocente.toUpperCase()
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
            putCategoriasDocentesLOSEP(

                {
                    id: objeto.id,
                    categoria_docente: data.categoriaDocente.toUpperCase()
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
                    </button>
                </div>
                {delResponse && delResponse.type === 'success' && <Alert type={'is-success is-light'} content={delResponse.content}>
                    <button className="delete" onClick={() => setDelResponse(null)}></button>
                </Alert>}
                {delResponse && delResponse.type === 'warning' && <Alert type={'is-success is-light'} content={delResponse.content}>
                    <button className="delete" onClick={() => setDelResponse(null)}></button>
                </Alert>}
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
                                length_menu: "Mostrar _MENU_ categorías docentes por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay categorías docentes registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ categorías docentes",
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
                        loading={loading}
                    />
                </div>
            </div>
            {
                showModal &&
                <ConfirmDialog info="la categoría" title="Eliminar categoría">

                    <button className="button is-small is-danger is-pulled-left" onClick={() => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar categoría docente' : 'Registrar categoría docente'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={() => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={() => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadCategoriasDocentesLOSEP()
                            )
                        }}></button>
                    </Alert>}
                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={event => setError(null)}></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ModalForm>
            }
        </>
    )
}

export default ListadoCategoriasDocentes;