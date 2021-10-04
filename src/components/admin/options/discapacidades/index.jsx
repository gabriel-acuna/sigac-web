import ReactDatatable from '@yun548/bulma-react-datatable'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadDiscapacidades, clearData, deleteDiscapacidades, postDiscapacidades, putDiscapacidades } from '../../../../store/core/discapacidades'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import RegistrarDiscapacidad from './RegistrarDiscapacidad'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete} from 'react-icons/ai'

let ListadoDiscapacidades = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [error, setError] = useState(null)

    const [response, setResponse] = useState(null)
    const [ objeto, setObjeto] = useState(null)


    useEffect(
        () => {
            dispatch(
                loadDiscapacidades()
            ).unwrap()
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'discapacidad', text: 'Discapacidad', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]
    let discapacidadesState = useSelector(state => state.discapacidades.data.discapacidades)

   
    const [showModal, setShowModal] = useState(false)
    const [showModalForm, setShowModalForm] = useState(false)

    const [id, setId] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let doDelete = () => {
        dispatch(
            deleteDiscapacidades(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadDiscapacidades()
                )

            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = discapacidadesState.map(
        (row, index) => {
            return {
                discapacidad: row.discapacidad,
                opciones: [
                    <button className="button is-small is-primary is-outlined mx-2" onClick={ ev=>{ 
                        setObjeto(row)
                        setShowModalForm(true)
                    }} key={`${row.id}0`}>
                        <span className="icon">
                            <FaRegEdit/>
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
                        deleteHandler(row.id)
                    }}>
                        <span className="icon">
                            <AiOutlineDelete/>
                        </span>
                    </button>
                ]
            }
        }
    )

    let postHandler = (data) => {

        dispatch(
            postDiscapacidades(
                { discapacidad: data.discapacidad.toUpperCase() }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.messsage === "Cannot read property 'data' of undefined") {
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
            putDiscapacidades(
                {
                    id: objeto.id,
                    discapacidad: data.discapacidad.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
            })
            .catch(
                (err) => {
                    if (err.messsage === "Cannot read property 'data' of undefined") {
                        console.error("No hay conexión con el backend");
                        
                    }
                    else if(err.message==="Rejected"){
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
                    <button className="button is-info is-outlined mt-4 mx-3"
                        onClick={event => {
                            navigate(-1);
                            dispatch(clearData())
                        }}>
                            <span className="icon">
                                <IoIosArrowBack/>
                            </span>
                        </button>

                    <button className="button is-success is-outlined mt-4" onClick={ev => setShowModalForm(true)}>
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
                                length_menu: "Mostrar _MENU_ discapacidades por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay discapacidades registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ discapacidades",
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
                <ConfirmDialog info="la discapacidad" title="Eliminar discapacidad">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <RegistrarDiscapacidad title={ objeto!== null ? "Editar discapacidad": "Registrar discapacidad"} objeto={objeto} handler={objeto!==null ? putHandler:postHandler}>
                    {
                        error && <Alert type={'is-danger is-light'} content={error.message}>
                            <button className="delete" onClick={event => setError(null)}></button>
                        </Alert>
                    }
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event =>{ 
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadDiscapacidades()
                            )}}></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={ev =>{ 
                        setShowModalForm(false)
                        setObjeto(null)
                        }}>Cancelar</button>
                </RegistrarDiscapacidad>
            }
        </div >
    )
}

export default ListadoDiscapacidades;