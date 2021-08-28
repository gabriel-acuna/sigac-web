import ReactDatatable from '@yun548/bulma-react-datatable';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadProvincias } from '../../../../store/core/provincias';


let ListadoProvincias = (props) => {

    let navigate = useNavigate()
    let distpatch = useDispatch()


    useEffect(
        () => {
            distpatch(
                loadProvincias()

            ).unwrap()
                .catch(
                    (err) => console.error(err)
                )
        }, [distpatch]
    )

    const columns = [
        { key: 'provincia', text: 'Provincia', sortable: true },
        { key: 'registrado_en', text: ' Registrado en'}
       
    ]


    let provinciasState = useSelector(state => state.provincias.data.provincias);

    
    return (
        <div className="conatiner">
            <button className="button is-small is-info mt-4" onClick={event => navigate(-1)}>Regresar</button>
            <div className="columns is-centered">
                <div className="column is-half">
                    <ReactDatatable  style={{ justifyContent:'center'}}
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
                        records={provinciasState}
                        columns={columns}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListadoProvincias;