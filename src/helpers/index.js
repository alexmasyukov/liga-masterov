export const getColumnKeyName = (id) => `col${id}`
// export const getCategoryKeyName = (id) => `c${id}`

export const assignWithEmptyShema = (byKey) => ({
  byKey,
  get values() {
    return Object.values(this.byKey)
  },
  get keys() {
    return Object.keys(this.byKey)
  }
})

export const itemMove = (array, from, to) => {
  const update = [...array]
  update[to] = array[from]
  update[from] = array[to]
  return update
}

export const compose = (...funcs) => x => funcs.reduceRight((r, f) => f(r), x)

export function createCounter(start) {
  let id = start
  return function () {
    return id++
  }
}

export const getColumnDefaultValue = (defaultValue) =>
  typeof (defaultValue) === 'function' ? defaultValue() : defaultValue


export const getCategoryById = (id, categories) =>
   categories.find(category => category.id === id)


export const getCategoryPath = (id, categories = [], init = []) => {
  const category = getCategoryById(id, categories)

  return 'pid' in category && category.pid !== 0 && category.pid !== '0' ?
     getCategoryPath(category.pid, categories, [category.name, ...init]) :
     [category.name, ...init].join('/')
}

export const setCategoriesPaths = (categories) => {
  const getPath = (id) => getCategoryPath(id, categories)

  return categories.map(category => ({
    ...category,
    path: getPath(category.id)
  }))
}


// const normalizeRowValuesByKeys = (rows, keys) => {
//   return rows.map(row =>
//      keys.reduce((res, key, i) => ({
//        ...res,
//        [key]: row[i]
//      }), {})
//   )
// }
//
//
// const normalize = (getKeyName = (id) => getColumnKeyName(id)) => (array) => {
//   const byKey = array.reduce((res, item) => {
//     return {
//       ...res,
//       [getKeyName(item.id)]: item
//     }
//   }, {})
//   return assignWithEmptyShema(byKey)
// }
//
//
// const setDefaultValues = (rows, columns) => {
//   return rows.map(row =>
//      columns.keys.reduce((preparedRow, colKey) => {
//        const value = row[colKey]
//        const column = columns.byKey[colKey]
//        const columnDefaulValue = 'default' in column ? column.default : undefined
//
//        return {
//          ...preparedRow,
//          [colKey]: value ? value : columnDefaulValue
//        }
//      }, {})
//   )
// }
//
//
// const getKeyByColumnType = (columnType, columns) =>
//    columns.keys.filter(key => columns.byKey[key].type === columnType)
