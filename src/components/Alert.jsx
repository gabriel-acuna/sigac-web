import {Fragment} from 'react'

let Alert = (props) => {

    return (

        <div className={`notification ${props.type} mt-3`} >
            <Fragment>
                {props.children}
            </Fragment>

            <div style={{display:'inline-block'}}className='mb-2'>
                {props.content}
            </div>
        </div >

    )
}

export default Alert;