import Login from "./components/auth/Login"
import Home from "./components/Home"
import NotImplemented from "./components/NotImplemted"
import Admin from "./components/admin"
import DTH from "./components/dth"
import { Outlet, Navigate } from "react-router"
import ListadoPaises from "./components/admin/options/paises"
import ListadoProvincias from "./components/admin/options/provincias"
import ListadoCantonesProvincias from "./components/admin/options/provincias/ListadoCantones"
import { isAdmin, isValid } from "./services/auth"
import ListadoDiscapacidades from "./components/admin/options/discapacidades"
import ListadoEtnias from "./components/admin/options/etnias"
import ListadoNacionalidades from "./components/admin/options/nacionalidades"
import ListadoTiposDocumentos from "./components/admin/options/tipos-documentos"
import ListadoRelacionesIES from "./components/admin/options/relaciones-ies"
import ListadoTiposEscalafones from './components/admin/options/tipos-escalafones/index'
import ListadoCategoriasContratos from "./components/admin/options/categorias-contratos"
import ListadoTiemposDedicaciones from './components/admin/options/tiempos-dedicaciones/index'
import ListadoNivelesEducativos from './components/admin/options/niveles-educativos/index'
import ListadoTiposFuncionarios from "./components/admin/options/tipos-funcionarios"
import ListadoTiposDocentes from "./components/admin/options/tipos-docentes"
import ListadoCategoriasDocentes from "./components/admin/options/categorias-docentes"
import ListadoEstadosCiviles from "./components/admin/options/estados-civiles"
import ListadoEstructurasInstitucionales from "./components/admin/options/estructura-institucional"
import ListadoAreasInstitucionales from "./components/admin/options/areas-institucionales"
import CV from './components/cv/index'
import ListaExpediente from "./components/dth/ListaExpediente"
import ListadoCamposEstudiosAmplios from "./components/admin/options/campos-amplios"
import ListadoCamposEstudiosEspecificos from "./components/admin/options/campos-especificos"
import ListadoCamposEstudiosDetallados from "./components/admin/options/campos-detallados"
import ListadoTiposBecas from "./components/admin/options/tipos-becas"
import ListadoTiposFinanciamientos from "./components/admin/options/tipos-financiamientos"
import ListadoGrados from "./components/admin/options/grados"
import ListadoIESNacionales from "./components/admin/options/ies-nacionales"
import DAC from './components/dac/index'
import ReportesPeriodo from './components/dac/reportesPeriodo'
import CV_DTH from './components/dth/cv'
import ChangePassword from './components/auth/ChangePassword'
import ListadoRoles from "./components/admin/options/roles"
import ListadoUsuarios from "./components/admin/options/usuarios"

const routes = (user) => [
    {
        path: "/login",
        element: !user || !isValid(user.jwt) ? <Login /> : <Navigate to='/' />
    },
    {
        path: "/",
        element: user && isValid(user.jwt) ? <Home roles={user.userInfo.roles} email={user.userInfo.email} /> : <Navigate to="/login" ></Navigate>
    }, {
        path: "/reset-password",
        element: <NotImplemented />
    }, {
        path: "/admin",
        element: user && isValid(user.jwt) && isAdmin(user.userInfo.roles) ? <Outlet /> : <Navigate to="/login"></Navigate>,
        children: [
            {
                path: '/',
                element: <Admin />
            },
            {
                path: '/roles',
                element: <ListadoRoles />
            },
            {
                path: '/usuarios',
                element: <ListadoUsuarios />
            },
            {
                path: '/paises',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoPaises />
                    }
                ]
            }, {
                path: '/provincias',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoProvincias />
                    }, {
                        path: '/cantones',
                        element: <ListadoCantonesProvincias />
                    }
                ]
            },
            {
                path: '/discapacidades',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoDiscapacidades />
                    }

                ]
            }, {
                path: '/etnias',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoEtnias />
                    }
                ]
            }, {
                path: '/nacionalidades',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoNacionalidades />
                    }
                ]
            }, {
                path: '/tipos-documentos',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiposDocumentos />
                    }

                ]
            }, {
                path: '/relaciones-ies',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoRelacionesIES />
                    }
                ]
            }, {
                path: '/tipos-escalafones',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiposEscalafones />
                    }
                ]
            }, {
                path: '/categorias-contratos',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoCategoriasContratos />

                    }
                ]
            },
            {
                path: '/tiempos-dedicaciones',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiemposDedicaciones />
                    }
                ]
            }, {
                path: '/niveles-educativos',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoNivelesEducativos />
                    }
                ]
            }, {
                path: '/tipos-funcionarios',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiposFuncionarios />
                    }
                ]
            },
            {
                path: '/tipos-docentes',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiposDocentes />
                    }
                ]
            }, {
                path: '/categorias-docentes',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoCategoriasDocentes />
                    }
                ]
            }, {
                path: 'estados-civiles',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoEstadosCiviles />
                    }
                ]
            },
            {
                path: 'estructuras-institucionales',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoEstructurasInstitucionales />
                    }
                ]
            },
            {
                path: 'areas-institucionales',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoAreasInstitucionales />
                    }
                ]
            },
            {
                path: 'campos-estudio-amplio',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoCamposEstudiosAmplios />
                    }, {
                        path: '/especificos',
                        element: <Outlet />,
                        children: [
                            {
                                path: '/',
                                element: <ListadoCamposEstudiosEspecificos />
                            }, {
                                path: '/detallados',
                                element: <Outlet />,
                                children: [
                                    { path: '/', element: <ListadoCamposEstudiosDetallados /> }

                                ]
                            }
                        ]
                    }
                ]
            }, {
                path: 'tipo-becas',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiposBecas />
                    }

                ]
            },
            {
                path: 'tipo-financiamientos',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoTiposFinanciamientos />
                    }

                ]
            },
            {
                path: 'grados',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoGrados />
                    }

                ]
            },
            {
                path: 'ies-nacionales',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ListadoIESNacionales />
                    }

                ]
            }

        ]
    },
    {
        path: '/change-password',
        element: user && isValid(user.jwt) ? <ChangePassword /> : <Navigate to="/login" />
    }, {
        path: '/cv',
        element: <Outlet />,
        children: [
            {
                path: '/',
                element: user && isValid(user.jwt) ? <CV email={user.userInfo.email} /> : <Navigate to="/login" />
            }
        ]
    },

    {
        path: '/dth',
        element: user && isValid(user.jwt) ? <Outlet /> : <Navigate to="/login"></Navigate>,
        children: [
            {
                path: '/',
                element: <DTH />
            }, {
                path: '/expediente',
                element: <Outlet />,
                children: [
                    { path: '/', element: <ListaExpediente /> },
                    {
                        path: '/cv',
                        element: <Outlet />,
                        children: [{
                            path: '/',
                            element: <CV_DTH />
                        }]


                    }
                ]
            }



        ]
    }, {
        path: '/dac',
        element: user && isValid(user.jwt) ? <Outlet /> : <Navigate to="/login"></Navigate>,
        children: [
            {
                path: '/',
                element: <DAC />
            }, {
                path: '/periodo',
                element: <Outlet />,
                children: [
                    {
                        path: '/',
                        element: <ReportesPeriodo />
                    }
                ]
            }]

    }
]
export default routes