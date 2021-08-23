import { Link } from "react-router-dom";
let OptionCard = ({ title, icon, content, url, size }) => {

    return (
        <div className={`column ${size}`}>
            <Link to={url}>
                <div className="card">
                    <header className="card-header">
                        <p className="card-header-title has-text-info">
                            {title}
                           
                        </p>
                       
                    </header>
                    <div className="card-content">
                        <div className="content">
                           <p style={{fontSize:'.9rem', fontWeight:'600'}}> {content} </p>
                           <p className="has-text-centered is-text-centered is-size-1">
                           <span className="icon">
                                {icon}
                            </span>
                           </p>
                           

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