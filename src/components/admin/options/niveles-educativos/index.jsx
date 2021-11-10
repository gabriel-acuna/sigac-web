import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadNivelesEducativos, clearData, deleteNivelesEducativos, postNivelesEducativos, putNivelesEducativos } from '../../../../store/core/nivelesEducativos'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modal'



let ListadoNivelesEducativos = (props) => {
    
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadNivelesEducativos()
            ).unwrap()
                .then(()=>setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'nivel', text: 'Nivel', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    const [loading, setLoading] = useState(true)

    let nivelesEducativosState = useSelector(state => state.nivelesEducativos.data.nivelesEducativos)

    const [delResponse, setDelResponse] = useState(null)
    const [response, setResponse ] = useState(null)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [objeto, setObjeto] = useState(null)
    const [ showModalForm, setShowModalForm] = useState(false)
    const [id, setId] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)      

    }

    let doDelete = () =>{
        dispatch(
            deleteNivelesEducativos(id)

        ).unwrap()
            .then(resp => {
                setDelResponse(resp)
                dispatch(
                    loadNivelesEducativos()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = nivelesEducativosState.map(
        (row) => {
            return {
                id: row.id,
                nivel: row.nivel,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}.`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}+`}  onClick={ ()=> {
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
            postNivelesEducativos(
               { nivel: data.nivel.toUpperCase()}
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
            putNivelesEducativos(
                
                {
                    id: objeto.id,
                    nivel: data.nivel.toUpperCase()
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
                                length_menu: "Mostrar _MENU_ niveles educativos por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay niveles educativos registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ niveles educativos",
                                pagination: {
                                    first: "Primera",
                                    previous: "Anterior",
                                    next: "Siguiente",
                                    last: "Ultima"
                                },
                                loading_text:"cargando ..."
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
                <ConfirmDialog info="el nivel" title="Eliminar nivel">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
             {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar nivel educativo' : 'Registrar nivel educativo'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={() => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={() => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadNivelesEducativos()
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
        </>
    )
}

export default ListadoNivelesEducativos;