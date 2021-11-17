import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadFormacionAcademica = createAsyncThunk(
    'formacion-academica/load',
    async (id_persona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/formacion-academica/persona/${id_persona}`,
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

export const loadFormacion = createAsyncThunk(
    'formacion/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/formacion-academica/${id}`,
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

export const postFormacionAcademica = createAsyncThunk(
    'formacion-academica/post',
    async (formacion, { getState }) => {
        console.log(formacion);
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let data = {
                id_persona: formacion.id_persona,
                pais_estudio: formacion.paisEstudio.value,
                ies: formacion?.ies ? formacion.ies.value : null,
                nombre_ies: formacion?.nombreIES ? formacion.nombreIES.toUpperCase():'',
                nivel_educativo: formacion.nivel.value,
                grado: formacion?.grado ? formacion.grado.value : null,
                nombre_titulo: formacion.titulo.toUpperCase(),
                campo_especifico: formacion.campoEstudio.value,
                estado: formacion.estado,
                fecha_inicio: formacion.fechaInicio,
                fecha_fin: formacion?.fechaFin ? formacion.fechaFin: null,
                registro_senescyt: formacion?.registroSenescyt ? formacion.registroSenescyt:'', 
                fecha_obtencion_titulo: formacion?.fechaObtencionTitulo ? formacion.fechaObtencionTitulo:null,
                lugar: formacion.lugar.toUpperCase(),
                posee_beca: formacion?.poseeBeca ? formacion.poseeBeca : '',
                tipo_beca: formacion?.tipoBeca ? formacion.tipoBeca:null,
                monto_beca: formacion?.montoBeca ? formacion.montoBeca: 0,
                financiamiento: formacion?.financiamiento ? formacion.financiamiento : null,
                descripcion: formacion?.descripcion ? formacion.descripcion.toUpperCase() : ''
            }

            let response = await Axios.post(`${API}/formacion-academica`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }

)

export const putFormacionAcademica = createAsyncThunk(
    'formacion-academica/put',
    async (formacion, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let data = {
                id: formacion.id,
                pais_estudio: formacion.paisEstudio.value,
                ies: formacion?.ies ? formacion.ies.value : null,
                nombre_ies: formacion?.nombreIES ? formacion.nombreIES.toUpperCase():'',
                nivel_educativo: formacion.nivel.value,
                grado: formacion?.grado ? formacion.grado.value : null,
                nombre_titulo: formacion.titulo.toUpperCase(),
                campo_especifico: formacion.campoEstudio.value,
                estado: formacion.estado,
                fecha_inicio: formacion.fechaInicio,
                fecha_fin: formacion?.fechaFin ? formacion.fechaFin: null,
                registro_senescyt: formacion?.registroSenescyt ? formacion.registroSenescyt:'', 
                fecha_obtencion_titulo: formacion?.fechaObtencionTitulo ? formacion.fechaObtencionTitulo:null,
                lugar: formacion.lugar.toUpperCase(),
                posee_beca: formacion?.poseeBeca ? formacion.poseeBeca : '',
                tipo_beca: formacion?.tipoBeca ? formacion.tipoBeca:null,
                monto_beca: formacion?.montoBeca ? formacion.montoBeca: 0,
                financiamiento: formacion?.financiamiento ? formacion.financiamiento : null,
                descripcion: formacion?.descripcion ? formacion.descripcion.toUpperCase() : ''
            }
            let response = await Axios.put(`${API}/formacion-academica/`, data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            return response.data

        } catch (error) {
            let err;
            if (error.response.data.detail[0].msg)
                err = error.response.data.detail[0].msg
            if (error.response.data.type)
                err = `${error.response.data.type}, ${error.response.data.type.content}`
            throw err
        }

    }
)

export const deleteFormacionAcademica = createAsyncThunk(
    'formacion-academica/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/formacion-academica/${id}`,
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

let formacionAcademicaSlice = createSlice({
    name: 'formacionAcademica',
    initialState: {
        data: {
            formacionAcademica: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                formacionAcademica: []
            }
        }

    },
    extraReducers: {
        [loadFormacionAcademica.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                formacionAcademica: action.payload
            }
        }


    }
}
)

export const { clearData } = formacionAcademicaSlice.actions;
export default formacionAcademicaSlice.reducer;