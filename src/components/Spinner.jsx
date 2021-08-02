let Spinner = ({ action }) => {
    var estilos = {
        border: '5px solid #82E0AA',
        borderTop: '5px solid  #2ECC71',
        padding: '3px',
        animation: 'spin 1s  infinite',
        width: '25px',
        height: '25px',
        borderRadius: '50%',
        marginTop:'20px'

    }

    return (
        <div className="spinner">
            <div style={estilos}>
                <style>{`
            @keyframes spin {
                 0% { transform: rotate(0deg); }
                 100% { transform: rotate(360deg); }
            }
            .spinner > div{
                display: inline-block;
            }
        `}</style>

            </div>
            <div className="is-size-7"> {action}</div>
        </div>
    )
}

export default Spinner;