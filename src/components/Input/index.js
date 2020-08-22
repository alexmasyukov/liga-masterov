import React from 'react'
import cn from 'classnames'
import styles from 'app.module.sass'

const Input = ({
                 name,
                 value = '',
                 disabled = false,
                 placeholder = '',
                 onChange = () => {
                 },
                 onKeyPress = () => {},
                 style = {},
                 hasError,
                 meta = {
                   error: ''
                 }
               }) => (
   <div
      className={cn(
         styles.has_float_label, hasError && styles.has_error
      )}
      style={style}
   >
     <input
        type="text"
        style={style}
        id={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={onKeyPress}
     />
     <label htmlFor={name}>{placeholder}</label>

     {hasError && (
        <span className={styles.error}>{meta.error}</span>
     )}
   </div>
)

export default Input