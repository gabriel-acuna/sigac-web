import ReactDatatable from '@yun548/bulma-react-datatable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadPaises, clearData } from '../../../../store/core/paises';
import { IoIosArrowBack } from 'react-icons/io'

let ListadoPaises = (props) => {

    let navigate = useNavigate()
    let dispatch = useDispatch()
    const [loading, setLoading] = useState(true)



    useEffect(
        () => {
            dispatch(
                loadPaises()

            ).unwrap()
                .then(()=>setLoading(false))
                .catch(
                    (err) => console.error(err)
                )
        }, [dispatch]
    )

    const columns = [
        { key: 'pais', text: 'Nombre', sortable: true },
        { key: 'nacionalidad', text: 'Nacionalidad', sortable: true }

    ]


    let paisesState = useSelector(state => state.paises.data.paises);


    return (
        <>
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
                                length_menu: "Mostrar _MENU_ paises por página",
                                filter: "Buscar en registros ...",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ paises",
                                no_data_text: "No hay paises registrados",
                                pagination: {
                                    first: "Primera",
                                    previous: "Anterior",
                                    next: "Siguiente",
                                    last: "Ultima"
                                },
                                loading_text: 'cargando ...'
                            }
                        }}
                        records={paisesState}
                        columns={columns}
                        loading={loading}
                    />
                </div>
            </div>
        </>
    )
}

export default ListadoPaises;