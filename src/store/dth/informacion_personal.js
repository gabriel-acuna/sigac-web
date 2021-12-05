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
                fecha_nacimiento: datosPersonales.fecha_nacimiento,
                pais_origen: datosPersonales.pais_origen.value,
                estado_civil: datosPersonales.estado_civil,
                discapacidad: datosPersonales.discapacidad.value,
                carnet_conadis: datosPersonales.numero_conadis !== null ? datosPersonales.numero_conadis.toUpperCase() : datosPersonales.numero_conadis,
                porcentaje_discapacidad: datosPersonales.porcentaje_discapacidad,
                etnia: datosPersonales.etnia.value,
                nacionalidad: datosPersonales.nacionalidad.value,
                correo_institucional: datosPersonales.email_institucional,
                correo_personal: datosPersonales.email_personal,
                telefono_domicilio: datosPersonales.telefono_domicilio,
                telefono_movil: datosPersonales.telefono_movil,
                direccion_domicilio: {
                    id_provincia: datosPersonales.id_provincia.value,
                    id_canton: datosPersonales.id_canton.value,
                    parroquia: datosPersonales.parroquia.toUpperCase(),
                    calle1: datosPersonales.calle1.toUpperCase(),
                    calle2: datosPersonales.calle2.toUpperCase(),
                    referencia: datosPersonales.referencia.toUpperCase()
                },
                contacto_emergencia: {
                    apellidos: datosPersonales.apellidosContacto.toUpperCase(),
                    nombres: datosPersonales.nombresContacto.toUpperCase(),
                    direccion: datosPersonales.direccionContacto.toUpperCase(),
                    telefono_domicilio: datosPersonales.telefonoContacto,
                    telefono_movil: datosPersonales.movilContacto
                },
                tipo_sangre: datosPersonales.tipo_sangre,
                licencia_conduccion: datosPersonales.licencia_conduccion,
                tipo_licencia: datosPersonales.tipo_licencia,
                informacion_bancaria: {
                    institucion_financiera: datosPersonales.institucion.toUpperCase(),
                    tipo_cuenta: datosPersonales.tipoCuenta,
                    numero_cuenta: datosPersonales.numeroCuenta
                },
                fecha_ingreso: datosPersonales.fecha_ingreso_ies
            }

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
                    (e) => err += `${e.loc[1].toUpperCase()} : ${e.msg} \n`
                )
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putInformacionPersonal = createAsyncThunk(
    'informacion-personal/put',
    async ({ id, datosPersonales }, { getState }) => {
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
                fecha_nacimiento: datosPersonales.fecha_nacimiento,
                pais_origen: datosPersonales.pais_origen.value,
                estado_civil: datosPersonales.estado_civil,
                discapacidad: datosPersonales.discapacidad.value,
                carnet_conadis: datosPersonales.numero_conadis !== null ? datosPersonales.numero_conadis.toUpperCase() : datosPersonales.numero_conadis,
                porcentaje_discapacidad: datosPersonales.porcentaje_discapacidad,
                etnia: datosPersonales.etnia.value,
                nacionalidad: datosPersonales.nacionalidad.value,
                correo_institucional: datosPersonales.email_institucional,
                correo_personal: datosPersonales.email_personal,
                telefono_domicilio: datosPersonales.telefono_domicilio,
                telefono_movil: datosPersonales.telefono_movil,
                direccion_domicilio: {
                    id_provincia: datosPersonales.id_provincia.value,
                    id_canton: datosPersonales.id_canton.value,
                    parroquia: datosPersonales.parroquia.toUpperCase(),
                    calle1: datosPersonales.calle1.toUpperCase(),
                    calle2: datosPersonales.calle2 !== null ? datosPersonales.calle2.toUpperCase() : datosPersonales.calle2,
                    referencia: datosPersonales.referencia !== null ? datosPersonales.referencia.toUpperCase() : datosPersonales.referencia
                },
                contacto_emergencia: {
                    apellidos: datosPersonales.apellidosContacto.toUpperCase(),
                    nombres: datosPersonales.nombresContacto.toUpperCase(),
                    direccion: datosPersonales.direccionContacto.toUpperCase(),
                    telefono_domicilio: datosPersonales.telefonoContacto,
                    telefono_movil: datosPersonales.movilContacto
                },
                tipo_sangre: datosPersonales.tipo_sangre,
                licencia_conduccion: datosPersonales.licencia_conduccion,
                tipo_licencia: datosPersonales.tipo_licencia,
                informacion_bancaria: {
                    institucion_financiera: datosPersonales.institucion,
                    tipo_cuenta: datosPersonales.tipoCuenta.toUpperCase(),
                    numero_cuenta: datosPersonales.numeroCuenta
                },
                fecha_ingreso: datosPersonales.fecha_ingreso_ies
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