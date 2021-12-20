import { Fragment } from 'react'
import Alert from './Alert'
let AlertModal = ({ message, type, children }) => {
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card" style={{width:'300px'}}>

                <Alert type={`is-${type} is-light`} content={message}>
                    <Fragment>
                        {children}
                    </Fragment>
                </Alert>

            </div>
        </div>
    )
}
export default AlertModal