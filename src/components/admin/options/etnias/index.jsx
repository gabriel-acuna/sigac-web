import ReactDatatable from '@yun548/bulma-react-datatable'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { loadEtnias, clearData, deleteEtnias } from '../../../../store/core/etnias'
import ConfirmDialog from '../../../ConfirmDialog'
import Alert from '../../../Alert'



let ListadoEtnias = (props) => {
    let navigate = useNavigate()
    let dispatch = useDispatch()

    useEffect(
        () => {
            dispatch(
                loadEtnias()
            ).unwrap()
                .catch(
                    (err) => console.log(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'etnia', text: 'Etnia', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]
    let etniasState = useSelector(state => state.etnias.data.etnias)

    const [response, setResponse] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [id, setId] = useState(null)

    let deleteHandler = (id) => {
        setShowModal(true)
        setId(id)      

    }

    let doDelete = () =>{
        dispatch(
            deleteEtnias(id)

        ).unwrap()
            .then(resp => {
                setResponse(resp)
                dispatch(
                    loadEtnias()
                )
            }).catch(
                (err) => console.error(err)
            )
    }

    let rows = etniasState.map(
        (row, index) => {
            return {
                etnia: row.etnia,
                opciones: [
                    <Link className="button is-small is-primary mx-2" to={`/admin/etnias/editar/${row.id}`} key={`${row.id}0`}>Editar</Link>,
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
                        to="/admin/etnias/registrar">Registar etnia</Link>
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
                                length_menu: "Mostrar _MENU_ etnias por página",
                                filter: "Buscar en registros ...",
                                no_data_text: "No hay etnias registradas",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ etnias",
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
                <ConfirmDialog info="la etnia" title="Eliminar etnia">

                    <button className="button is-small is-danger is-pulled-left" onClick={event => setShowModal(false)}> Cancelar</button>
                    <button className="button is-small is-success is-pulled-rigth" onClick={event => {
                        setShowModal(false); doDelete();
                    }}>Confirmar</button>
                </ConfirmDialog>
            }
        </div >
    )
}

export default ListadoEtnias;