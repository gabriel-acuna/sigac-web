import ReactDatatable from '@yun548/bulma-react-datatable';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadCantonesProvincia, clearData } from '../../../../store/core/provincias';

let ListadoCantonesProvincias = (props) => {

    let navigate = useNavigate()
    let distpatch = useDispatch()
    const { id } = useParams();

    useEffect(
        () => {
            distpatch(
                loadCantonesProvincia(id)

            ).unwrap()
                .catch(
                    (err) => console.error(err)
                )
        }, [id, distpatch]
    )

    const columns = [
        { key: 'canton', text: 'Cantón', sortable: true },
        { key: 'opciones', text: ' Opciones' }

    ]
    let cantonesProvinciasState = useSelector(state => state.provincias.data.cantonesProvincia);
    console.log(cantonesProvinciasState)

    return (


        < div className="conatiner" >
            <button className="button is-small is-info mt-4" onClick={event => {
                navigate(-1);
                distpatch(clearData())
            }}>Regresar</button>
            <div className="columns is-centered">
                <div className="column is-half">
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
                        records={  cantonesProvinciasState }
                        columns={columns}
                    />
                </div>
            </div>
        </div >
    )

}

export default ListadoCantonesProvincias;