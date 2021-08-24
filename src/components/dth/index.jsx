import React from 'react'; 
import { options } from './options'
import OptionCard from '../OptionCard'

let DTH = (props) => { 
    const size = 'is-6'
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

export default DTH;