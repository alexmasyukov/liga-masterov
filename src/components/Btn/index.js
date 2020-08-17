import React from 'react'
import cn from 'classnames'
import styles from 'components/Editor/editor.module.sass'

const Btn = ({ onClick = () => {}, title = '', className }) => (
   <div
      className={cn(styles.btn, className && className)}
      onClick={onClick}
   >{title}</div>
)

export default Btn