'use client'
import { useState} from "react"
import { FaBars, FaTimes } from 'react-icons/fa'
import styles from "../styles/header.module.css"

export default function DropdownIcon() {

    const [click, setClick] = useState(false)
    const handleClick = () => {
        setClick(!click)
    }

    return (
        <div className={styles.menuIcon} onClick={handleClick}>
            {click ? <FaTimes /> : <FaBars />}
        </div>
    )
}