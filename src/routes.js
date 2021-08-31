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
import isValid from "./services/auth";
import ListadoDiscapacidades from "./components/admin/options/discapacidades";
import RegistrarDiscapacidad from "./components/admin/options/discapacidades/RegistarDiscapacidad";
import EditarDiscapacidad from "./components/admin/options/discapacidades/EditarDiscapacidad";
import ListadoEtnias from "./components/admin/options/etnias";
import RegistrarEtnia from "./components/admin/options/etnias/RegistarEtnia";
import EditarEtnia from "./components/admin/options/etnias/EditarEtnia";
import ListadoNacionalidades from "./components/admin/options/nacionalidades";
import RegistrarNacionalidad from "./components/admin/options/nacionalidades/RegistarNacionalidad";
import EditarNacionalidad from "./components/admin/options/nacionalidades/EditarNacionalidad";

const routes = (user)=> [
    {
        path: "/login",
        element: !user  || !isValid(user.jwt)? <Login/>: <Navigate to='/'/>
    },
    {
        path: "/",
        element: user && isValid(user.jwt)? <Home roles= {user.userInfo.roles}/> : <Navigate to="/login" ></Navigate>
    }, {
        path: "/reset-password",
        element: <NotImplemented/>
    }, {
        path: "/admin",
        element: user && user && isValid ? <Outlet/> : <Navigate to="/login"></Navigate>,
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
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoDiscapacidades/>
                    },
                    {
                        path:'/registrar',
                        element:<RegistrarDiscapacidad/>
                    },
                    {
                        path:'/editar/:id',
                        element:<EditarDiscapacidad/>
                    }
                ]
            }, {
                path: '/etnias',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoEtnias/>
                    },
                    {
                        path: '/registrar',
                        element: <RegistrarEtnia/>
                    },{
                        path:'/editar/:id',
                        element: <EditarEtnia/>
                    }
                ]
            }, {
                path: '/nacionalidades',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoNacionalidades/>
                    },
                    {
                        path: '/registrar',
                        element: <RegistrarNacionalidad/>
                    },{
                        path:'/editar/:id',
                        element: <EditarNacionalidad/>
                    }
                ]
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