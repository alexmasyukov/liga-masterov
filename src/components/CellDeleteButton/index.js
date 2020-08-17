import React from 'react'
import { AiOutlineDelete } from "react-icons/ai"

const CellDeleteButton = ({ onRowRemove }) => {
  return (
     <AiOutlineDelete onClick={onRowRemove}/>
  )
}

export default CellDeleteButton