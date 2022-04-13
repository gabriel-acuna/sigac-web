import { Fragment } from 'react'
let AsideMenu = ({ background, children }) => {
    return (
        <aside className='menu' style={{ borderRadius: '10px', background }}>
            <ul className="menu-list">
                <Fragment>
                    {children}
                </Fragment>
            </ul>


        </aside>
    )
}

export default AsideMenu