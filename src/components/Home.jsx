import { Fragment } from "react";
import Alert from "./Alert";
import Spinner from './Spinner'
let Home = (props) => {

    return (
        <Fragment>
            <div className="container">
                {props.child}
                <div className="colums is-multiline is-centered">
                    <div className="column is-half">
                        <form className="field">
                            <label>Selelcione un rol</label>
                            <div className="select">
                                <select>
                                    <opttion>o</opttion>
                                </select>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default Home;