import { Fragment, useEffect } from "react";
import Footer from "./Footer";
import routes from './../routes';
import NavBar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'
import isValid from '../services/auth'
import { logOut } from "../store/user";


let Layout = (props) => {

    let user = useSelector(state => state.user.user)
    let element = useRoutes(routes(user));
    let dispatch = useDispatch()
    
   
    useEffect(
        () => {
            if (user)
               if(! isValid(user.jwt))
                    dispatch(
                        logOut()
                    )
                   

        }, [user, dispatch]
    )

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