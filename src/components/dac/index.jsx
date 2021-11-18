import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { loadPeridosAcademicos } from '../../store/dac/perido_academico'


let DAC = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    let periodosState = useSelector(state => state.periodosAcademicos.data.periodos)
    useEffect(
        () => dispatch(loadPeridosAcademicos())

        , []
    )

    return (<div className="container">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="field mt-4">
                <label className="label"> Periodos Académicos</label>


                <div className="select">
                    <select onChange={
                        (ev) =>{
                            if(ev.target.value !== ''){
                                console.log(periodosState.find( el=>el.id === parseInt(ev.target.value)));
                                navigate(
                                    'periodo', { state: periodosState.find( el=>el.id === parseInt(ev.target.value))}
                                )
                            }
                        }
                    }>
                        <option></option>
                        {
                            periodosState.map((p) => (<option value={p.id} key={p.id}> {p.nombre} </option>))
                        }

                    </select>
                </div>
            </div>

        </div>
    </div>)
}
export default DAC;