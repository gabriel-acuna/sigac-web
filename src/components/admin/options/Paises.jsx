import ReactDatatable from '@ashvin27/react-datatable';
import { useNavigate} from 'react-router-dom';
let Component = (props) => { 
    let navigate = useNavigate()

    const columns = [
       { key:'nombre', text:'Nombre', sortable:true},
       {key: 'nacionalidad', text: 'Nacionalidad', sortable:true }

    ]

    
    let paisesState = useSelector(state=>state.paises);

    return (
        <div className="conatiner">
           <button  className="button is-small is-info mt-4" onClick={event => navigate(-1)}>Regresar</button>
        </div>
    )
}

export default Component;