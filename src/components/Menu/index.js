import React from 'react'
import { Link } from "react-router-dom"
import { ROUTES } from 'constants/routes'
import styles from 'app.module.sass'

const Menu = () => {
  return (
     <div className={styles.menu}>
       {ROUTES
          .filter(route => 'menuPosition' in route)
          .sort((a, b) => a.menuPosition - b.menuPosition)
          .map(({ menuPosition, path, name }, i) => (
             <Link key={i} to={`${path}`}>{name}</Link>
          ))}
     </div>
  )
}

export default Menu