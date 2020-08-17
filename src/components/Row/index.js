import React, { useContext } from 'react'
import { ColumnsContext } from "components/ColumnsContext"
import Cell from "components/Cell"
import { CommonContext } from "components/CommonContext"
import CellMoveButtons from "components/CellMoveButtons"
import CellDeleteButton from "components/CellDeleteButton"
import styles from "components/Editor/editor.module.sass"

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
  const { config } = useContext(CommonContext)

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
         <div className={styles.cellButtons}>
           {config.row.move && (
              <CellMoveButtons
                 upVisible={upVisible}
                 downVisible={downVisible}
                 onRowMoveDown={onRowMoveDown}
                 onRowMoveUp={onRowMoveUp}
              />
           )}
           {config.row.delete && (
              <CellDeleteButton onRowRemove={onRowRemove}/>
           )}
         </div>
       </td>
     </tr>
  )
}

export default React.memo(Row)