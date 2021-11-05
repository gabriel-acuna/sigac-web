import ReactDatatable from '@yun548/bulma-react-datatable';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadProvincias, clearData, postProvincias, putProvincias } from '../../../../store/core/provincias';
import { IoIosAddCircleOutline, IoIosArrowBack } from 'react-icons/io'
import { logOut } from '../../../../store/user'
import { FaRegEdit } from 'react-icons/fa'
import { HiViewList } from 'react-icons/hi'
import Alert from '../../../Alert'
import ModalForm from './modalProvincia'


let ListadoProvincias = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadProvincias()

            ).unwrap()
                .catch(
                    (err) => console.error(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'provincia', text: 'Provincia', sortable: true },
        { key: 'opciones', text: ' Opciones' }

    ]

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
        <div className="conatiner">
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
                                length_menu: "Mostrar _MENU_ provincias por página",
                                filter: "Buscar en registros ...",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ provincias",
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
                showModalForm && <ModalForm title={objeto !== null ? 'Editar provincia' : 'Registrar provincia'} objeto={objeto} handler={objeto !== null ? putHandler : postHandler}>
                    {response && response.type === 'warning' && <Alert type={'is-warning is-light'} content={response.content}>
                        <button className="delete" onClick={() => setResponse(null)}></button>
                    </Alert>}
                    {response && response.type === 'success' && <Alert type={'is-success is-light'} content={response.content}>
                        <button className="delete" onClick={() => {
                            setResponse(null)
                            setShowModalForm(false)
                            setObjeto(null)
                            dispatch(
                                loadProvincias()
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
        </div>
    )
}

export default ListadoProvincias;