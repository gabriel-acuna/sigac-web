import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadCamposDetalladosPorCampoEspecifico, clearData, deleteCamposDetallados, putCamposDetallados, postCampoDetallado } from '../../../../store/core/campoDetallado'
import ConfirmDialog from '../../../ConfirmDialog'
import AlertModal from '../../../AlertModal'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modal'


let ListadoCamposEstudiosDetallados = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(
        () => {
            dispatch(
                loadCamposDetalladosPorCampoEspecifico(location.state.id)
            ).unwrap()
                .then(()=>setLoading(false))
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

    let camposDetalladosState = useSelector(state => state.camposDetallados.data.campos)

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
            deleteCamposDetallados(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadCamposDetalladosPorCampoEspecifico(location.state.id)
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = camposDetalladosState.map(
        (row) => {
            return {
                id: row.id,
                codigo: row.codigo,
                nombre: row.descripcion,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}.`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }} title="Editar">
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}+`}  onClick={() => {
                        deleteHandler(row.id)
                    }} title="Eliminar">
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
            postCampoDetallado(
                {
                    descripcion: data.descripcion,
                    codigo: data.codigo,
                    campo_especifico: location.state.id
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if(resp.type === 'success'){
                    dispatch(loadCamposDetalladosPorCampoEspecifico(location.state.id))
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
            putCamposDetallados(
                
                {
                    id: objeto.id,
                    descripcion: data.descripcion,
                    codigo: data.codigo.toUpperCase(),
                    campo_especifico: location.state.id
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if(resp.type === 'success'){
                    dispatch(loadCamposDetalladosPorCampoEspecifico(location.state.id))
                    setShowModalForm(false)
                    setObjeto(null)
                }
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
                        <span>Registrar</span>
                    </button>
                </div>
               
            </div>
            <div className="columns is-centered">


                <div className="column is-half mb-6">
                <span> Campo Específico: {location.state.descripcion}</span>
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
                                info: "Mostrando _START_ a _END_ de _TOTAL_ campos de estudio detallado",
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
                        loading ={loading}
                    />
                </div>
            </div>
            {
                showModal &&
                <ConfirmDialog info="el campo de estudio" title="Eliminar el campo de estudio detallado">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar campo de estudio detallado' : 'Registrar campo de estudio detallado'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                   
                    <button className="button is-small is-danger mx-3" onClick={ev => {
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

export default ListadoCamposEstudiosDetallados;
