import { Link } from "react-router-dom";
let OptionCard = ({ title, icon, content, url }) => {

    return (
        <div className="column is-half">
            <Link to={url}>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title">
                            {title}
                           
                        </p>
                        <div className="card-header-icon" aria-label="more options">
                            <span className="icon">
                                {icon}
                            </span>
                        </div>
                    </header>
                    <div className="card-content">
                        <div className="content">
                            {content}



                        </div>
                    </div>
                    <footer className="card-footer">

                    </footer>
                </div>
            </Link>

        </div>
    )
}

export default OptionCard;