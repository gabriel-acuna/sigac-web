import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadNacionalidades, clearData, deleteNacionalidades, postNacionalidades, putNacionalidades } from '../../../../store/core/nacionalidades'
import ConfirmDialog from '../../../ConfirmDialog'
import AlertModal from '../../../AlertModal'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import RegistrarNacionalidad from './RegistrarNacionalidad'


let ListadoNacionalidades = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadNacionalidades()
            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'nacionalidad', text: 'Nacionalidad', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]
    const [loading, setLoading] = useState(true)

    let nacionalidadesState = useSelector(state => state.nacionalidades.data.nacionalidades)

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [showModalForm, setShowModalForm] = useState(false)
    const [id, setId] = useState(null)
    const [objeto, setObjeto] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)

    }

    let doDelete = () => {
        dispatch(
            deleteNacionalidades(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadNacionalidades()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = nacionalidadesState.map(
        (row) => {
            return {
                id: row.id,
                nacionalidad: row.nacionalidad,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}i`} onClick={() => {
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
            postNacionalidades(
                { nacionalidad: data.nacionalidad.toUpperCase() }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    loadNacionalidades()
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
            putNacionalidades(
                {
                    id: objeto.id,
                    nacionalidad: data.nacionalidad.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    loadNacionalidades()
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
            <div className="conatiner">
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

                        <button className="button is-success mt-4 is-outlined" onClick={() => setShowModalForm(true)}>
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
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
                                language: {
                                    length_menu: "Mostrar _MENU_ nacionalidades por página",
                                    filter: "Buscar en registros ...",
                                    no_data_text: "No hay nacionalidades registradas",
                                    info: "Mostrando _START_ a _END_ de _TOTAL_ nacionalidades",
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
                    <ConfirmDialog info="la nacionalidad" title="Eliminar nacionalidad">

                        <button className="button is-small is-danger is-pulled-left" onClick={() => setShowModal(false)}> Cancelar</button>
                        <button className="button is-small is-success is-pulled-rigth" onClick={() => {
                            setShowModal(false); doDelete();
                        }}>Confirmar</button>
                    </ConfirmDialog>
                }
                {
                    showModalForm && <RegistrarNacionalidad
                        title={objeto !== null ? 'Editar nacionalidad' : 'Registrar nacionalidad'}
                        objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>

                        <button className="button is-small is-danger mx-3" onClick={() => {
                            setShowModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                    </RegistrarNacionalidad>
                }
            </div >
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

export default ListadoNacionalidades;