import Login from "./components/auth/Login";
import Home from "./components/Home";
import NotImplemented from "./components/NotImplemted";

export const routes = [
    {
        path:"/login",
        component: Login
    },
    {
        path:"/",
        component:Home
    },{
        path:"/reset-password",
        component:NotImplemented
    }
];