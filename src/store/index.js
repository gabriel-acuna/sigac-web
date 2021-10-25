import {
    combineReducers,
    configureStore
} from '@reduxjs/toolkit';

import userReducer from './user'
import paisesReducer from './core/paises'
import provinciasReducer from './core/provincias'
import discapacidadesReducer from './core/discapacidades'
import etniasReducer from './core/etnias'
import nacionalidadesReducer from './core/nacionalidades'
import tiposDocumentosReducer from './core/tiposDocumentos'
import relacionesIESReducer from './core/relacionesIES'
import tiposEscalafonesReducer from './core/tiposEscalafones'
import categoriasContratosReducer from './core/categoriasContratos'
import tiemposDedicacionesReducer from './core/tiemposDedicaciones'
import nivelesEdutativosReducer from './core/nivelesEducativos'
import tiposFuncionariosReducer from './core/tiposFuncionarios'
import tiposDocentesLOESReducer from './core/tiposDocentes'
import categoriasDocentesLOSEPReducer from './core/categoriasDocentes'
import estadosCivilesReducer from './core/estado_civil'
import informacionPersonalReducer from './dth/informacion_personal'
import expedienteLaboralReducer from './dth/expediente_laboral'
import capacitacionReducer from './cv/capacitacion'
import referenciaReducer from './cv/referencia'
import estructuraInstitucionalReducer from './core/estructura-institucional'
import areaIstitucionalReducer from './core/area'
import formacionAcademicaReducer from './cv/formacion_academica'
import capacitacionfacilitadorReducer from './cv/capacitacion_facilitador'
import ponenciasReducer from './cv/ponencia'
import meritosReducer from './cv/merito'
import experienciaLaboralReducer from './cv/experiencia_laboral'
import idiomasReducer from './cv/compresion_idioma'


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER

} from 'redux-persist';

import storage from 'redux-persist/lib/storage'

const reducer = combineReducers({
    user: userReducer,
    paises: paisesReducer,
    provincias: provinciasReducer,
    discapacidades: discapacidadesReducer,
    etnias: etniasReducer,
    nacionalidades: nacionalidadesReducer,
    tiposDocumentos: tiposDocumentosReducer,
    relacionesIES: relacionesIESReducer,
    tipoEscalafones: tiposEscalafonesReducer,
    categoriasContratos: categoriasContratosReducer,
    tiemposDedicaciones: tiemposDedicacionesReducer,
    nivelesEducativos: nivelesEdutativosReducer,
    tiposFuncionarios: tiposFuncionariosReducer,
    tiposDocentesLOES: tiposDocentesLOESReducer,
    categoriasDocentesLOSEP: categoriasDocentesLOSEPReducer,
    estadosCiviles: estadosCivilesReducer,
    informacionPersonal: informacionPersonalReducer,
    expediente:expedienteLaboralReducer,
    formacionAcademica: formacionAcademicaReducer,
    capacitaciones: capacitacionReducer,
    capacitacionesFacilitador:capacitacionReducer,
    ponencias:ponenciasReducer,
    experienciaLabaral: experienciaLaboralReducer,
    meritos: meritosReducer,
    idiomas: idiomasReducer,
    referencias: referenciaReducer,
    estructuraInstitucional: estructuraInstitucionalReducer,
    areasInstitucionales: areaIstitucionalReducer


});

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['user'],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
}

const persistedReducer = persistReducer(persistConfig, reducer);


export const store = configureStore(
    {
        reducer: persistedReducer
    }
)

export const persistor = persistStore(store);