import Accordion from '../Accordion'

import { options } from './options'


let Admin = (props) => {


    return (
        <div className="container">
        
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