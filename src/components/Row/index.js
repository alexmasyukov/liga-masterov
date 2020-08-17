import React, { useContext } from 'react'
import { ColumnsContext } from "components/ColumnsContext"
import Cell from "components/Cell"
import CellMoveButtons from "components/CellMoveButtons"

const Row = ({
               id,
               values,
               onRowMoveDown,
               onRowMoveUp,
               onRowRemove,
               upVisible,
               downVisible
             }) => {
  const columns = useContext(ColumnsContext)

  return (
     <tr>
       {columns.map(column => {
         if (column.hidden) return null

         return (
            <Cell
               key={id + column.name}
               column={column}
               rowId={id}
               value={values[column.name]}
            />
         )
       })}
       <td>
         <CellMoveButtons
            upVisible={upVisible}
            downVisible={downVisible}
            onRowMoveDown={onRowMoveDown}
            onRowMoveUp={onRowMoveUp}
            onRowRemove={onRowRemove}
         />
       </td>
     </tr>
  )
}

export default React.memo(Row)