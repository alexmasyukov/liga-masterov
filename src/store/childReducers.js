import { COLUMN_TYPES } from "constants/common"
import { getColumnDefaultValue, itemMove, setCategoriesPaths } from "helpers"

const getNewCategory = (id) => ({
  id,
  name: 'Новая'
})


export const withNewRow = (id, cid, { columns, helpers, rows }) => {
  const newRow = columns.reduce((res, column) => {
    let value = ''

    switch (column.type) {
      case COLUMN_TYPES.ID:
        value = id
        break

      case COLUMN_TYPES.CATEGORY_ID:
        value = cid
        break

      default:
        value = getColumnDefaultValue(column.default)
    }

    return {
      ...res,
      [column.name]: value
    }
  }, {})

  return [...rows, newRow]
}


export const withNewChildCategory = (id, pid, { helpers, categories }) => {
  const newCategory = {
    ...getNewCategory(id),
    pid
  }

  const idx = categories.findIndex(category => category.id === pid)

  const updated = [
    ...categories.slice(0, idx + 1),
    newCategory,
    ...categories.slice(idx + 1)
  ]

  return setCategoriesPaths(updated)
}

export const withNewCategory = (id, { categories }) =>
   setCategoriesPaths([
     ...categories,
     getNewCategory(id)
   ])


export const withUpdatedCategory = (updatedCategory, { categories }) => {
  const updated = categories.map(category =>
     category.id === updatedCategory.id ? {
       ...category,
       ...updatedCategory
     } : category
  )

  return setCategoriesPaths(updated)
}

export const withMovedImageInRow = (rowId, colKey, imageIdx, { rows }) => {
  return rows.map(row => row.id === rowId ?
     {
       ...row,
       [colKey]: itemMove(row.images, imageIdx, imageIdx - 1)
     } : row
  )
}

export const withAddImageInRow = (rowId, colKey, image, { rows }) => {
  return rows.map(row => row.id === rowId ?
     {
       ...row,
       images: [...row.images, image]
     } : row
  )
}

export const withoutCategory = (id, { categories, rows, columns }) => {
  const { cidKey } = columns
  const categoryToDelete = categories.find(({ id: requireId }) => requireId === id)
  // new pid is pid of deleting category or 0
  const newPidForChildCategories = 'pid' in categoryToDelete ? categoryToDelete.pid : 0

  const preparedCategories = categories.reduce((res, category) => {
    if (category.id === id) return res

    if ('pid' in category && category.pid === id) {
      // set new pid for child of deleting category
      return [...res, {
        ...category,
        pid: newPidForChildCategories
      }]
    }

    return [...res, category]
  }, [])

  const preparedRows = rows.filter(row => row[cidKey] !== id)

  return {
    categories: setCategoriesPaths(preparedCategories),
    rows: preparedRows
  }
}

