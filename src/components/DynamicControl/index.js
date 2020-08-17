import React from 'react'
import { INPUT_TYPES, COLUMN_TYPES } from "constants/common"
import Edit from "components/Edit"
import Images from "components/Images"


const DynamicControl = ({
                          rowId,
                          isEdit = false,
                          value,
                          column,
                          onChange
                        }) => {
  switch (column.type) {
    case COLUMN_TYPES.CHECK:
      return (
         <input
            type="checkbox"
            checked={value}
            onChange={onChange(rowId, column.name, column.type)}/>
      )

    case COLUMN_TYPES.STRING:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, column.name, column.type)}
        />
      }
      return value

    case COLUMN_TYPES.NUMBER:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, column.name, column.type)}
           number={true}
        />
      }
      return value

    case COLUMN_TYPES.TEXT:
      if (isEdit) {
        return <Edit
           initialValue={value}
           onEnter={onChange(rowId, column.name, column.type)}
           inputType={INPUT_TYPES.TEXTAREA}
        />
      }
      return value

    case COLUMN_TYPES.IMAGES:
      return <Images
         rowId={rowId}
         colKey={column.name}
         items={value}
      />

    default:
      return value
  }
}

export default React.memo(DynamicControl)