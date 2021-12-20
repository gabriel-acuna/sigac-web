import ReactDatatable from '@yun548/bulma-react-datatable';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadCantonesProvincia, postCantones, putCantones, deleteCantones } from '../../../../store/core/provincias';

import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import AlertModal from '../../../AlertModal'
import ModalForm from './modalCanton'
import { logOut } from '../../../../store/user'
import ConfirmDialog from '../../../ConfirmDialog'


let ListadoCantonesProvincias = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [cantonesProvincia, setCantonesProvincia] = useState([])
    const location = useLocation()
    const [objeto, setObjeto] = useState(null)

    useEffect(
        () => {
            dispatch(
                loadCantonesProvincia(location.state.id)

            ).unwrap()
                .then(
                    resp => setCantonesProvincia(resp)
                )
                .catch(
                    (err) => console.error(err)
                )
        }, [location, dispatch]
    )

    const [showModalForm, setShowModalForm] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [id, setId] = useState(null)

    const deleteHandler = (id) => {
        setId(id)
        setShowModal(true)
    }


    const columns = [
        { key: 'canton', text: 'Cantón', sortable: true },
        { key: 'opciones', text: ' Opciones' }

    ]

    let rows = cantonesProvincia.map(
        (row, index) => {
            return {
                id: row.id,
                canton: row.canton,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}.`} onClick={ev => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" key={`${row.id}+`} onClick={event => {
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
            postCantones(
                {
                    provincia_id: location.state.id,
                    canton: data.canton.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    loadCantonesProvincia(location.state.id)
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
            putCantones(

                {
                    id: objeto.id,
                    provincia_id: location.state.id,
                    canton: data.canton.toUpperCase(),

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    loadCantonesProvincia(location.state.id)
                    setShowModalForm(false)
                    setObjeto(false)
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

    let doDelete = () => {
        dispatch(
            deleteCantones(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadCantonesProvincia(location.state.id))
                    .unwrap()
                    .then(
                        resp => {
                            setCantonesProvincia(resp)


                        }

                    )

            }).catch(
                (err) => console.error(err)
            )
    }

    return (


        <>
            <div className="columns is-centered">
                <div className="column is-half">
                    <button className="button is-info mt-4 mx-3 is-outlined"
                        onClick={() => navigate(-1)}>
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
            </div>
            <div className="columns is-centered">

                <div className="column is-half mb-6">
                    <span> Provincia: {location.state.provincia}</span>
                    <ReactDatatable style={{ justifyContent: 'center' }}
                        className="table is-bordered is-striped is-fullwidth"
                        tHeadClassName="has-background-success-light"
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
                                length_menu: "Mostrar _MENU_ cantones por página",
                                filter: "Buscar en registros ...",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ cantones",
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
                <ConfirmDialog info="el cantón" title="Eliminar cantón">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
            {
                showModalForm && <ModalForm title={objeto !== null ? 'Editar cantón' : 'Registrar cantón'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>

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

export default ListadoCantonesProvincias;