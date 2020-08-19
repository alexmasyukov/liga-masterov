import React from 'react'
import cn from 'classnames'
import styles from 'components/Editor/editor.module.sass'

const Btn = ({ onClick = () => {}, title = '', className, children }) => (
   <div
      className={cn(styles.btn, className && className)}
      onClick={onClick}
   >{title || children}</div>
)

export default Btn