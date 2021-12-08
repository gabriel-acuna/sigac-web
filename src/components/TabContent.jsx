import { Fragment } from 'react';

import ReactDatatable from '@yun548/bulma-react-datatable'
let TabContent = ({ title, columns, rows, children, desc, noData }) => {

    return (
        <>

            <div className="columns is-centered">
                <div className="column is-6">
                    <Fragment>
                        {children}
                    </Fragment>
                </div>
            </div>
            <div className="columns is-centered mb-6">
                <div className="column is-8">

                    <ReactDatatable style={{ justifyContent: 'center' }}
                        className="table is-bordered is-striped"
                        tHeadClassName="is-info"
                        config={{
                            page_size: 10,
                            length_menu: [10, 20, 50],
                            show_pagination: true,
                            pagination: 'advance',
                            button: {
                                excel: false,
                                print: false
                            },
                            language: {
                                length_menu: `Mostrar _MENU_ ${desc} por página`,
                                filter: "Buscar en registros ...",
                                no_data_text: noData,
                                info: `Mostrando _START_ a _END_ de _TOTAL_ ${desc}`,
                                pagination: {
                                    first: "Primera",
                                    previous: "Anterior",
                                    next: "Siguiente",
                                    last: "Ultima"
                                }

                            }
                        }}
                        records={rows}
                        columns={columns}

                    />
                    {/* <table className="table is-bordered">
                            <thead>
                                <tr>
                                    {
                                        columns.map(
                                            (col,index) => (
                                                <th key={`0${title.substring(0,3)}${index}`}>{col}</th>
                                            )
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    rows
                                }
                            </tbody>
                        </table> */}
                </div>
            </div>



        </>
    )
}

export default TabContent;