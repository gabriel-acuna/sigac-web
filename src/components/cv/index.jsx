import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { IoIosArrowBack, IoIosAddCircleOutline } from 'react-icons/io'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
const CV = ({ email }) => {
    const navigate = useNavigate();
    const [expandirReferencias, setExpandirReferencia] = useState(false)
    const [expandirCapacitaciones, setExpandirCapacitaciones] = useState(false)

    return (
        <div className="container">
            {email}
            <div className="columns is-centered is-multiline">
                <div className="column is-half">
                    <button className="button is-info mt-4 mx-3 is-outlined"
                        onClick={event => {
                            navigate(-1);

                        }}>
                        <span className="icon">
                            <IoIosArrowBack />
                        </span>
                    </button>

                </div>
            </div>
            <div className="columns is-centered is-multiline">


                <div className="column is-half">
                    <div className="card">
                        <header className="card-header" onClick={() => setExpandirReferencia(!expandirReferencias)}>
                            <p className="card-header-title">
                                Referencias <button className="button  is-success mx-3 is-outlined">
                                    <span className="icon">
                                        <IoIosAddCircleOutline />
                                    </span>
                                </button>
                            </p>
                            <button className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    {expandirReferencias ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                </span>
                            </button>
                        </header>
                        {
                            expandirReferencias && <div className="card-content">

                            </div>
                        }
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <header className="card-header" onClick={() => setExpandirCapacitaciones(!expandirCapacitaciones)}>
                            <p className="card-header-title">
                                Capacitaciones
                                <button className="button  is-success mx-3 is-outlined">
                                    <span className="icon">
                                        <IoIosAddCircleOutline />
                                    </span>
                                </button>
                            </p>
                            <button className="card-header-icon" aria-label="more options">
                                <span className="icon">
                                    {expandirCapacitaciones ? <AiOutlineMinus /> : <AiOutlinePlus />}
                                </span>
                            </button>
                        </header>
                        {
                            expandirCapacitaciones && <div className="card-content">

                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CV;