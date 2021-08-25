import {Fragment} from 'react'

let Alert = (props) => {

    return (

        <div className={`notification ${props.type} mt-3`} >
            <Fragment>
                {props.children}
            </Fragment>

            <p>
                {props.content}
            </p>
        </div >

    )
}

export default Alert;