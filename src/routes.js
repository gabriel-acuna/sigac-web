import Login from "./components/auth/Login";
import Home from "./components/Home";
import NotImplemented from "./components/NotImplemted";
import Admin from "./components/admin";
import DTH from "./components/dth";
import Profesores from "./components/dth/profesores";
import Funcionarios from "./components/dth/funcionarios";
import RegistrarFuncionario from "./components/dth/funcionarios/nuevo";
import ContratoFuncionario from "./components/dth/funcionarios/contrato";
import ContratoProfesor from "./components/dth/profesores/contrato";
import RegistrarProfesor from "./components/dth/profesores/nuevo";
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
import RegistrarRelacion from "./components/admin/options/relaciones-ies/RegistrarRelacion";
import EditarRelacionIES from "./components/admin/options/relaciones-ies/EditarRelacion";
import ListadoTiposEscalafones from './components/admin/options/tipos-escalafones/index';
import RegistrarTipoEscalafon from './components/admin/options/tipos-escalafones/RegistrarTipoEscalafon'
import EditarTipoEscalafon from './components/admin/options/tipos-escalafones/EditarTipoEscalafon'
import ListadoCategoriasContratos from "./components/admin/options/categorias-contratos";
import RegistrarCategoriaContrato from "./components/admin/options/categorias-contratos/RegistrarCategoriaContrato";
import EditarCategoriaContrato from "./components/admin/options/categorias-contratos/EditarCategoriaContrato";
import  ListadoTiemposDedicaciones from './components/admin/options/tiempos-dedicaciones/index'
import RegistrarTiempoDedicacion from './components/admin/options/tiempos-dedicaciones/RegistrarTiempoDedicacion'
import EditarTiempoDedicacion from './components/admin/options/tiempos-dedicaciones/EditarTiempoDedicacion'
import ListadoNivelesEducativos from './components/admin/options/niveles-educativos/index'
import RegistrarNivelEducativo from "./components/admin/options/niveles-educativos/RegistrarNivelEducativo";
import EditarNivelEducativo from "./components/admin/options/niveles-educativos/EditarNivelEducativo";
import ListadoTiposFuncionarios from "./components/admin/options/tipos-funcionarios";
import RegistrarTipoFuncionario from "./components/admin/options/tipos-funcionarios/RegistrarTipoFuncionario";
import EditarTipoFuncionario from "./components/admin/options/tipos-funcionarios/EditarTipoFuncionario";
import ListadoTiposDocentes from "./components/admin/options/tipos-docentes";
import RegistrarTipoDocente from "./components/admin/options/tipos-docentes/RegistrarTipoDocente";
import EditarTipoDocente from "./components/admin/options/tipos-docentes/EditarTipoDocente";
import ListadoCategoriasDocentes from "./components/admin/options/categorias-docentes";
import RegistrarCategoriaDocente from "./components/admin/options/categorias-docentes/RegistrarCategoriaDocente";
import EditarCategoriaDocente from "./components/admin/options/categorias-docentes/EditarCategoriaDocente";
import RegistrarPersona from './components/dth/nuevo';
import ListadoEstadosCiviles from "./components/admin/options/estados-civiles";
import ListadoEstructurasInstitucionales from "./components/admin/options/estructura-institucional";
import ListadoAreasInstitucionales from "./components/admin/options/areas-institucionales";
import CV from './components/cv/index'
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
                    },
                    {
                        path: '/registrar',
                        element: <RegistrarRelacion/>
                    },{
                        path:'/editar/:id',
                        element: <EditarRelacionIES/>
                    }
                ]
            }, {
                path: '/tipos-escalafones',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoTiposEscalafones/>
                    },
                    {
                        path: '/registrar',
                        element: <RegistrarTipoEscalafon/>
                    },{
                        path:'/editar/:id',
                        element: <EditarTipoEscalafon/>
                    }
                ]
            }, {
                path: '/categorias-contratos',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoCategoriasContratos/>
                    },
                    {
                        path: '/registrar',
                        element: <RegistrarCategoriaContrato/>
                    },{
                        path:'/editar/:id',
                        element: <EditarCategoriaContrato/>
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
                    },
                    {
                        path: '/registrar',
                        element: <RegistrarTiempoDedicacion/>
                    },{
                        path:'/editar/:id',
                        element: <EditarTiempoDedicacion/>
                    }
                ]
            }, {
                path: '/niveles-educativos',
                element: <Outlet/>,
                children: [
                    {
                        path: '/',
                        element: <ListadoNivelesEducativos/>
                    },{
                        path:'/registrar',
                        element: <RegistrarNivelEducativo/>
                    },
                    {
                        path: '/editar/:id',
                        element:<EditarNivelEducativo/>
                    }
                ]
            }, {
                path: '/tipos-funcionarios',
                element: <Outlet/>,
                children:[
                    {
                        path: '/',
                        element: <ListadoTiposFuncionarios/>
                    },{
                        path:'/registrar',
                        element: <RegistrarTipoFuncionario/>
                    },
                    {
                        path: '/editar/:id',
                        element:<EditarTipoFuncionario/>
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
                    },{
                        path:'/registrar',
                        element: <RegistrarTipoDocente/>
                    },
                    {
                        path: '/editar/:id',
                        element:<EditarTipoDocente/>
                    }
                ]
            }, {
                path: '/categorias-docentes',
                element: <Outlet/>,
                children: [
                    {
                        path:'/',
                        element: <ListadoCategoriasDocentes/>
                    },{
                        path: '/registrar',
                        element: <RegistrarCategoriaDocente/>
                    }, {
                        path: '/editar/:id',
                        element: <EditarCategoriaDocente/>
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
                path:'/registrar',
                element:<RegistrarPersona/>
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
                        element: <RegistrarProfesor/>
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
                        element: <RegistrarFuncionario/>
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