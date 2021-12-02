import {
    createAsyncThunk,
    createSlice
} from '@reduxjs/toolkit'

import Axios from 'axios'
import { API } from '../../services/api'

export const loadExpedienteLaboral = createAsyncThunk(
    'expediente-laboral/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/expediente-laboral/${id}`,
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

export const loadItemDetalle = createAsyncThunk(
    'detalle-expediente/load',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;
        } catch (e) {
            throw e;
        }

        try {
            let response = await Axios.get(`${API}/expediente-laboral/detalle/${id}`,
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

export const postDetalleExpedienteProfesor = createAsyncThunk(
    'expediente-laboral-profesor/post',
    async (detalleExpediente, { getState }) => {
        console.log(detalleExpediente);
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/expediente-laboral/profesor/${detalleExpediente.id_persona}`, {
                tipo_personal: detalleExpediente.detalle.tipoPersonal,
                tipo_documento: detalleExpediente.detalle.tipoDocumento,
                tipo_contrato: detalleExpediente.detalle?.tipoContrato ? detalleExpediente.detalle.tipoContrato.value : null,
                tipo_nombramiento: detalleExpediente.detalle?.tipoNombramiento ? detalleExpediente.detalle.tipoNombramiento.value : null,
                motivo_accion: detalleExpediente.detalle?.motivoAccion ? detalleExpediente.detalle.expediente.motivoAccion.value : null,
                descripcion: detalleExpediente.detalle?.descripcion ? detalleExpediente.expediente.descripcion : null,
                numero_documento: detalleExpediente.detalle.numeroDocumento,
                contrato_relacionado: detalleExpediente.detalle?.contratoRelacionado,
                ingreso_concurso: detalleExpediente.detalle.ingresoConcurso,
                relacion_ies: detalleExpediente.detalle.relacionIES,
                escalafon_nombramiento: detalleExpediente.detalle.escalafonNombramiento.value,
                categoria_contrato: detalleExpediente.detalle.categoriaContrato.value,
                tiempo_dedicacion: detalleExpediente.detalle.tiempoDedicacion,
                remuneracion_mensual: detalleExpediente.detalle.remuneracionMensual,
                remuneracion_hora: detalleExpediente.detalle.remuneracionHora,
                fecha_inicio: detalleExpediente.detalle.fechaInicio,
                fecha_fin: detalleExpediente.detalle?.fechaFin ? detalleExpediente.detalle.fechaFin : null,
                area: parseInt(detalleExpediente.detalle.area.value),
                sub_area: detalleExpediente.detalle?.subArea ? parseInt(detalleExpediente.detalle?.subArea.value) : null,
                nivel: detalleExpediente.detalle.nivel

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

export const postDetalleExpedienteFuncionario = createAsyncThunk(
    'expediente-laboral-funcionario/post',
    async (detalleExpediente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.post(`${API}/expediente-laboral/funcionario/${detalleExpediente.id_persona}`,
                {
                    tipo_personal: detalleExpediente.detalle.tipoPersonal,
                    tipo_documento: detalleExpediente.detalle.tipoDocumento,
                    tipo_contrato: detalleExpediente.detalle?.tipoContrato ? detalleExpediente.detalle.tipoContrato.value : null,
                    tipo_nombramiento: detalleExpediente.detalle?.tipoNombramiento ? detalleExpediente.detalle.tipoNombramiento.value : null,
                    motivo_accion: detalleExpediente.detalle?.motivoAccion ? detalleExpediente.detalle.expediente.value : null,
                    descripcion: detalleExpediente.detalle?.descripcion ? detalleExpediente.expediente.descripcion : null,
                    numero_documento: detalleExpediente.detalle.numeroDocumento,
                    relacion_ies: detalleExpediente.detalle.relacionIES,
                    fecha_inicio: detalleExpediente.detalle.fechaInicio,
                    fecha_fin: detalleExpediente.detalle?.fechaFin ? detalleExpediente.detalle.fechaFin : null,
                    ingreso_concurso: detalleExpediente.detalle.ingresoConcurso,
                    remuneracion_mensual: detalleExpediente.detalle.remuneracionMensual,
                    tipo_funcionario: detalleExpediente.detalle.tipoFuncionario.value,
                    cargo: detalleExpediente.detalle.cargo,
                    tipo_docente: detalleExpediente.detalle.tipoDocente.value,
                    categoria_docente: detalleExpediente.detalle.categoriaDocente.value,
                    puesto_jerarquico: detalleExpediente.detalle.puestoJerarquico,
                    horas_laborables_semanales: detalleExpediente.detalle.horasLaborablesSemanales,
                    area: parseInt(detalleExpediente.detalle.area.value),
                    sub_area: detalleExpediente.detalle?.subArea ? parseInt(detalleExpediente.detalle?.subArea.value) : null

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

export const putDetalleExpediente = createAsyncThunk(
    'expediente-laboral/put',
    async (detalleExpediente, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let data;
            if (detalleExpediente.tipoPersonal === 'FUNCIONARIO') {
                data = {
                    id: detalleExpediente.id,
                    tipo_personal: detalleExpediente.tipoPersonal,
                    tipo_documento: detalleExpediente.tipoDocumento,
                    tipo_contrato: detalleExpediente?.tipoContrato ? detalleExpediente.tipoContrato.value : null,
                    tipo_nombramiento: detalleExpediente?.tipoNombramiento ? detalleExpediente.tipoNombramiento.value : null,
                    motivo_accion: detalleExpediente?.motivoAccion ? detalleExpediente.motivoAccion.value : null,
                    descripcion: detalleExpediente?.descripcion ? detalleExpediente.descripcion : null,
                    numero_documento: detalleExpediente.numeroDocumento,
                    relacion_ies: detalleExpediente.relacionIES,
                    fecha_inicio: detalleExpediente.fechaInicio,
                    fecha_fin: detalleExpediente?.fechaFin ? detalleExpediente.fechaFin : null,
                    ingreso_concurso: detalleExpediente.ingresoConcurso,
                    remuneracion_mensual: detalleExpediente.remuneracionMensual,
                    tipo_funcionario: detalleExpediente.tipoFuncionario.value,
                    cargo: detalleExpediente.cargo,
                    tipo_docente: detalleExpediente.tipoDocente.value,
                    categoria_docente: detalleExpediente.categoriaDocente.value,
                    puesto_jerarquico: detalleExpediente.puestoJerarquico,
                    horas_laborables_semanales: detalleExpediente.horasLaborablesSemanales,
                    area: parseInt(detalleExpediente.area.value),
                    sub_area: detalleExpediente?.subArea ? parseInt(detalleExpediente?.subArea.value) : null
                }
            } else {
                data = {
                    id: detalleExpediente.id,
                    tipo_personal: detalleExpediente.tipoPersonal,
                    tipo_documento: detalleExpediente.tipoDocumento,
                    tipo_contrato: detalleExpediente?.tipoContrato ? detalleExpediente.tipoContrato.value : null,
                    tipo_nombramiento: detalleExpediente?.tipoNombramiento ? detalleExpediente.tipoNombramiento.value : null,
                    motivo_accion: detalleExpediente?.motivoAccion ? detalleExpediente.motivoAccion.value : null,
                    descripcion: detalleExpediente?.descripcion ? detalleExpediente.descripcion : null,
                    numero_documento: detalleExpediente.numeroDocumento,
                    contrato_relacionado: detalleExpediente?.contratoRelacionado,
                    ingreso_concurso: detalleExpediente.ingresoConcurso,
                    relacion_ies: detalleExpediente.relacionIES,
                    escalafon_nombramiento: detalleExpediente.escalafonNombramiento.value,
                    categoria_contrato: detalleExpediente.categoriaContrato.value,
                    tiempo_dedicacion: detalleExpediente.tiempoDedicacion,
                    remuneracion_mensual: detalleExpediente.remuneracionMensual,
                    remuneracion_hora: detalleExpediente.remuneracionHora,
                    fecha_inicio: detalleExpediente.fechaInicio,
                    fecha_fin: detalleExpediente?.fechaFin ? detalleExpediente.fechaFin : null,
                    area: parseInt(detalleExpediente.area.value),
                    sub_area: detalleExpediente?.subArea ? parseInt(detalleExpediente?.subArea.value) : null,
                    nivel: detalleExpediente.nivel
                }
            }
            console.log(data, detalleExpediente.tipoPersonal === 'FUNCIONARIO');
            let response = await Axios.put(`${API}/expediente-laboral`, data,
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

export const deleteItemDetalle = createAsyncThunk(
    'expediente-laboral/delete',
    async (id, { getState }) => {
        let token;
        try {
            token = getState().user.user.jwt.token;

        } catch (e) {
            throw e;
        }
        if (!token) return Promise.reject('There is not token')
        try {
            let response = await Axios.delete(`${API}/expediente-laboral/${id}`,
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

let expedienteLaboralSlice = createSlice({
    name: 'expedienteLaboral',
    initialState: {
        data: {
            expediente: {
                id: null,
                id_persona: null,
                fecha_ingreso: '',
                detalle: []
            }
        },
        status: ''

    },
    reducers: {

        clearData: (state) => {
            state.data = {
                expediente: {
                    id: null,
                    id_persona: null,
                    fecha_ingreso: '',
                    detalle: []
                }
            }
        }

    },
    extraReducers: {
        [loadExpedienteLaboral.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data.expediente = {
                id: action.payload.id,
                id_persona: action.payload.id_persona,
                fecha_ingreso: action.payload.fecha_ingreso,
                detalle: action.payload.detalle
            }
        }


    }
}
)

export const { clearData } = expedienteLaboralSlice.actions;
export default expedienteLaboralSlice.reducer;