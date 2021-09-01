import { FaUsersCog, FaCity, FaBlind } from 'react-icons/fa';
import { IoIosPeople } from 'react-icons/io'
import { IoDocumentTextOutline } from 'react-icons/io5'
import { GiSouthAmerica, GiFarmer, GiPlayerTime, GiOrganigram, GiTeamUpgrade, GiTeacher } from 'react-icons/gi'
import { GrWorkshop } from 'react-icons/gr'
import { BsPersonCheck } from 'react-icons/bs'
import { VscOrganization } from 'react-icons/vsc'

export const options = [
    {
        title: 'Usuarios y Roles',
        icon: <FaUsersCog />,
        content: 'Administre cuentas de usuarios del sistema y asigne roles a usuarios.',
        url: '/admin/usuarios-roles'
    },
    {
        title: 'Paises',
        icon: <GiSouthAmerica />,
        content: 'Gestione el lsitado de paises de origen para funcionarios, docentes y alumnos.',
        url: '/admin/paises'

    },
    {
        title: 'Provincias y Cantones',
        icon: <FaCity />,
        content: 'Gestione el listado de provincias y cantones.',
        url: '/admin/provincias-cantones'

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
        url: '/admin/categoria-contrato'
    },
    {
        title: 'Tiempo dedicación profesor',
        icon: <GiPlayerTime />,
        content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
        url: '/admin/tiempo-dedicacion'
    }, {
        title: 'Nivel educativo',
        icon: <GiTeacher />,
        content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
        url: '/admin/nivel-educativo'
    },
    {
        title: 'Tipo funcionario',
        icon: <VscOrganization />,
        content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
        url: '/admin/tipo-funcionario'
    },
    {
        title: 'Tipo docente LOES',
        icon: <GiOrganigram />,
        content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
        url: '/admin/tipo-docente'
    }, {
        title: 'Categoría docente LOSEP',
        icon: < GiPlayerTime />,
        content: 'Gestione el tiempo de dedicación del profesorado de la IES.',
        url: '/admin/categoria-docente'
    }

]