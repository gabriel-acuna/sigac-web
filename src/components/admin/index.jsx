import OptionCard from '../OptionCard'
import {options} from './options'
let Admin = (props) => {
    const size = 'is-3'
    
    return (
        <div className="container">
            <div className="columns is-multiline mt-4 mb-6">
                {
                    options.map((option, index) => (
                        <OptionCard title={option.title} icon={option.icon} url={option.url} content={option.content} key={index}  size={size}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Admin;