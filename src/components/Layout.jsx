import { Fragment } from "react";
import { Switch, Route } from 'react-router-dom';
import Footer from "./Footer";
import { routes } from './../routes';

let Layout = (props) => {
    return (
        <Fragment>


            {props.child}

            <Switch>
                {routes.map((r, i) => (
                    <Route component={r.component} exact path={r.path} key={i} />
                ))}
            </Switch>
            <Footer />
        </Fragment>
    )

}

export default Layout;