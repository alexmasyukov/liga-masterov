import React, { useContext, useState } from "react"
import cn from 'classnames'
import ColumnHeaders from "components/ColumnHeaders"
import Row from "components/Row"
import { CommonContext } from "components/CommonContext"
import CategoryName from "components/CategoryName"
import Btn from "components/Btn"
import styles from 'components/Editor/editor.module.sass'


const Category = ({
                    name = '',
                    path = '',
                    description = '',
                    id,
                    pid,
                    idx,
                    visibleMoveUp = true,
                    visibleMoveDown = true,
                    rows = []
                  }) => {
  const { handlers, config } = useContext(CommonContext)
  const [visibleRows, setVisibleRows] = useState(rows.length <= 0)


  const addRowButton =
     <Btn
        title="+ Услуга"
        onClick={handlers.onAddRow(id)}
     />


  const addChildCategoryButton =
     <Btn
        title="+ Подкатегория"
        onClick={handlers.onAddChildCategory(id)}
     />


  const deleteCategoryButton =
     <Btn
        title="Удалить"
        onClick={handlers.onCategoryDelete(id)}
     />

  return (
     <div
        key={id}
        className={cn(styles.block, rows.length && styles.mb)}
     >
       <div className={styles.category}>
         <CategoryName
            categoryId={id}
            categoryParentId={pid}
            name={name}
            path={path}
            description={description}
            count={rows.length}
            onChange={handlers.onChangeCategory}
            onClick={() => setVisibleRows(!visibleRows)}
         />
         <div className={styles.btns}>
           {!rows.length && <>
             {config.row.add && <>{addRowButton}{' | '}</>}
             {config.category.child && <>{addChildCategoryButton}{' | '}</>}
           </>}
           {config.category.delete && <>{deleteCategoryButton}{' | '}</>}
           {config.category.move && <>
             <Btn
                title="Вверх"
                onClick={handlers.onCategoryMoveUp(idx)}
                className={cn(!visibleMoveUp && styles.empty)}
             />
             {' | '}
             <Btn
                title="Вниз"
                onClick={handlers.onCategoryMoveDown(idx)}
                className={cn(!visibleMoveDown && styles.empty)}
             />
           </>}
         </div>
       </div>

       {rows.length > 0 && visibleRows && (
          <table className={styles.products}>
            <tbody>
            <ColumnHeaders/>
            {rows.map((row, idx) =>
               <Row
                  key={idx}
                  id={row.id}
                  onRowMoveDown={handlers.onRowMoveDown(row.id)}
                  onRowMoveUp={handlers.onRowMoveUp(row.id)}
                  onRowRemove={handlers.onRowRemove(row.id)}
                  upVisible={idx > 0}
                  downVisible={idx < rows.length - 1}
                  values={row}
               />
            )}
            <tr>
              <td colSpan={999} className={styles.btns}>
                {config.row.add && <>{addRowButton}{' | '}</>}
                {config.category.child && addChildCategoryButton}
              </td>
            </tr>
            </tbody>
          </table>
       )}
     </div>
  )
}

export default React.memo(Category)