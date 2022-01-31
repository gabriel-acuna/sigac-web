import { useForm, Controller } from 'react-hook-form'
import { Fragment } from 'react'
import { Checkbox } from '@mui/material'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadRoles } from '../../../../store/roles'

let ModalForm = ({ title, handler, children, objeto }) => {


    const { handleSubmit, formState: { errors }, control } = useForm()
    const animatedComponents = makeAnimated()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(loadRoles())
    }, [dispatch])

    let rolesState = useSelector(state => state.roles.data.roles)
    console.log(objeto);
    return (
        <div className="modal is-active">
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <span className="has-text-weight-bold is-italic">{title}</span>

                </header>
                <section className="modal-card-body">

                    <form className="mt-4" onSubmit={handleSubmit(handler)}>
                        <div className="columns is-centered">
                            <div className="column">
                                <label className="label is-small has-text-info">Roles</label>

                                {errors.rol && <span className="has-text-danger is-size-7 has-background-danger-light">¡Por favor, Selecione uno o mas roles!</span>}
                                <Controller
                                    control={control}
                                    name='roles'
                                    defaultValue={objeto?.roles ? objeto.roles.map(rol => ({ label: rol.rol, value: rol.id, id: rol.id, descripcion: rol.descripcion, rol: rol.rol })) : []}
                                    render={
                                        ({ field }) => (
                                            <Select

                                                closeMenuOnSelect={false}
                                                components={animatedComponents}

                                                {...field}
                                                isMulti
                                                options={rolesState.map(
                                                    rol => ({ label: rol.rol, value: rol.id, id: rol.id, descripcion: rol.descripcion, rol: rol.rol })
                                                )}
                                            />
                                        )
                                    }
                                />


                            </div>
                            { objeto?.estado !== null && <div className="column">
                                <label className="label is-small has-text-info">Activo</label>
                                <Controller
                                    control={control}
                                    defaultValue={objeto?.estado}
                                    name='estado'
                                    render={({ field }) => <Checkbox {...field} defaultChecked={objeto.estado} />}
                                />
                            </div>}
                        </div>


                        <div className="field is-grouped" style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="control has-text-centered">
                                <Fragment>
                                    {children}
                                </Fragment>

                                <button type="submit" className="button is-success is-small mx-3">Guardar</button>

                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    )
}

export default ModalForm;