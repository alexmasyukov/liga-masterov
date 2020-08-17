import React, { useContext } from 'react'
import { ColumnsContext } from "components/ColumnsContext"

const ColumnHeaders = () => {
  const columns = useContext(ColumnsContext)

  return (
     <tr>
       {columns.map(({ id, title, hidden }) => {
         if (hidden) return null
         return (
            <th key={id}>{title}</th>
         )
       })}
     </tr>
  )
}

export default  React.memo(ColumnHeaders)