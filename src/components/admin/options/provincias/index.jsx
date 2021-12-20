import ReactDatatable from '@yun548/bulma-react-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadProvincias, clearData, postProvincias, putProvincias } from '../../../../store/core/provincias';
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { HiViewList } from 'react-icons/hi'
import AlertModal from '../../../AlertModal'
import ModalForm from './modalProvincia'


let ListadoProvincias = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadProvincias()

            ).unwrap()
                .then(() => setLoading(false))
                .catch(
                    (err) => console.error(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'provincia', text: 'Provincia', sortable: true },
        { key: 'opciones', text: ' Opciones' }

    ]
    const [loading, setLoading] = useState(true)

    const [showModalForm, setShowModalForm] = useState(false)
    const [objeto, setObjeto] = useState(null)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)

    let provinciasState = useSelector(state => state.provincias.data.provincias);

    let postHandler = (data) => {

        dispatch(
            postProvincias(
                {
                    provincia: data.provincia.toUpperCase()
                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
                if (resp?.type === 'success') {
                    loadProvincias()
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
            putProvincias(

                {
                    id: objeto.id,
                    provincia: data.provincia.toUpperCase(),

                }
            )
        ).unwrap()
            .then((resp) => {
                setResponse(resp);
                if (resp?.type === 'success') {
                    loadProvincias()
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

    let rows = provinciasState.map(
        (prov) => {
            return {
                id: prov.id,
                provincia: prov.provincia,
                opciones: [
                    <Link to="cantones" key={prov.id} className="button is-small mx-2 is-info is-outlined" state={prov}><span className="icon"><HiViewList /></span></Link>,
                    <button className="button is-small is-primary mx-2 is-outlined" key={`${prov.id}.`} onClick={() => {
                        setObjeto(prov)
                        setShowModalForm(true)
                    }}>
                        <span className="icon">
                            <FaRegEdit />
                        </span>
                    </button>
                ]
            };
        }
    )
    return (
        <>
            <div className="container">
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
                </div>
                <div className="columns is-centered">
                    <div className="column is-half mb-6">
                        <ReactDatatable style={{ justifyContent: 'center' }}
                            className="table is-bordered is-striped is-fullwidth"
                            config={{
                                page_size: 10,
                                length_menu: [10, 20, 50],
                                show_pagination: true,
                                pagination: 'advance',
                                button: {
                                    excel: false,
                                    print: false
                                },
                                sort: { column: 'provincia', order: 'asc' },
                                language: {
                                    length_menu: "Mostrar _MENU_ provincias por página",
                                    filter: "Buscar en registros ...",
                                    info: "Mostrando _START_ a _END_ de _TOTAL_ provincias",
                                    no_data_text: "No hay provincias registradas",
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
                    showModalForm && <ModalForm title={objeto !== null ? 'Editar provincia' : 'Registrar provincia'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>

                        <button className="button is-small is-danger mx-3" onClick={ev => {
                            setShowModalForm(false)
                            setObjeto(null)
                        }}>Cancelar</button>
                    </ModalForm>
                }
            </div>
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

export default ListadoProvincias;