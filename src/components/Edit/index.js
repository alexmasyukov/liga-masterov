import React, { useState } from "react"
import { INPUT_TYPES } from "constants/common"
import styles from 'components/Editor/editor.module.sass'

const Edit = ({
                initialValue,
                inputType = INPUT_TYPES.INPUT,
                number = false,
                onEnter = () => {}
              }) => {
  const [value, setValue] = useState(initialValue)

  switch (inputType) {
    case INPUT_TYPES.TEXTAREA:
      return (
         <textarea
            className={styles.edit}
            autoFocus
            defaultValue={value}
            rows={1}
            onChange={({ target: { value } }) => setValue(value)}
            onKeyPress={e => e.key === 'Enter' ? onEnter(e) : false}
            onBlur={e => onEnter(e)}
         />
      )

    case INPUT_TYPES.INPUT:
      return (
         <input
            className={styles.edit}
            autoFocus
            type={number ? 'number' : 'text'}
            onChange={({ target: { value } }) => setValue(value)}
            onKeyPress={e => e.key === 'Enter' ? onEnter(e) : false}
            onBlur={e => onEnter(e)}
            value={value}
         />
      )

    default:
      return value
  }
}

export default Edit