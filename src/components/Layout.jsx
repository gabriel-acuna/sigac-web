import { Fragment } from "react";
import { Routes, Route } from 'react-router-dom';
import Footer from "./Footer";
import { routes } from './../routes';
import NavBar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'

let Layout = (props) => {
    let element = useRoutes(routes);
    let user = useSelector(state => state.user.user)
    console.table(user);
    return (

        <Fragment>
            

            {props.child}
             <NavBar />
             {element}

            <Footer />
        </Fragment>


    )

}

export default Layout;