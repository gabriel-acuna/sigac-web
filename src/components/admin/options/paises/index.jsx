import ReactDatatable from '@yun548/bulma-react-datatable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadPaises, clearData } from '../../../../store/core/paises';


let ListadoPaises = (props) => {

    let navigate = useNavigate()
    let distpatch = useDispatch()



    useEffect(
        () => {
            distpatch(
                loadPaises()

            ).unwrap()
                .catch(
                    (err) => console.error(err)
                )
        }, [distpatch]
    )

    const columns = [
        { key: 'pais', text: 'Nombre', sortable: true },
        { key: 'nacionalidad', text: 'Nacionalidad', sortable: true }

    ]


    let paisesState = useSelector(state => state.paises.data.paises);


    return (
        <div className="conatiner">
            <button className="button is-small is-info mt-4"
                onClick={event => {
                    navigate(-1);
                    distpatch(clearData())
                }}>Regresar</button>
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
                                length_menu: "Mostrar _MENU_ paises por página",
                                filter: "Buscar en registros ...",
                                info: "Mostrando _START_ a _END_ de _TOTAL_ paises",
                                pagination: {
                                    first: "Primera",
                                    previous: "Anterior",
                                    next: "Siguiente",
                                    last: "Ultima"
                                }
                            }
                        }}
                        records={paisesState}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListadoPaises;