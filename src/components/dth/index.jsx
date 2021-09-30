import { useEffect, useState } from 'react';
import { options } from './options'
import OptionCard from '../OptionCard'
import { Link } from 'react-router-dom'
import ReactDatatable from '@yun548/bulma-react-datatable'
import { useDispatch, useSelector } from 'react-redux';
import { loadInformacionPersonal } from '../../store/dth/informacion_personal'
import { IoPersonAddOutline } from 'react-icons/io5'
import RegistarPersona from './nuevo'

let DTH = (props) => {

    let distpatch = useDispatch()

    const [showRegistarPersona, setShowRegistrarPersona] = useState(false)

    useEffect(
        () => {
            distpatch(
                loadInformacionPersonal()
            ).unwrap()
                .catch(
                    (err) => console.error(err)
                )

        }, [distpatch]
    )
    let informacionPersonalState = useSelector(
        state => state.informacionPersonal.data.personal
    )
    const columns = [
        { key: 'identificacion', text: 'Doc. Id.', sortable: true },
        { key: 'apellidos', text: 'Apellido', sortable: true },
        { key: 'nombres', text: 'Nombres', sortable: true },
        { key: 'correo_institucional', text: 'Correo institucional', sortable: true },
        { key: 'opciones', text: 'Opciones', sortable: false }
    ]
    let rows = informacionPersonalState.map(
        (row, index) => {
            return {
                identificacion: row.identificacion,
                apellidos: `${row.primer_apellido} ${row.segundo_apellido}`,
                nombres: `${row.primer_nombre} ${row.segundo_nombre}`,
                correo_institucional: row.correo_institucional,
                opciones: [
                    <button>Editar</button>,
                    <buton>Expediente Laboral</buton>

                ]
            }
        }
    )

    return (
        <>
            <div className="container">

                <div className="columns is-centered">
                    <div className="column is-half mt-4">
                        <button className="button is-primary is-outlined" onClick={ev => setShowRegistrarPersona(true)}>
                            <span className="icon is-small">
                                <IoPersonAddOutline />
                            </span>
                        </button>
                    </div>
                </div>
                <div className="columns is-centered">
                    <div className="column mt-4" style={{ overflowX: "scroll" }}>
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
                                    length_menu: "Mostrar _MENU_ personal por página",
                                    filter: "Buscar en registros ...",
                                    no_data_text: "No hay personal registrado",
                                    info: "Mostrando _START_ a _END_ de _TOTAL_ personal",
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
            </div>
            {showRegistarPersona &&
                <RegistarPersona title="Registrar personal">
                    

                    <button className="button is-small is-danger mx-3" onClick={ev => setShowRegistrarPersona(false)}>Cancelar</button>
                    <button type="submit" className="button is-success is-small mx-3">Guardar</button>
                </RegistarPersona>}
        </>
    )
}

export default DTH;