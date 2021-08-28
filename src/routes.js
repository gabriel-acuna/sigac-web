import Login from "./components/auth/Login";
import Home from "./components/Home";
import NotImplemented from "./components/NotImplemted";
import Admin from "./components/admin";
import DTH from "./components/dth";
import Profesores from "./components/dth/profesores";
import Funcionarios from "./components/dth/funcionarios";
import RegistarFuncionario from "./components/dth/funcionarios/nuevo";
import ContratoFuncionario from "./components/dth/funcionarios/contrato";
import ContratoProfesor from "./components/dth/profesores/contrato";
import RegistarProfesor from "./components/dth/profesores/nuevo";
import { Outlet, Navigate } from "react-router";
import ListadoPaises from "./components/admin/options/paises";
import ListadoProvincias from "./components/admin/options/provincias";
import ListadoCantonesProvincias from "./components/admin/options/provincias/ListadoCantones";

const routes = (user)=> [
    {
        path: "/login",
        element: !user ? <Login/>: <Navigate to='/'/>
    },
    {
        path: "/",
        element: user ? <Home roles= {user.userInfo.roles}/> : <Navigate to="/login"></Navigate>
    }, {
        path: "/reset-password",
        element: <NotImplemented/>
    }, {
        path: "/admin",
        element: user ? <Outlet/> : <Navigate to="/login"></Navigate>,
        children: [
            {
                path:'/',
                element: <Admin/>
            },
            {
                path: '/usuarios-roles',
                element: <NotImplemented/>
            },
            {
                path: '/paises',
                element: <Outlet/>,
                children: [
                    {
                        path: '/',
                        element: <ListadoPaises/>
                    }
                ]
            }, {
                path: '/provincias-cantones',
                element: <Outlet/>,
                children:[
                    {
                        path:'/',
                        element: <ListadoProvincias/>
                    },{
                        path:'/:id',
                        element:<ListadoCantonesProvincias/>
                    }
                ]
            },
            {
                path: '/discapacidades',
                element: <NotImplemented/>
            }, {
                path: '/etnias',
                element: <NotImplemented/>
            }, {
                path: '/nacionalidades',
                element: <NotImplemented/>
            }, {
                path: '/tipos-documentos',
                element: <NotImplemented/>
            }, {
                path: '/relacion-ies',
                element: <NotImplemented/>
            }, {
                path: '/tipo-escalafon',
                element: <NotImplemented/>
            }, {
                path: '/categoria-contrato',
                element: <NotImplemented/>
            },
            {
                path: '/tiempo-dedicacion',
                element: <NotImplemented/>
            }, {
                path: '/nivel-educativo',
                element: <NotImplemented/>
            }, {
                path: '/tipo-funcionario',
                element: <NotImplemented/>
            },
            {
                path: '/tipo-docente',
                element: <NotImplemented/>
            }, {
                path: '/categoria-docente',
                element: <NotImplemented/>
            }

        ]
    },
    {
        path: '/change-password',
        element: <NotImplemented/>
    },
   
    {
        path: '/dth',
        element: <Outlet/>,
        children: [
            {
                path: '/',
                element: <DTH/>
            },
            {
                path: '/profesores',
                element: <Outlet/>,
                children: [
                    {
                        path: '/',
                        element: <Profesores/>
                    },
                    {
                        path: '/nuevo',
                        element: <RegistarProfesor/>
                    }
                   
                ]
            },
            {
                path: '/profesor-contrato/:id',
                element: <ContratoProfesor/>
            },
            {
                path: '/funcionarios',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <Funcionarios/>
                    },
                    {
                        path: '/nuevo',
                        element: <RegistarFuncionario/>
                    }
                   
                ]
            },
            {
                path: '/funcionario-contrato/:id',
                element: <ContratoFuncionario/>
            }
            
           
        ]
    },
];
export default routes;