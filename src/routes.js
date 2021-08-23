import Login from "./components/auth/Login";
import Home from "./components/Home";
import NotImplemented from "./components/NotImplemted";
import Admin from "./components/admin";

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
    },{
        path:"/admin",
        component:Admin
    },
    {
        path:'/change-password',
        component: NotImplemented
    },
    {
        path:'/admin/usuarios-roles',
        component: NotImplemented
    },
    {
        path:'/admin/paises',
        component: NotImplemented
    },{
        path:'/admin/provincias-cantones',
        component: NotImplemented
    },
    {
        path:'/admin/dicapacidades',
        component: NotImplemented
    }, {
        path:'/admin/etnias',
        component: NotImplemented
    }, {
        path:'/admin/nacionalidades',
        component: NotImplemented
    }, {
        path:'/admin/tipos-documentos',
        component: NotImplemented
    }, {
        path:'/admin/relación-ies',
        component: NotImplemented
    },{
        path:'/admin/tipo-escalafon',
        component: NotImplemented
    }, {
        path:'/admin/categoria-contrato',
        component: NotImplemented
    }, 
    {
        path:'/admin/tiempo-dedicacion',
        component: NotImplemented
    }, {
        path:'/admin/nivel-educativo',
        component: NotImplemented
    }, {
        path:'/admin/tipo-funcionario',
        component: NotImplemented
    },
    {
        path:'/admin/tipo-docente',
        component: NotImplemented
    }, {
        path:'/admin/categoria-docente',
        component: NotImplemented
    }
];