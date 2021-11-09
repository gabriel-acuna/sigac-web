import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadTipoBecas, clearData, deleteTipoBecas, putTipoBecas, postTipoBecas } from '../../../../store/core/tipoBeca'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modal'


let ListadoTiposBecas = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadTipoBecas()
            ).unwrap()
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'tipoBeca', text: 'Tipo beca', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    let tipoBecasState = useSelector(state => state.tipoBecas.data.tipoBecas)

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [showModalForm, setShowModalForm] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(null)
    const [objeto, setObjeto] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let doDelete = () => {
        dispatch(
            deleteTipoBecas(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadTipoBecas()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = tipoBecasState.map(
        (row) => {
            return {
                tipoBeca: row.tipo_beca,
                opciones: [
                    <button className="button is-small is-primary mx-2" key={`${row.id}0`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2" key={`${row.id}1`} onClick={() => {
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
            postTipoBecas(
                { tipo_beca: data.tipoBeca.toUpperCase() }
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

    let putHandler = (data) => {


        dispatch(
            putTipoBecas(
                {
                    id: objeto.id,
                    tipo_beca: data.tipoBeca.toUpperCase()
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

                    <button className="button is-success mt-4 is-outlined" onClick={() => setShowModalForm(true)}>
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
                                length_menu: "Mostrar _MENU_ tipo becas por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay tipo becas registrados",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ tipo becas",
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
            {
                showModal &&
                <ConfirmDialog info="el tipo beca" title="Eliminar tipo beca">

                    <button className="button is-small is-danger is-pulled-left" onClick={() => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm &&
                <ModalForm
                    title={objeto !== null ? 'Editar tipo beca' : 'Registrar tipo beca'}
                    objeto={objeto}
                    handler={objeto !== null ? putHandler : postHandler}
                >
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={() => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={() => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadTipoBecas()
                            )
                        }}></button>
                    </Alert>}
                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={() => setError(null)}></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ModalForm>
            }
        </div >
    )
}

export default ListadoTiposBecas;