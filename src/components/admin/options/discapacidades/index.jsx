import ReactDatatable from '@yun548/bulma-react-datatable'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadDiscapacidades, clearData, deleteDiscapacidades } from '../../../../store/core/discapacidades'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'



let ListadoDiscapacidades = (props) => {
    
    let navigate = useNavigate()
    let dispatch = useDispatch()

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

    const [response, setResponse] = useState(null)
    const [showModal, setShowModal] = useState(false)
   
    const [id, setId] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)      

    }

    let doDelete = () =>{
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
                    <Link className="button is-small is-primary mx-2" to={`/admin/discapacidades/editar/${row.id}`} key={`${row.id}0`}>Editar</Link>,
                    <button className="button is-small is-danger mx-2" onClick={event => {
                        deleteHandler(row.id)
                    }}>Eliminar</button>
                ]
            }
        }
    )


    return (

        <div className="conatiner">
            <div className="columns is-centered">
                <div className="column is-half">
                    <button className="button is-small is-info mt-4 mx-3"
                        onClick={event => {
                            navigate(-1);
                            dispatch(clearData())
                        }}>Regresar</button>

                    <Link className="button is-small is-success mt-4"
                        to="/admin/discapacidades/registrar">Registar discapacidad</Link>
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
        </div >
    )
}

export default ListadoDiscapacidades;