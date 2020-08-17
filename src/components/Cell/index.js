import React, { useContext, useEffect, useState } from 'react'
import cn from 'classnames'
import DynamicControl from "components/DynamicControl"
import { COLUMN_TYPES } from "constants/common"
import { CommonContext } from "components/CommonContext"
import styles from 'components/Editor/editor.module.sass'


const Cell = ({ column, rowId, value }) => {
  const [isEdit, setIsEdit] = useState(false)
  const { handlers } = useContext(CommonContext)
  const { style } = column

  useEffect(() => {
    setIsEdit(false)
  }, [value])

  const handleCellClick = () => {
    setIsEdit(true)
  }

  const handleCellChange = (...args) => (e) => {
    setIsEdit(false)
    handlers.onChangeCell(...args)(e)
  }


  let cellHandlers = {}
  switch (column.type) {
    case COLUMN_TYPES.ID:
    case COLUMN_TYPES.CATEGORY_ID:
    case COLUMN_TYPES.LABEL:
    case COLUMN_TYPES.IMAGES:
      break

    default:
      cellHandlers.onClick = handleCellClick
  }

  return (
     <td
        key={column.name}
        style={style}
        className={cn(
           (isEdit || column.type === COLUMN_TYPES.IMAGES) && styles.editCell
        )}
        {...cellHandlers}
     >
       <DynamicControl
          rowId={rowId}
          isEdit={isEdit}
          value={value}
          column={column}
          onChange={handleCellChange}
       />
     </td>
  )
}


export default React.memo(Cell)