import ReactDatatable from '@yun548/bulma-react-datatable';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadCantonesProvincia } from '../../../../store/core/provincias';

let ListadoCantonesProvincias = (props) => {

    let navigate = useNavigate()
    let distpatch = useDispatch()
    const { id } = useParams()
    const [cantonesProvincia, setCantonesProvincia] = useState([])

    useEffect(
        () => {
            distpatch(
                loadCantonesProvincia(id)

            ).unwrap()
                .then(
                    resp=>setCantonesProvincia(resp)
                )
                .catch(
                    (err) => console.error(err)
                )
        }, [id, distpatch]
    )

    const columns = [
        { key: 'canton', text: 'Cantón', sortable: true },
        { key: 'opciones', text: ' Opciones' }

    ]
    
    console.log(cantonesProvincia);

    return (


        <div className="conatiner" >
            <div className="columns is-centered">
                <div className="column is-half">
                    <button className="button is-small is-info mt-4 mx-3" onClick={event => {
                        navigate(-1);
                        
                    }}>Regresar</button>
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
                        records={cantonesProvincia}
                        columns={columns}
                    />
                </div>
            </div>
        </div >
    )

}

export default ListadoCantonesProvincias;