import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import { ROUTES } from 'constants/routes'
import { AppContext } from "components/AppContext"
import styles from 'app.module.sass'

const Menu = () => {
  const auth = useContext(AppContext)

  return (
     <div className={styles.menu}>
       {ROUTES
          .filter(route => 'menuPosition' in route)
          .sort((a, b) => a.menuPosition - b.menuPosition)
          .map(({ menuPosition, path, name }, i) => (
             <Link key={i} to={`${path}`}>{name}</Link>
          ))}
       <Link to={'#'} onClick={() => auth.signout()}>Выход</Link>
     </div>
  )
}

export default Menu