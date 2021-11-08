import Login from "./components/auth/Login";
import Home from "./components/Home";
import NotImplemented from "./components/NotImplemted";
import Admin from "./components/admin";
import DTH from "./components/dth";
import { Outlet, Navigate } from "react-router";
import ListadoPaises from "./components/admin/options/paises";
import ListadoProvincias from "./components/admin/options/provincias";
import ListadoCantonesProvincias from "./components/admin/options/provincias/ListadoCantones";
import isValid from "./services/auth";
import ListadoDiscapacidades from "./components/admin/options/discapacidades";
import ListadoEtnias from "./components/admin/options/etnias";
import ListadoNacionalidades from "./components/admin/options/nacionalidades";
import ListadoTiposDocumentos from "./components/admin/options/tipos-documentos";
import ListadoRelacionesIES from "./components/admin/options/relaciones-ies";
import ListadoTiposEscalafones from './components/admin/options/tipos-escalafones/index';
import ListadoCategoriasContratos from "./components/admin/options/categorias-contratos";
import  ListadoTiemposDedicaciones from './components/admin/options/tiempos-dedicaciones/index'
import ListadoNivelesEducativos from './components/admin/options/niveles-educativos/index'
import ListadoTiposFuncionarios from "./components/admin/options/tipos-funcionarios";
import ListadoTiposDocentes from "./components/admin/options/tipos-docentes";
import ListadoCategoriasDocentes from "./components/admin/options/categorias-docentes";
import ListadoEstadosCiviles from "./components/admin/options/estados-civiles";
import ListadoEstructurasInstitucionales from "./components/admin/options/estructura-institucional";
import ListadoAreasInstitucionales from "./components/admin/options/areas-institucionales";
import CV from './components/cv/index'
import ListaExpediente from "./components/dth/ListaExpediente";

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
                path: '/provincias',
                element: <Outlet/>,
                children:[
                    {
                        path:'/',
                        element: <ListadoProvincias/>
                    },{
                        path:'/cantones',
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
                    }
                    
                ]
            }, {
                path: '/etnias',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoEtnias/>
                    }
                ]
            }, {
                path: '/nacionalidades',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoNacionalidades/>
                    }
                ]
            }, {
                path: '/tipos-documentos',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoTiposDocumentos/>
                    }
                   
                ]
            }, {
                path: '/relaciones-ies',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoRelacionesIES/>
                    }
                ]
            }, {
                path: '/tipos-escalafones',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoTiposEscalafones/>
                    }
                ]
            }, {
                path: '/categorias-contratos',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoCategoriasContratos/>
                
                    }
                ]
            },
            {
                path: '/tiempos-dedicaciones',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoTiemposDedicaciones/>
                    }
                ]
            }, {
                path: '/niveles-educativos',
                element: <Outlet/>,
                children: [
                    {
                        path: '/',
                        element: <ListadoNivelesEducativos/>
                    }
                ]
            }, {
                path: '/tipos-funcionarios',
                element: <Outlet/>,
                children:[
                    {
                        path: '/',
                        element: <ListadoTiposFuncionarios/>
                    }
                ]
            },
            {
                path: '/tipos-docentes',
                element: <Outlet/>,
                children:[
                    {
                        path: '/',
                        element: <ListadoTiposDocentes/>
                    }
                ]
            }, {
                path: '/categorias-docentes',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoCategoriasDocentes/>
                    }
                ]
            },{
                path: 'estados-civiles',
                element: <Outlet/>,
                children:[
                    {
                        path:'/',
                        element: <ListadoEstadosCiviles/>
                    }
                ]
            },
            {
                path: 'estructuras-institucionales',
                element: <Outlet/>,
                children:[
                    {
                        path:'/',
                        element: <ListadoEstructurasInstitucionales/>
                    }
                ]
            },
            {
                path: 'areas-institucionales',
                element: <Outlet/>,
                children:[
                    {
                        path:'/',
                        element: <ListadoAreasInstitucionales/>
                    }
                ]
            }

        ]
    },
    {
        path: '/change-password',
        element: <NotImplemented/>
    },{
        path:'/cv',
        element: <Outlet/>,
        children:[
            {
                path: '/',
                element: user && isValid(user.jwt)? <CV email= {user.userInfo.email}/> : <Navigate to="/login"/>
            }
        ]
    },
   
    {
        path: '/dth',
        element: user && isValid(user.jwt)? <Outlet/> : <Navigate to="/login"></Navigate>,
        children: [
            {
                path: '/',
                element: <DTH/>
            },{
                path:'/expediente',
                element: <ListaExpediente/>
            }
            

           
        ]
    },
];
export default routes;