import { Fragment, useEffect } from "react";
import { Routes, Route } from 'react-router-dom';
import Footer from "./Footer";
import  routes  from './../routes';
import NavBar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes, useNavigate } from 'react-router-dom'
import isValid from '../utils/auth'
import { logOut } from "../store/user";


let Layout = (props) => {
    
    let user = useSelector(state => state.user.user)
    let element = useRoutes(routes(user, isValid));
    let dispatch = useDispatch()

   
    
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