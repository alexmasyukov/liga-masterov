import React from 'react'
import cn from "classnames"
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai"
import CellDeleteButton from "components/CellDeleteButton"
import styles from 'components/Editor/editor.module.sass'

const CellMoveButtons = ({
                           upVisible = true,
                           downVisible = true,
                           onRowMoveUp,
                           onRowMoveDown,
                           onRowRemove
                         }) => {
  return (
     <div className={styles.cellButtons}>
       <AiOutlineArrowUp
          onClick={onRowMoveUp}
          className={cn(!upVisible && styles.empty)}
       />
       <AiOutlineArrowDown
          onClick={onRowMoveDown}
          className={cn(!downVisible && styles.empty)}
       />
       <CellDeleteButton onRowRemove={onRowRemove}/>
     </div>
  )
}

export default CellMoveButtons