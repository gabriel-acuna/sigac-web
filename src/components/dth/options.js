import { IoIosPeople } from 'react-icons/io'
import { GiTeacher } from 'react-icons/gi'

export const options = [
    {
        title: 'Profesores',
        icon: < GiTeacher/>,
        content: 'Gestione información referente a los profeosres pertnecientes a la IES.',
        url: '/dth/profesores'
    },
    {
        title: 'Funcionarios',
        icon: <IoIosPeople />,
        content: 'Gestione información referente a los funcionarios pertnecientes a la IES.',
        url: '/dth/funcionarios'
    }
]