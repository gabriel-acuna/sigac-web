import { useHistory } from 'react-router-dom';
import programming from '../assets/undraw_programming_2svr.png';
let NotImplemented = (props) => {
    const history = useHistory();
    let goBack = ()=>{
        history.goBack()
    }
    return (
        <div className="columns">
            <div className="column is-full has-text-centered"> 
                <button  className="button is-small is-info mt-4" onClick={event => goBack(event)}>Regresar</button>
                <figure>
                    <img src={programming} alt="en desarrollo" style={{ width: '65%' }} />
                </figure>
                <p className="subtitle">En desarrollo ... </p>
            </div>



        </div>
    )
}

export default NotImplemented;