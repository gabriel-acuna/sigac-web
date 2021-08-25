import OptionCard from '../OptionCard'
import { options } from './options'
import { Outlet } from 'react-router-dom'
let Admin = (props) => {
    const size = 'is-3'

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
                                <OptionCard title={option.title} icon={option.icon} url={option.url} content={option.content} key={index} size={size} />
                            ))
                        }

                    </div>
                </div>
                )
}

                export default Admin;