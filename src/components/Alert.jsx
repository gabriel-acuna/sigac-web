import {Fragment} from 'react'

let Alert = (props) => {

    return (

        <div className={`notification ${props.type} mt-3`} >
            <Fragment>
                {props.children}
            </Fragment>

            <div className='has-text-centered'>
                {props.content}
            </div>
        </div >

    )
}

export default Alert;