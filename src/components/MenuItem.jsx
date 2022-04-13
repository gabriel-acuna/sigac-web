import { useState } from "react"

let MenuItem = ({ label, id, onClick, isActive }) => {
    return (
        <li id={id} onClick={onClick}  className={isActive? 'active-menu-list':''}><p>{label}</p></li>
    )
}
export default MenuItem