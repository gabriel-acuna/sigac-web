import ReactDatatable from '@yun548/bulma-react-datatable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadAccounts, createAccount, updateAccount, clearData } from '../../../../store/accounts'
import AlertModal from '../../../AlertModal'
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import ModalForm from './modal'




let ListadoUsuarios = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadAccounts()
            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'apellidos', text: 'Apellidos', sortable: true },
        { key: 'nombres', text: 'Nombres', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]

    const [loading, setLoading] = useState(true)
    let accountsState = useSelector(state => state.accounts.data.accounts)

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [objeto, setObjeto] = useState(null)
    const [showModalForm, setShowModalForm] = useState(false)



    let rows = accountsState.map(
        (row) => {
            return {
                id: row.id,
                apellidos: `${row.primer_apellido} ${row.segundo_apellido}`,
                nombres: `${row.primer_nombre} ${row.segundo_nombre}`,
                opciones: [
                    row.id !== null ? <button className="button is-small is-primary mx-2 is-outlined" key={`${row.id}.`} onClick={() => {
                        setObjeto(row)
                        setShowModalForm(true)
                    }}
                    title="Editar">
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button> :
                        <button className="button is-small is-success mx-2 is-outlined" key={`${row.id}+`} onClick={() => {
                            setObjeto(row)
                            setShowModalForm(true)
                        }}
                        title="Crear cuenta">
                            <span className="icon">
                                <IoIosAddCircleOutline />
                            </span>
                        </button>
                ]
            }
        }
    )

    let postHandler = (data) => {

        dispatch(
            createAccount({
                primer_nombre: objeto.primer_nombre,
                segundo_nombre: objeto.segundo_nombre,
                primer_apellido: objeto.primer_apellido,
                segundo_apellido: objeto.segundo_apellido,
                email_personal: objeto.email_personal,
                email_institucional: objeto.email_institucional,
                ...data
            })
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadAccounts())
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
            updateAccount(
                {
                    id: objeto.id,
                    ...data
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp)
                if (resp.type === 'success') {
                    dispatch(loadAccounts())
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

                </div>
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
                                length_menu: "Mostrar _MENU_ usuarios por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay usuarios registrados",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ usuarios",
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
                showModalForm && <ModalForm title={objeto?.id !== null ? 'Editar cuenta de usuario' : 'Crear cuenta de usuario'} objeto={objeto} handler={objeto.id !== null ? putHandler : postHandler}>

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

export default ListadoUsuarios;