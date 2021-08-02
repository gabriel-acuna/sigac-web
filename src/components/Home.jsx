import { Fragment } from "react";
import Alert from "./Alert";
import Spinner from './Spinner'
let Home = (props) => {

    return (
        <Fragment>
            <div className="container">
                {props.child}
               <div className="colums is-multiline">
                   
               </div>
            </div>
        </Fragment>

    )
}

export default Home;