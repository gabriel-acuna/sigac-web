import { Fragment, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { loadPersonaEmail } from '../store/dth/informacion_personal'
import { useDispatch } from 'react-redux'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { isAdmin, isHR, isQA } from "../services/auth"
import CV from "./cv/index"
import TabPanel from './TabPanel'

let Home = ({ email, roles, child }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)
    const a11yProps = (index) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}`, })
    const [activeTab, setActiveTab] = useState(0)

    useEffect(() => {
        dispatch(loadPersonaEmail(email)).unwrap()
            .then(
                resp => setCurrentUser(resp)
            )
    }, [currentUser])
    let redirigir = (rol) => {
        if (rol)
            if (rol.toLowerCase().includes('admin')) {
                navigate('/admin')
            }
    }
    return (
        <Fragment>
            <div className="container">
                {child}

                <div className="columns is-centered is-multiline">
                    <div className="column is-half mt-3">
                        <div className=" panel is-info">
                            <p className="panel-heading is-size-6">Datos personales </p>
                            <div className="panel-block has-background-info-light">
                                {currentUser &&
                                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', padding: '20px' }}>

                                        <div>
                                            <span className="has-text-weight-medium">Nombres: </span> {currentUser.primer_nombre} {currentUser.segundo_nombre}
                                        </div>
                                        <div >
                                            <span className="has-text-weight-medium">Apellidos: </span> {currentUser.primer_apellido} {currentUser.segundo_apellido}
                                        </div>

                                        <div><span className="has-text-weight-medium">Edad: </span> {currentUser?.edad.años}  años </div>
                                        <div><span className="has-text-weight-medium">Estado civil: </span> {currentUser.estado_civil.estado_civil}</div>
                                        <div><span className="has-text-weight-medium">Teléfono movil: </span> {currentUser.telefono_movil}</div>
                                        <div><span className="has-text-weight-medium">Correo: </span> {currentUser.correo_personal}</div>
                                    </div>
                                }
                            </div>

                        </div>

                    </div>

                </div>

                <hr style={{ backgroundColor: "#b3e6cc" }} />
                <Box>

                    <Tabs aria-label="basic tabs example"
                        value={activeTab} onChange={(ev, newVal) => setActiveTab(newVal)}
                        variant="scrollable"
                        scrollButtons="auto" >
                        <Tab label="Mi hoja de vida" {...a11yProps(1)} sx={{ textTransform: 'none' }} />
                        {isAdmin(roles) && <Tab label="Administración del sistema" {...a11yProps(2)} sx={{ textTransform: 'none' }} />}
                        {isHR(roles) && <Tab label="Talento Humano" {...a11yProps(2)} sx={{ textTransform: 'none' }} />}
                        {isQA(roles) && <Tab label="Aseguramiento de la Calidad" {...a11yProps(2)} sx={{ textTransform: 'none' }} />}
                        
                    </Tabs>

                </Box>
                <TabPanel value={activeTab} index={0}>
                        {
                            currentUser && <CV email={currentUser.correo_institucional}/>
                        }        
                </TabPanel>

            </div>
        </Fragment>

    )
}

export default Home;