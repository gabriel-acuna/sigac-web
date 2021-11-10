import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadTiposEscalafonesNombramientos, clearData, deleteTiposEscalafonesNombramientos, postTiposEscalafonesNombramientos, putTiposEscalafonesNombramientos } from '../../../../store/core/tiposEscalafones'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { AiOutlineDelete } from 'react-icons/ai'
import { FaRegEdit } from 'react-icons/fa'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import ModalForm from './modal'
import { logOut } from '../../../../store/user'

let ListadoTiposEscalafones = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadTiposEscalafonesNombramientos()
            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'escalafonNombramiento', text: 'Escalafón nombramiento', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    const [loading, setLoading] = useState(true)

    let tiposEscalafonesState = useSelector(state => state.tipoEscalafones.data.tipoEscalafones)

    const [response, setResponse] = useState(null)
    const [delResponse, setDelResponse] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [objeto, setObjeto] = useState(null)
    const [id, setId] = useState(null)
    const [error, setError] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let doDelete = () => {
        dispatch(
            deleteTiposEscalafonesNombramientos(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadTiposEscalafonesNombramientos()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let postHandler = (data) => {

        dispatch(
            postTiposEscalafonesNombramientos(
                { escalafon_nombramiento: data.tipoEscalafon.toUpperCase() }
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
            putTiposEscalafonesNombramientos(

                {
                    id: objeto.id,
                    escalafon_nombramiento: data.tipoEscalafon.toUpperCase()
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
    let rows = tiposEscalafonesState.map(
        (row, index) => {
            return {
                escalafonNombramiento: row.escalafon_nombramiento,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" onClick={() => {
                        setShowModalForm(true)
                        setObjeto(row)
                    }} key={`${row.id}0`}>
                        <span className="icon"><FaRegEdit /></span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                        deleteHandler(row.id)
                    }}>
                        <span className="icon"><AiOutlineDelete /></span>
                    </button>
                ]
            }
        }
    )


    return (

        <>
            <div className="columns is-centered">
                <div className="column is-half">
                    <button className="button is-outlined is-info mt-4 mx-3"
                        onClick={event => {
                            navigate(-1);
                            dispatch(clearData())
                        }}>
                        <span className="icon">
                            <IoIosArrowBack />
                        </span>
                    </button>

                    <button className="button is-outlined is-success mt-4"
                        onClick={() => setShowModalForm(true)}>
                        <span className="icon">
                            <IoIosAddCircleOutline />
                        </span>
                    </button>
                </div>
                {delResponse && delResponse.type === 'success' && <Alert type={'is-success is-light'} content={delResponse.content}>
                    <button className="delete" onClick={event => setDelResponse(null)}></button>
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
                                length_menu: "Mostrar _MENU_ escalafones nombramientos por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay escalafones nombramientos registrados",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ escalafones nombramientos",
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
                <ConfirmDialog info="el escalafón nombramiento" title="Eliminar escalafón">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar tipo escalafón' : 'Registrar tipo escalafón'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadTiposEscalafonesNombramientos()
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

export default ListadoTiposEscalafones;