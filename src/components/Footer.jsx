let Footer = (props) => {
    const estilos = {
        position: 'fixed',
        height: '50px',
        left: '0',
        bottom: '0',
        width:'100%'
    }
    return (
        <footer className="has-background-dark has-text-primary-light has-text-centered" style={estilos}>
            <p className="p-3">&copy; {new Date().getFullYear()} DAC UNESUM</p>
        </footer>
    )
}

export default Footer;