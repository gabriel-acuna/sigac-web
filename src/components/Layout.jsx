import { Fragment, useEffect } from "react";
import Footer from "./Footer";
import routes from './../routes';
import NavBar from "./Navbar";
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'



let Layout = (props) => {

    let  user = useSelector(state => state.user.user)
    let element =  useRoutes(routes(user));
    

    return (

        <Fragment>


            {props.child}
            {user && <NavBar />}
            {element}

            <Footer />
        </Fragment>


    )

}

export default Layout;