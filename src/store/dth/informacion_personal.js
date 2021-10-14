import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadInformacionPersonal = createAsyncThunk(
    'informacion-personal/load',
    async (_, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/personal`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            throw error.response.detail
        }
    }
)

export const loadPersona = createAsyncThunk(
    'persona/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/personal/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            throw error.response.detail
        }
    }
)

export const loadPersonaEmail = createAsyncThunk(
    'persona-email/load',
    async (email, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/personal/correo/${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            throw error.response.detail
        }
    }
)

export const postInformacionPersonal = createAsyncThunk(
    'informacion-personal/post',
    async (datosPersonales, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
           
            let data =
            {
                tipo_identificacion: datosPersonales.tipo_identificacion,
                identificacion: datosPersonales.identificacion,
                primer_nombre: datosPersonales.primer_nombre.toUpperCase(),
                segundo_nombre: datosPersonales.segundo_nombre.toUpperCase(),
                primer_apellido: datosPersonales.primer_apellido.toUpperCase(),
                segundo_apellido: datosPersonales.segundo_apellido.toUpperCase(),
                sexo: datosPersonales.sexo,
                fecha_nacimiento: datosPersonales.fecha_nacimiento.toISOString().slice(0, 10),
                pais_origen: datosPersonales.pais_origen,
                estado_civil: datosPersonales.estado_civil,
                discapacidad: datosPersonales.discapacidad,
                carnet_conadis: datosPersonales.numero_conadis !==null ? datosPersonales.numero_conadis.toUpperCase() : datosPersonales.numero_conadis,
                porcentaje_discapacidad: datosPersonales.porcentaje_discapacidad,
                etnia: datosPersonales.etnia,
                nacionalidad: datosPersonales.nacionalidad,
                correo_institucional: datosPersonales.email_institucional,
                correo_personal: datosPersonales.email_personal,
                telefono_domicilio: datosPersonales.telefono_domicilio,
                telefono_movil: datosPersonales.telefono_movil,
                direccion_domicilio: {
                    id_provincia: datosPersonales.id_provincia,
                    id_canton: datosPersonales.id_canton,
                    parroquia: datosPersonales.parroquia.toUpperCase(),
                    calle1: datosPersonales.calle1.toUpperCase(),
                    calle2: datosPersonales.calle2.toUpperCase(),
                    referencia: datosPersonales.referencia.toUpperCase()
                },
                tipo_sangre: datosPersonales.tipo_sangre,
                licencia_conduccion: datosPersonales.licencia_conduccion,
                fecha_ingreso: datosPersonales.fecha_ingreso_ies.toISOString().slice(0, 10)
            }
            console.log(data);
            let response = await Axios.post(`${API}/personal`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err = '';
            if (error.response.data.detail)
            error.response.data.detail.map(
                (e) => err +=`${e.loc[1].toUpperCase()} : ${e.msg} \n`
            )
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putInformacionPersonal = createAsyncThunk(
    'informacion-personal/put',
    async ({id,datosPersonales}, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')

        try {
            let data =
            {
                tipo_identificacion: datosPersonales.tipo_identificacion,
                primer_nombre: datosPersonales.primer_nombre.toUpperCase(),
                segundo_nombre: datosPersonales.segundo_nombre.toUpperCase(),
                primer_apellido: datosPersonales.primer_apellido.toUpperCase(),
                segundo_apellido: datosPersonales.segundo_apellido.toUpperCase(),
                sexo: datosPersonales.sexo,
                fecha_nacimiento: datosPersonales.fecha_nacimiento.toISOString().slice(0, 10),
                pais_origen: datosPersonales.pais_origen,
                estado_civil: datosPersonales.estado_civil,
                discapacidad: datosPersonales.discapacidad,
                carnet_conadis: datosPersonales.numero_conadis !==null ? datosPersonales.numero_conadis.toUpperCase() : datosPersonales.numero_conadis,
                porcentaje_discapacidad: datosPersonales.porcentaje_discapacidad,
                etnia: datosPersonales.etnia,
                nacionalidad: datosPersonales.nacionalidad,
                correo_institucional: datosPersonales.email_institucional,
                correo_personal: datosPersonales.email_personal,
                telefono_domicilio: datosPersonales.telefono_domicilio,
                telefono_movil: datosPersonales.telefono_movil,
                direccion_domicilio: {
                    id_provincia: datosPersonales.id_provincia,
                    id_canton: datosPersonales.id_canton,
                    parroquia: datosPersonales.parroquia.toUpperCase(),
                    calle1: datosPersonales.calle1.toUpperCase(),
                    calle2: datosPersonales.calle2 !== null ? datosPersonales.calle2.toUpperCase():datosPersonales.calle2,
                    referencia:  datosPersonales.referencia !==null?datosPersonales.referencia.toUpperCase() : datosPersonales.referencia
                },
                tipo_sangre: datosPersonales.tipo_sangre.toUpperCase(),
                licencia_conduccion: datosPersonales.licencia_conduccion !==null ? datosPersonales.licencia_conduccion.toUpperCase() : datosPersonales.licencia_conduccion,
                fecha_ingreso: datosPersonales.fecha_ingreso_ies.toISOString().slice(0, 10)
            }
            let response = await Axios.put(`${API}/personal/${id}`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            console.log(error);
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }
)

export const deleteInformacionPersonal = createAsyncThunk(
    'informacion-personal/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/personal/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            throw error.response
        }

    }
)

let informacionPersonalSlice = createSlice({
    name: 'informacionPersonal',
    initialState: {
        data: {
            personal: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                personal: []
            }
        }

    },
    extraReducers: {
        [loadInformacionPersonal.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                personal: action.payload
            }
        }


    }
}
)

export const { clearData } = informacionPersonalSlice.actions;
export default informacionPersonalSlice.reducer;