import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadRegimenesDisciplinariosPorAño = createAsyncThunk(
    'regimenes-disciplinarios/load',
    async (año, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/regimenes-disciplinarios/?anio=${año}`,
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

export const loadRegimenesDisciplinariosPorAñoMes = createAsyncThunk(
    'regimenes-disciplinarios/load',
    async (año, mes, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/regimenes-disciplinarios/?anio=${año}&
            mes=${mes}`,
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

export const loadRegimenesDisciplinariosPorPersona = createAsyncThunk(
    'regimenes-disciplinarios/load',
    async (idPersona, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/regimenes-disciplinarios/personal/${idPersona}`,
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
export const postRegimenes = createAsyncThunk(
    'regimenes-disciplinarios/post',
    async (regimen, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/regimenes-disciplinarios`,
                {
                    anio_sancion: regimen.año,
                    mes_sancion: regimen.mesSancion.value,
                    persona: regimen.persona,
                    regimen_laboral: regimen.regimenLaboral.value,
                    modalidad_contractual: regimen.modalidadContractual.value,
                    tipo_falta: regimen.tipoFalta,
                    sancion: regimen.sancion.value,
                    aplica_sumario: regimen.aplicaSumario,
                    estado_sumario: regimen.estadoSumario.value,
                    numero_sentencia: regimen?.numeroSantencia ? regimen.numeroSantencia : null

                },
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

export const putRegimenes = createAsyncThunk(
    'regimenes-disciplinarios/put',
    async (regimen, { getState }) => {
        console.log(regimen);
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.put(`${API}/regimenes-disciplinarios`, {
                id: regimen.id,
                anio_sancion: regimen.año,
                mes_sancion: regimen.mesSancion.value,
                persona: regimen.persona,
                regimen_laboral: regimen.regimenLaboral.value,
                modalidad_contractual: regimen.modalidadContractual.value,
                tipo_falta: regimen.tipoFalta,
                sancion: regimen.sancion.value,
                aplica_sumario: regimen.aplicaSumario,
                estado_sumario: regimen.estadoSumario.value,
                numero_sentencia: regimen?.numeroSantencia ? regimen.numeroSantencia : null
            }
                ,
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

export const deleteRegimenes = createAsyncThunk(
    'regimenes-disciplinarios/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/regimenes-disciplinarios/${id}`,
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

let regimenesSlice = createSlice({
    name: 'regimenes',
    initialState: {
        data: {
            regimenes: []
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                regimenes: []

            }
        }

    },
    extraReducers: {
        [loadRegimenesDisciplinariosPorAño.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                regimenes: action.payload
            }

        },
        [loadRegimenesDisciplinariosPorAñoMes.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                regimenes: action.payload
            }

        },
        [loadRegimenesDisciplinariosPorPersona.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = {
                regimenes: action.payload
            }

        }


    }
}
)

export const { clearData } = regimenesSlice.actions;
export default regimenesSlice.reducer;