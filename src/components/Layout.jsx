import { Fragment, useEffect, useState } from "react";
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loadPersonaEmail } from '../store/dth/informacion_personal'
import Footer from "./Footer";
import routes from './../routes';
import NavBar from "./Navbar";
import { useSelector } from 'react-redux';
import { useRoutes } from 'react-router-dom'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { isAdmin, isHR, isQA } from "../services/auth"
import { GrNotification } from 'react-icons/gr'
import TabPanel from "./TabPanel";



let Layout = (props) => {

    let user = useSelector(state => state.user.user)
    let element = useRoutes(routes(user));
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(null)
    const a11yProps = (index) => ({ id: `simple-tab-${index}`, 'aria-controls': `simple-tabpanel-${index}` })
    const [activeTab, setActiveTab] = useState(0)


    useEffect(() => {
        user && dispatch(loadPersonaEmail(user.userInfo.email)).unwrap()
            .then(
                resp => setCurrentUser(resp)
            )
    }, [currentUser, user, dispatch])


    return (

        <Fragment>


            {props.child}

            {user && <NavBar />}
            {user && <div className="columns is-centered is-multiline">
                <div className="column is-half mt-3">
                    <div className=" panel is-info">
                        <p className="panel-heading is-size-6">Datos personales </p>
                        <div className="panel-block has-background-info-light">
                            {currentUser &&
                                <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr', padding: '20px' }}>

                                    <div>
                                        <span className="has-text-weight-medium">Nombres: </span> {currentUser.primer_nombre} {currentUser.segundo_nombre}
                                    </div>
                                    <div className="ml-4">
                                        <span className="has-text-weight-medium">Apellidos: </span> {currentUser.primer_apellido} {currentUser.segundo_apellido}
                                    </div>

                                    <div><span className="has-text-weight-medium">Edad: </span> {currentUser?.edad.años}  años </div>
                                    <div className="ml-4"><span className="has-text-weight-medium">Estado civil: </span> {currentUser.estado_civil.estado_civil}</div>
                                    <div><span className="has-text-weight-medium">Teléfono movil: </span> {currentUser.telefono_movil}</div>
                                    <div className="ml-4"><span className="has-text-weight-medium">Correo: </span> {currentUser.correo_personal}</div>
                                </div>
                            }
                        </div>

                    </div>

                </div>

            </div>}
            {user && <hr style={{ backgroundColor: "#b3e6cc" }} /> &&
                <Box p={2}>

                    <Tabs aria-label="basic tabs example"
                        value={activeTab} onChange={(ev, newVal) => setActiveTab(newVal)}
                        variant="scrollable"
                        scrollButtons="auto" >
                        <Tab icon={<GrNotification />} {...a11yProps(0)}  onClick={()=>navigate('/')}/>
                        {currentUser && <Tab label="Mi hoja de vida" {...a11yProps(1)} sx={{ textTransform: 'none' }} onClick={()=>navigate('/CV')}/>}
                        <Tab label="Administración del sistema" {...a11yProps(2)} sx={{ textTransform: 'none' }} disabled={!isAdmin(user.userInfo.roles)} onClick={()=>navigate('/admin')} />
                        <Tab label="Talento Humano" {...a11yProps(3)} sx={{ textTransform: 'none' }} disabled={!isHR(user.userInfo.roles)} onClick={()=>navigate('/dth')} />
                        <Tab label="Aseguramiento de la Calidad" {...a11yProps(4)} sx={{ textTransform: 'none' }} disabled={!isQA(user.userInfo.roles)} onClick={()=>navigate('/dac')}/>

                    </Tabs>

                </Box>

            }{
               user && currentUser &&
                <>
                    <TabPanel index={0} value={activeTab}>
                        <div className="columns is-centered">
                            <div className="column is-4">
                                <div className="notification is-success is-light">
                                    {currentUser.sexo === 'HOMBRE' ? 'Bienvenido' : 'Bienvenida'} {currentUser.primer_nombre} {currentUser.segundo_nombre} {currentUser.primer_apellido}  {currentUser.segundo_apellido}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </>
            }

            {element}

            <Footer />
        </Fragment>


    )

}

export default Layout;