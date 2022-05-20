import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadIESNacionales, clearData, deleteIES, postIES, putIES } from '../../../../store/core/ies-nacionales'
import ConfirmDialog from '../../../ConfirmDialog'
import AlertModal from '../../../AlertModal'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modal'


let ListadoIESNacionales = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            dispatch(
                loadIESNacionales()
            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'codigo', text: 'Código', sortable: true },
        { key: 'nombre', text: 'Nombre', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    let IESState = useSelector(state => state.ies.data.iesNacionales)

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(null)
    const [objeto, setObjeto] = useState(null)

    let deleteIESteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let dodeleteIESte = () => {
        dispatch(
            deleteIES(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadIESNacionales()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = IESState.map(
        (row) => {
            return {
                id: row.id,
                codigo: row.codigo,
                nombre: row.institucion,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}.`} onClick={ev => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}
                        title="Editar">
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}+`} onClick={event => {
                        deleteIESteHandler(row.id)
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
            postIES(
                {
                    codigo: data.codigo,
                    institucion: data.institucion.toUpperCase(),

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadIESNacionales())
                    setShowModalForm(false)
                }
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
            putIES(

                {
                    id: objeto.id,
                    codigo: data.codigo,
                    institucion: data.institucion.toUpperCase(),

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadIESNacionales())
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


                <div className="column is-half mb-6">
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
                            sort: { column: "codigo", order: "asc" },
                            language: {
                                length_menu: "Mostrar _MENU_ IES nacionales por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay IES nacionales registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ IES nacionales",
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
                <ConfirmDialog info="la IES" title="Eliminar IES">

                    <button className="button is-small is-danger is-pulled-left" onClick={() => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                        setShowModal(false); dodeleteIESte();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar IES' : 'Registrar IES'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>

                    <button className="button is-small is-danger mx-3" onClick={() => {
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

export default ListadoIESNacionales;
