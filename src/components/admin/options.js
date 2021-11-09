import { FaCity, FaBlind, FaUniversity, FaBookReader } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { GiSouthAmerica, GiFarmer, GiPlayerTime, GiOrganigram, GiTeamUpgrade, GiTeacher, GiReceiveMoney,GiDiploma, GiMoneyStack } from 'react-icons/gi'
import { GrWorkshop } from 'react-icons/gr'
import { BsPersonCheck } from 'react-icons/bs'
import { VscOrganization } from 'react-icons/vsc'
import { MdPeople } from 'react-icons/md'
import { ImOffice } from 'react-icons/im'
import { AiOutlineTags } from 'react-icons/ai'


export const options = [
    /*{
        title: 'Usuarios y Roles',
        icon: <FaUsersCog />,
        content: 'Administre cuentas de usuarios del sistema y asigne roles a usuarios.',
        url: '/admin/usuarios-roles'
    },*/
    {
        title: 'Información demográfica',
        options: [{
            title: 'Paises',
            icon: <GiSouthAmerica />,
            content: 'Gestione el lsitado de paises de origen para funcionarios, docentes y alumnos.',
            url: '/admin/paises'

        },
        {
            title: 'Provincias y Cantones',
            icon: <FaCity />,
            content: 'Gestione el listado de provincias y cantones.',
            url: '/admin/provincias'

        }, {
            title: 'Discapacidades',
            icon: <FaBlind />,
            content: 'Gestione las opciones de tipo de discapcidades.',
            url: '/admin/discapacidades'

        }, {
            title: 'Etnias',
            icon: <IoIosPeople />,
            content: 'Gestione las opciones de autoidentifiación étnica.',
            url: '/admin/etnias'

        }, {
            title: 'Nacionalidades',
            icon: <GiFarmer />,
            content: 'Gestione el listado de nacionalidades vinculadas a la autoidentifiación étnica.',
            url: '/admin/nacionalidades'

        },
        {
            title: 'Estados civiles',
            icon: <MdPeople />,
            content: 'Gestione el listado de nacionalidades vinculadas a la autoidentifiación étnica.',
            url: '/admin/estados-civiles'

        }
        ]
    },
    {
        title: 'Información Laboral',
        options: [{
            title: 'Tipos Documentos',
            icon: <IoDocumentTextOutline />,
            content: 'Gestione de tipos de documentos de realaciones laborales asignados a profesores.',
            url: '/admin/tipos-documentos'

        },
        {
            title: 'Relación IES',
            icon: <GrWorkshop />,
            content: 'Gestione los tipos de relaciones entre profesores y la Intitución de Educaión Superior.',
            url: '/admin/relaciones-ies'

        },
        {
            title: 'Tipo escalafón nombramiento',
            icon: <GiTeamUpgrade />,
            content: 'Gestione los tipos de escalafones asociados a los nombramientos de los profesores.',
            url: '/admin/tipos-escalafones'
        },
        {
            title: 'Categoría contrato profesor',
            icon: <BsPersonCheck />,
            content: 'Gestione las categorías de contratación del profesorado de la IES.',
            url: '/admin/categorias-contratos'
        },
        {
            title: 'Tiempo dedicación profesor',
            icon: <GiPlayerTime />,
            content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
            url: '/admin/tiempos-dedicaciones'
        }, {
            title: 'Nivel educativo',
            icon: <GiTeacher />,
            content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
            url: '/admin/niveles-educativos'
        },
        {
            title: 'Tipo funcionario',
            icon: <VscOrganization />,
            content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
            url: '/admin/tipos-funcionarios'
        },
        {
            title: 'Tipo docente LOES',
            icon: <GrWorkshop />,
            content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
            url: '/admin/tipos-docentes'
        }, {
            title: 'Categoría docente LOSEP',
            icon: < AiOutlineTags />,
            content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
            url: '/admin/categorias-docentes'
        }
        ]
    }, {
        title: 'Información Institucional',
        options: [
            {
                title: 'Estructura orgánica',
                icon: <GiOrganigram />,
                content: '',
                url: '/admin/estructuras-institucionales'
            }, {
                title: 'Areas institucionales',
                icon: <ImOffice />,
                content: '',
                url: '/admin/areas-institucionales',

            }
        ]
    },
    {
        title: 'Información Formación Académica',
        options: [
            {
                title: 'Campos de estudio',
                icon: <FaBookReader />,
                content: '',
                url: '/admin/campos-estudio-amplio'
            },
            {
                title: 'Tipos de becas',
                icon: <GiReceiveMoney />,
                content: '',
                url: ''

            },
            {
                title: 'Tipos de financiamiento',
                icon: <GiMoneyStack />,
                content: '',
                url: '',

            },
            {
                title: 'Grados',
                icon: <GiDiploma />,
                content: '',
                url: '',

            },
            {
                title: 'IES Nacionales',
                icon: <FaUniversity />,
                content: '',
                url: '',

            }
            
        ]
    }

]