import { Fragment } from 'react'
let ConfirmDialog = (props) => {

    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{props.title}</p>
        
                </header>
                <section className="modal-card-body">
                    Para eleminar {props.info} se necesita su confirmación
                </section>
                <footer className="modal-card-foot" style={{justifyContent:'center'}}>
                    
                    <Fragment>
                        {props.children}
                    </Fragment>
                </footer>
            </div>
        </div>
    )
}

export default ConfirmDialog;