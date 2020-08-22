import React from 'react'
import { Link } from "react-router-dom"
import { LINKS } from "constants/common"
import CommonLayout from "layouts/CommonLayout"
import styles from "app.module.sass"

const NotFoundPage = () => {
  return (
     <CommonLayout className={styles.loginPage}>
       <h1>404</h1>
       <Link to={LINKS.HOME.link}>На главную</Link>
     </CommonLayout>
  )
}

export default NotFoundPage