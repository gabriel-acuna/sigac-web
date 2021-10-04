import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const Accordion = ({ title, options }) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div className="card">
            <header className="card-header" onClick={() => setExpanded(!expanded)}>
                <p className="card-header-title">
                    {title}
                </p>
                <button className="card-header-icon" aria-label="more options">
                    <span className="icon">
                        {expanded ? <AiOutlineMinus /> : <AiOutlinePlus />}
                    </span>
                </button>
            </header>
           { expanded && <div className="card-content">
                {
                    options.map(
                        (option, index) => (
                            <p key={index}>
                                {option.title} <Link className="mx-2 is-small button" to={option.url}>
                                    <span className="icon"> {option.icon}</span>
                                </Link>
                            </p>
                        )
                    )
                }
            </div>}
        </div>
    )
}

export default Accordion