import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io'
import { deleteItemDetalle, loadExpedienteLaboral } from '../../store/dth/expediente_laboral'
import { FaRegEdit } from 'react-icons/fa'
import { AiOutlineDelete } from 'react-icons/ai'
import ModalForm from './modalForm'
import ModalEditForm from './modalEditForm'
import { postDetalleExpedienteFuncionario, postDetalleExpedienteProfesor } from '../../store/dth/expediente_laboral'
import { logOut } from '../../store/user'
import Alert from '../Alert'
import ConfirmDialog from '../ConfirmDialog'

let ListaExpediente = (props) => {
    const location = useLocation()
    let expedienteState = useSelector(state => state.expediente.data.expediente)
    const navigate = useNavigate()
    const [persona, setPersona] = useState(null)
    const dispatch = useDispatch()
    const [objeto, setObjeto] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)
    const [showModalEditForm, setShowModalEditForm] = useState(false)
    const [showConfirmDialog, setShowConfirmDialog] = useState(false)
    const [response, setResponse] = useState(null)
    const [deteteResponse, setDeleteResponse] = useState(null)
    const [error, setError] = useState(null)
    const [id, setId] = useState(null)

    useEffect(
        () => {
            dispatch(
                loadExpedienteLaboral(location.state.identificacion)
            )
        }, [dispatch]
    )

    useEffect(
        () => {
            setPersona(location.state)
        }, [location, persona]
    )
   

    const columns = [
        { key: 'numero_documento', text: 'No. Doc.', sortable: true },
        { key: 'fecha_inicio', text: 'Inicio', sortable: true },
        { key: 'fecha_fin', text: 'Fin', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    let rows =  expedienteState.detalle.map(



        (row, index) => {
            return {
                id: index,
                numero_documento: row.numero_documento,
                fecha_inicio: row.fecha_inicio,
                fecha_fin: row.fecha_fin,
                opciones: [
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}0`} onClick={ev => {
                        setObjeto(row)
                        setShowModalEditForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>,
                    <button className="button is-small is-danger mx-2 is-outlined" onClick={event => {
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



    const deleteHandler = (id) => {
        setId(id)
        setShowConfirmDialog(true)

    }

    let postHandler = (data) => {
        let detalle = { id_persona: location.state.identificacion, detalle: data }
        console.log(detalle);
        if (data.tipo_personal === 'PROFESOR') {
            dispatch(
                postDetalleExpedienteProfesor(detalle)
            ).unwrap()
                .then(
                    resp => setResponse(resp)
                ).catch(
                    (err) => {
                        console.log(err);
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
        } else if (data.tipo_personal === 'FUNCIONARIO') {
            dispatch(
                postDetalleExpedienteFuncionario(detalle))
                .unwrap()
                .then(
                    (resp) => setResponse(resp)
                ).catch(
                    (err) => {
                        console.log(err);
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
    }




    let doDelete = () => {
        dispatch(
            deleteItemDetalle(id)

        ).unwrap()
            .then(resp => {
                setDeleteResponse(resp)


            }).catch(
                (err) => console.error(err)
            )
    }

    
    return (
        <>
            <div className="continer">
                <div className="columns is-centered">
                    <div className="column is-half mt-3">
                        <div className="card">
                            <header>
                                <button className="button is-info mt-4 mx-3 is-outlined"
                                    onClick={event => {
                                        navigate(-1);

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
                            </header>
                            {persona && <section className="card-content">
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr' }}>
                                    <div>
                                        <span className="has-text-weight-medium">Nombres: </span> {persona.primer_nombre} {persona.segundo_nombre}
                                    </div>
                                    <div >
                                        <span className="has-text-weight-medium">Apellidos: </span> {persona.primer_apellido} {persona.segundo_apellido}
                                    </div>

                                    <div><span className="has-text-weight-medium">Edad: </span> {persona.edad.años}  años </div>
                                    <div><span className="has-text-weight-medium">Estado civil: </span> {persona.estado_civil.estado_civil}</div>
                                    <div><span className="has-text-weight-medium">Teléfono movil: </span> {persona.telefono_movil}</div>
                                    <div><span className="has-text-weight-medium">Correo: </span> {persona.correo_personal}</div>
                                </div>
                            </section>}
                        </div>
                    </div>

                </div>
                <div className="columns is-centered">
                    <div className="column  is-3">
                        {deteteResponse && deteteResponse.type === 'warning' && <Alert type={'is-warning is-light'} content={deteteResponse.content}>
                            <button className="delete" onClick={event => setDeleteResponse(null)}></button>
                        </Alert>}
                        {deteteResponse && deteteResponse.type === 'success' && <Alert type={'is-success is-light'} content={deteteResponse.content}>
                            <button className="delete" onClick={event => {
                                setDeleteResponse(null)
                                dispatch(loadExpedienteLaboral(location.state.identificacion))
                            }}></button>
                        </Alert>}
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
                                    length_menu: "Mostrar _MENU_ registros laborales por página",
                                    filter: "Buscar en registros ...",
                                    no_data_text: "No hay regsitros laborales",
                                    info: "Mostrando _START_ a _END_ de _TOTAL_ registros laborales",
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
            </div>
            {
                showModalForm && <ModalForm title={`Registrando información laboral de: ${persona.primer_nombre} ${persona.primer_apellido}`}  handler={postHandler}>

                    {error && <Alert type={'is-danger is-light'} content={error.message}>
                        <button className="delete" onClick={event => setError(null)}></button>
                    </Alert>}
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={event => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={event => {
                            setResponse(null)
                            setObjeto(null)
                            setShowModalForm(false)
                            dispatch(
                                loadExpedienteLaboral(location.state.identificacion)
                            )
                        }}></button>
                    </Alert>}
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>

                </ModalForm>
            }
            {
                showModalEditForm && <ModalEditForm title='Editar' objeto={objeto} identificacion={location.state.identificacion} >

                   
                    <button className="button is-small is-danger mx-3" onClick={ev => {
                        setShowModalEditForm(false)
                        setObjeto(null)
                    }}>Cancelar</button>

                </ModalEditForm>
            }

            {
                showConfirmDialog &&
                <ConfirmDialog info="el registro" title="Eliminar registro">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowConfirmDialog(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowConfirmDialog(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
        </>
    )


}

export default ListaExpediente