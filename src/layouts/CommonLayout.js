import React, { Component } from 'react'
import Menu from "components/Menu"
import styles from 'app.module.sass'

class CommonLayout extends Component {
  render() {
    return (
       <div>
         <Menu/>
         <div className={styles.layout}>
           {this.props.children}
         </div>
       </div>
    )
  }
}

export default CommonLayout