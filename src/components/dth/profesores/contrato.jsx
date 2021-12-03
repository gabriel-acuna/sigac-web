import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Controller } from 'react-hook-form'

let ContratoProfesor = ({ objeto, register, errors, relacion, control, setValue }) => {



    let nivelesEducativosState = useSelector(state => state.nivelesEducativos.data.nivelesEducativos)
    let tiposEscalafonesState = useSelector(state => state.tipoEscalafones.data.tipoEscalafones)
    let categoriasContratosState = useSelector(state => state.categoriasContratos.data.categoriasContrato)
    let tiemposDedicacionesState = useSelector(state => state.tiemposDedicaciones.data.tiemposDedicaciones)
    const [scaleType, setScaleType] = useState(null)
    
    useEffect(()=>{
        setScaleType(objeto?.escalafon_nombramiento?.escalafon_nombramiento)
    },[objeto])


    let filtarEscalafones = () => {

        let options = []
        if (relacion === 'NOMBRAMIENTO') {
            tiposEscalafonesState.forEach(es => {
                if (es.escalafon_nombramiento !== 'NO APLICA') {
                    options.push({ label: es.escalafon_nombramiento, value: es.id, key: es.id })
                }
            })

        } else if (relacion !== null && relacion !== '') {
            let es = tiposEscalafonesState.find(es => es?.escalafon_nombramiento === 'NO APLICA')
            options.push({ label: es?.escalafon_nombramiento, value: es?.id, key: es?.id })
        }
        return options
    }

    let filtrarCategorias = () => {
        let options = []
        if (relacion === 'NOMBRAMIENTO' && scaleType === 'LABORAL PREVIO') {
            categoriasContratosState.forEach(
                (row) => {
                    if (row.categoria_contrato.includes('TITULAR')) {
                        options.push({ label: row.categoria_contrato, value: row.id, key: row.id })
                    }
                })
        }
        else if (relacion === 'NOMBRAMIENTO' && scaleType === 'LABORAL ACTUAL') {
            categoriasContratosState.forEach(
                (row) => {
                    if (row.categoria_contrato.startsWith('PRINCIPAL')
                        || row.categoria_contrato.startsWith('AGREGADO')
                        || row.categoria_contrato.startsWith('AUXILIAR')) { options.push({ label: row.categoria_contrato, value: row.id, key: row.id }) }
                }
            )
        }
        else if (scaleType !== null && scaleType !== '') {
            categoriasContratosState.forEach(
                (row) => {
                    if (row.categoria_contrato.startsWith('OCASIONAL')
                        || row.categoria_contrato.startsWith('HONORARIO')
                        || row.categoria_contrato.startsWith('INVITADO')
                        || row.categoria_contrato.startsWith('NO TITULAR'))
                       { options.push({ label: row.categoria_contrato, value: row.id, key: row.id })}
                }
            )
        }

        return options
    }


    return (
        <>

            <div className="columns">
                <div className="column">
                    <label className="label is-small">CONTRATO RELACIONADO</label>
                    <div className="control">
                        <input  {...register("contratoRelacionado")} className="input" />

                        {errors.contratoRelacionado && <span>¡Por favor, Ingrese el número de documento!</span>}
                    </div>
                </div>
                <div className="column">
                    <div className="control">
                        <label className="label is-small">TIPO ESCALAFON</label>
                        {errors.escalafonNombramiento && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el tipo de escalafón!</span>}
                    </div>
                    <Controller
                        name="escalafonNombramiento"
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) => (
                                <Select
                                    {...field}

                                    onChange={(ev => {
                                        setScaleType(ev?.label)
                                        setValue("categoriaContrato", null)
                                        setValue("escalafonNombramiento", ev)
                                    })}
                                    placeholder="Seleccione"
                                    options={
                                        filtarEscalafones()
                                    }
                                />
                            )
                        }
                    />
                </div>

                <div className="column">
                    <div className="control">
                        <label className="label is-small">CATEGORIA</label>
                        {errors.categoriaContrato && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione la categoria contrato!</span>}
                    </div>
                    <Controller
                        name="categoriaContrato"
                        control={control}
                        rules={{ required: true }}
                        render={
                            ({ field }) => (
                                <Select
                                    {...field}

                                    onChange={(ev => {

                                        setValue("categoriaContrato", ev)
                                    })}
                                    placeholder="Seleccione"
                                    options={
                                        filtrarCategorias()
                                    }
                                />
                            )
                        }
                    />

                </div>


            </div>


            <div className="columns">
                <div className="column">
                    <div className="control">
                        <label className="label is-small">NIVEL</label>
                        {errors.nivel && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el nivel educativo en el que dicta clase el profesor!</span>}
                    </div>

                    <Controller
                        name="nivel"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=''
                        render={
                            ({ field }) => (
                                <RadioGroup aria-label="tiempo dedicación"
                                    {...field}
                                    onChange={
                                        ev => setValue('nivel', ev.target.value)
                                    }
                                >
                                    {
                                        nivelesEducativosState.map(
                                            nivel => (
                                                <FormControlLabel
                                                    value={nivel.id}
                                                    control={<Radio size="small" />}
                                                    label={nivel.nivel}
                                                    key={nivel.id}
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />
                                            )
                                        )
                                    }
                                </RadioGroup>
                            )
                        }
                    />

                </div>
                <div className="column">
                    <div className="control">
                        <label className="label is-small">TIEMPO DEDICACION</label>
                        {errors.tiempoDedicacion && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Seleccione el timepo de decicación!</span>}
                    </div>
                    <Controller
                        name="tiempoDedicacion"
                        control={control}
                        rules={{ required: true }}
                        defaultValue=''
                        render={
                            ({ field }) => (
                                <RadioGroup aria-label="tiempo dedicación"
                                    {...field}
                                    onChange={
                                        ev => setValue('tiempoDedicacion', ev.target.value)
                                    }
                                >
                                    {
                                        tiemposDedicacionesState.map(
                                            dedicacion => (
                                                <FormControlLabel
                                                    value={dedicacion.id}
                                                    control={<Radio size="small" />}
                                                    label={dedicacion.tiempo_dedicacion}
                                                    key={dedicacion.id}
                                                    sx={{
                                                        '& .MuiFormControlLabel-label': {
                                                            fontSize: 14,
                                                            fontWeight: 500
                                                        },
                                                    }}
                                                />
                                            )
                                        )
                                    }
                                </RadioGroup>
                            )
                        }
                    />
                </div>
                <div className="column">

                    <label className="label is-small">
                        REMUNERACION HORA
                    </label>
                    {errors.remuneracionHora && <span>¡Por favor, Ingrese la remuneración por hora!</span>}

                    <input type="number" defaultValue="0.00"  min="0" {...register("remuneracionHora")} className="input" />


                </div>



            </div>



        </>
    )
}

export default ContratoProfesor;