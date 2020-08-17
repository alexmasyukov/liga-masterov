import { ACTION_TYPES } from "store/actionTypes"
import {
  withAddImageInRow,
  withMovedImageInRow,
  withNewCategory,
  withNewChildCategory,
  withNewRow, withoutCategory,
  withUpdatedCategory
} from "store/childReducers"
import { itemMove } from "helpers"

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_ROW:
      return {
        ...state,
        rows: withNewRow(action.id, action.cid, state)
      }

    case ACTION_TYPES.MOVE_UP_ROW:
      return {
        ...state,
        rows: itemMove(state.rows, action.idx, action.idx - 1)
      }

    case ACTION_TYPES.MOVE_DOWN_ROW:
      return {
        ...state,
        rows: itemMove(state.rows, action.idx, action.idx + 1)
      }

    case ACTION_TYPES.ADD_CHILD_CATEGORY:
      return {
        ...state,
        categories: withNewChildCategory(action.id, action.pid, state)
      }

    case ACTION_TYPES.DELETE_ROW:
      return {
        ...state,
        rows: state.rows.filter(({ id }) => id !== action.id)
      }

    case ACTION_TYPES.CHANGE_CELL:
      return {
        ...state,
        rows: state.rows.map(row =>
           row.id === action.rowId ?
              { ...row, [action.colKey]: action.value } : row
        )
      }

    case ACTION_TYPES.CHANGE_CATEGORY:
      return {
        ...state,
        categories: withUpdatedCategory(action.category, state)
      }

    case ACTION_TYPES.MOVE_UP_CATEGORY:
      return {
        ...state,
        categories: itemMove(state.categories, action.idx, action.idx - 1)
      }


    case ACTION_TYPES.MOVE_DOWN_CATEGORY:
      return {
        ...state,
        categories: itemMove(state.categories, action.idx, action.idx + 1)
      }


    case ACTION_TYPES.DELETE_CATEGORY:
      const { categories, rows } = withoutCategory(action.id, state)
      return {
        ...state,
        categories,
        rows
      }

    case ACTION_TYPES.ADD_CATEGORY:
      return {
        ...state,
        categories: withNewCategory(action.id, state)
      }

    case ACTION_TYPES.MOVE_IMAGE:
      return {
        ...state,
        rows: withMovedImageInRow(
           action.rowId,
           action.colKey,
           action.imageIdx,
           state
        )
      }

    case ACTION_TYPES.ADD_IMAGE:
      itemMove(state.categories, action.idx, action.idx + 1)
      return {
        ...state,
        rows: withAddImageInRow(
           action.rowId,
           action.colKey,
           action.image,
           state
        )
      }


    default:
      return state
  }
}

export default reducer