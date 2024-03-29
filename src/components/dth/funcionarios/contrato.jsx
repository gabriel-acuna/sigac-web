import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { FormControlLabel, Radio, RadioGroup} from '@mui/material'

let ContratoFuncionario = ({ objeto, register, errors, control, setValue }) => {


    let tiposFuncionariosState = useSelector(state => state.tiposFuncionarios.data.tiposFuncionarios)
    let tiposDocentesState = useSelector(state => state.tiposDocentesLOES.data.tiposDocentes)
    let categoriasDocentesState = useSelector(state => state.categoriasDocentesLOSEP.data.categoriasDocentes)

    const [categories, setCategories] = useState([])
    const [types, setTypes] = useState([])

    let filtrarCategorias = (funcionario) => {
        let options = []

        if (funcionario === 'DOCENTE LOES') {
            categoriasDocentesState.forEach(
                cat => {
                    if (cat.categoria_docente !== 'NO APLICA') {
                        options.push(cat)
                    }
                }
            )
        } else if (funcionario !== 'DOCENTE LOES' && funcionario !== '') {
            options.push(categoriasDocentesState.find(cat => cat.categoria_docente === 'NO APLICA'))
        }


        setCategories(options)


    }

    let filtrarTipos = (funcionario) => {
        console.log(funcionario);
        let options = []

        if (funcionario === 'DOCENTE LOES') {
            tiposDocentesState.forEach(
                tipo => {
                    if (tipo.tipo_docente !== 'NO APLICA') {
                        options.push(tipo)
                    }
                }
            )
        } else if (funcionario !== 'DOCENTE LOES' && funcionario !== '' && funcionario !== undefined) {
            options.push(tiposDocentesState.find(tipo => tipo.tipo_docente === 'NO APLICA'))
        }


        setTypes(options)


    }


    return (


        <>

            <div className="columns">
                <div className="column">
                    <label className="label is-small has-text-info">Tipo funcionario</label>
                    {errors.tipoFuncionario && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de funcionario!</span>}

                    <Controller
                        name="tipoFuncionario"
                        rules={{ required: true }}
                        control={control}
                        defaultValue ={ objeto?.tipo_funcionario ? {label:objeto.tipo_funcionario.tipo, value: objeto.tipo_funcionario.id}: null}
                        render={
                            ({ field }) => (
                                <Select
                                    placeholder="Seleccione"
                                    {...field}
                                   
                                    isClearable
                                    onChange={
                                        value => {
                                            filtrarCategorias(value?.label)
                                            filtrarTipos(value?.label)
                                            setValue('tipoFuncionario', value)
                                        }
                                    }
                                    options={
                                        tiposFuncionariosState.map(
                                            row => ({ label: row.tipo, value: row.id, key: row.id })
                                        )
                                    }

                                />
                            )
                        }
                    />

                </div>


                <div className="column">
                    <label className="label is-small has-text-info">
                        Cargo
                    </label>
                    {errors.cargo && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese el cargo del funcionario!</span>}
                    <div className="control"><input type="text" {...register("cargo", { required: true })} className="input" />

                    </div>
                    
                </div>
                <div className="column">
                    <label className="label is-small has-text-info">Tipo docente LOES</label>
                    {errors.tipoDocente && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de docente!</span>}
                    <Controller
                        name="tipoDocente"
                        control={control}
                        rules={{ required: true }}
                        defaultValue ={ objeto?.tipo_docente ? {label:objeto.tipo_docente.tipo_docente, value: objeto.tipo_docente.id}: null}
                        render={
                            ({ field }) => (
                                <Select
                                    isClearable
                                    placeholder="Seleccione"
                                    {...field}
                                    options={
                                        types.map(
                                            t => ({ label: t.tipo_docente, value: t.id, key: t.id })
                                        )
                                    }
                                />
                            )
                        }
                    />
                </div>
            </div>
            <div className="columns">

                <div className="column">
                    <label className="label is-small has-text-info">Categoría docente</label>
                    {errors.categoriaDocente && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la categoria de docente!</span>}

                    <Controller
                        name="categoriaDocente"
                        control={control}
                        rules={{ required: true }}
                        defaultValue ={ objeto?.categoria_docente ? {label:objeto.categoria_docente.categoria_docente, value: objeto.categoria_docente.id}: null}
                        render={
                            ({ field }) => (
                                <Select
                                    isClearable
                                    placeholder="Seleccione"
                                    {...field}
                                    options={
                                        categories.map(
                                            cat => ({ label: cat.categoria_docente, value: cat.id, key: cat.id })
                                        )
                                    }
                                />
                            )
                        }
                    />

                </div>



                <div className="column">
                    <label className="label is-small has-text-info">Puesto jerárquico superior</label>
                    {errors.puestoJerarquico && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione una opción!</span>}
                    <Controller
                        name="puestoJerarquico"
                        control={control}
                        rules={{ required: true }}
                        defaultValue={objeto?.puesto_jerarquico ? objeto.puesto_jerarquico : '' }
                        render={
                            ({field}) =>(
                                <RadioGroup 
                                    aria-label="puesto jerarquico"
                                    row
                                    {...field}
                                    
                                    onChange={
                                        ev=>setValue('puestoJerarquico', ev.target.value)
                                    }
                                    >
                                         <FormControlLabel
                                                    value="SI"
                                                    control={<Radio size="small" />}
                                                    label="SI"
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />
                                                <FormControlLabel
                                                    value="NO"
                                                    control={<Radio size="small" />}
                                                    label="NO"
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />

                                </RadioGroup>
                            )
                        }
                    />

                </div>
                <div className="column">
                    <label htmlFor="" className="label is-small has-text-info">
                        Horas laborables semanales
                    </label>
                    {errors.horasLaborablesSemanales && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Ingrese las horas laborables por semana!</span>}
                    <div className="control">
                        <input type="text" {...register("horasLaborablesSemanales", { required: true })} className="input" />

                    </div>
                    
                </div>
            </div>

        </>

    )
}

export default ContratoFuncionario;