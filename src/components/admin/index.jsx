import Accordion from '../Accordion'

import { options } from './options'


let Admin = (props) => {


    return (
        <div className="container">
            {/**<div className="panel">
                <p className="panel-heading">
                    Opciones
                </p>
                <div className="panel-block">
                    <p className="control has-icons-left">
                        <input className="input" type="text" placeholder="Buscar"/>
                            <span className="icon is-left">
                                <i className="fas fa-search" aria-hidden="true"></i>
                            </span>
                    </p>
                </div>
            </div>**/}

            <div className="columns is-multiline mt-4 mb-6">
                {
                    options.map((option, index) => (

                        <div className="column is-4" key={index}>
                            <Accordion title={option.title} options={option.options} />
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Admin;