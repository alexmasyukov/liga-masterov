import React, { useContext } from 'react'
import Menu from "components/Menu"
import { AppContext } from "components/AppContext"
import cn from 'classnames'
import styles from 'app.module.sass'


const CommonLayout = ({ className, children }) => {
  const auth = useContext(AppContext)

  return (
     <>
       {auth.isAuthenticated && (
          <Menu/>
       )}
       <div className={cn(styles.layout, className && className)}>
         {children}
       </div>
     </>
  )
}

export default CommonLayout