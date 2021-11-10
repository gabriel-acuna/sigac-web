import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadEstructurasInstitucionales, clearData, deleteEstructura, postEstructuraInstitucional, putEstructuraInstitucional } from '../../../../store/core/estructura-institucional'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modalForm'


let ListadoEstructurasInstitucionales = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            dispatch(
                loadEstructurasInstitucionales()
            ).unwrap()
                .then(()=>setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'documentoAprobacion', text: 'Doc. aprobación', sortable: true },
        { key: 'fechaAprobacion', text: 'Fecha aprobación', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]
    
    let estructurasState = useSelector(state => state.estructuraInstitucional.data.estructuras)

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
            deleteEstructura(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadEstructurasInstitucionales()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = estructurasState.map(
        (row, index) => {
            return {
                id: row.id,
                documentoAprobacion: row.documento_aprobacion,
                fechaAprobacion: row.fecha_aprobacion,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" onClick={ev => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }} key={`${row.id}.`}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined"  onClick={event => {
                        deleteHandler(row.id)
                    }} key={`${row.identificacion}+`}>
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
            postEstructuraInstitucional(
                {
                    documento_aprobacion: data.documentoAprobacion.toUpperCase(),
                    fecha_aprobacion: data.fechaAprobacion
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


    let putHandler = (data) => {


        dispatch(
            putEstructuraInstitucional(
                {
                    id: objeto.id,
                    documento_aprobacion: data.documentoAprobacion.toUpperCase(),
                    fecha_aprobacion: data.fechaAprobacion
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

        <>
            <div className="columns is-centered">
                <div className="column is-half">
                    <button className="button is-info mt-4 mx-3 is-outlined"
                        onClick={event => {
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
                    <button className="delete" onClick={event => setResponse(null)}></button>
                </Alert>}
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
                            language: {
                                length_menu: "Mostrar _MENU_ estructuras  por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay estructuras registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ estructuras",
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
                <ConfirmDialog info="la etnia" title="Eliminar estructura institucional">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar estructura institucional' : 'Registrar estructura institucional'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={() => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadEstructurasInstitucionales()
                            )
                        }}></button>
                    </Alert>}
                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={()=> setError(null)}></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={() => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>
                </ModalForm>
            }
        </>
    )
}

export default ListadoEstructurasInstitucionales;
