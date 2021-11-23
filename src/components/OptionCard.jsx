import { Fragment, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
let OptionCard = ({ title, columns, rows, children }) => {
    const [expandir, setExpandir] = useState(false)
    return (
        <div className="card">
            <header className="card-header" onClick={() => setExpandir(!expandir)}>
                <p className="card-header-title" >{title}</p>
                <button className="card-header-icon" aria-label="more options">
                    <span className="icon">
                        {expandir ? <AiOutlineMinus /> : <AiOutlinePlus />}
                    </span>
                </button>
            </header>
            {
                expandir && <div className="card-content">
                    <Fragment>
                        {children}
                    </Fragment>
                    <div className="table-container mt-1">
                        <table className="table is-bordered">
                            <thead>
                                <tr>
                                    {
                                        columns.map(
                                            (col) => (
                                                <th>{col}</th>
                                            )
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

        </div>
    )
}

export default OptionCard;