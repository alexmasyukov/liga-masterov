import React, { useCallback, useEffect, useReducer, useState } from 'react'
import Editor from "components/Editor"
import { COLUMN_TYPES } from "constants/common"
import { createCounter } from "helpers"
import axios from 'axios'
import { AiOutlineLoading } from "react-icons/ai"
import styles from "components/Editor/editor.module.sass"
import { ACTION_TYPES } from "store/actionTypes"
import './app.module.sass'
import Btn from "components/Btn"

const baseUrl = 'https://xn----7sbitok.xn--p1ai'

// const style = {
//   textAlign: 'center'
// }

const columns = [
  {
    id: 1,
    title: 'ID',
    type: COLUMN_TYPES.ID,
    name: 'id',
    order: 1
  },
  {
    id: 2,
    title: 'CID',
    type: COLUMN_TYPES.CATEGORY_ID,
    name: 'cid',
    default: '',
    order: 2
  },
  {
    id: 3,
    title: 'Название',
    type: COLUMN_TYPES.STRING,
    name: 'name',
    default: '',
    order: 3
  },
  {
    id: 4,
    title: 'Цена',
    type: COLUMN_TYPES.NUMBER,
    name: 'price',
    default: 0
  },
  {
    id: 5,
    title: 'Измеряется',
    type: COLUMN_TYPES.STRING,
    name: 'units',
    default: 'шт.'
  },
  {
    id: 6,
    title: 'Единиц',
    type: COLUMN_TYPES.NUMBER,
    name: 'def_count',
    default: 1
  }
  // {
  //   id: 16,
  //   title: 'Товар недели',
  //   type: COLUMN_TYPES.CHECK,
  //   name: 'tovar--nedeli',
  //   default: false,
  //   order: 9,
  //   style
  // },
  // {
  //   id: 11,
  //   title: 'Скидка %',
  //   type: COLUMN_TYPES.NUMBER,
  //   name: 'skidka',
  //   default: '12',
  //   order: 10
  // },
  // {
  //   id: 6,
  //   title: 'Описание',
  //   type: COLUMN_TYPES.TEXT,
  //   name: 'description',
  //   default: '',
  //   order: 11
  // },
  // {
  //   id: 30,
  //   title: 'Фото',
  //   type: COLUMN_TYPES.IMAGES,
  //   name: 'images',
  //   default: [
  //     ['small_27_03_2020_09_08_53_779J6zxr.jpg', '27_03_2020_09_08_53_779J6zxr.jpg'],
  //     ['small_10_03_2020_11_28_42_172NfmB6.jpg', '10_03_2020_11_28_42_172NfmB6.jpg']
  //   ],
  //   order: 12
  // }
]

const initialConfig = {
  idCounter: createCounter(1),
  cidCounter: createCounter(1),
  getImage: (img) => `${baseUrl}/sync/${img}`,
  uploadImageUrl: `${baseUrl}/cms/pages/db_orders/get_img_test.php`,
  category: {
    add: true,
    edit: true,
    delete: true,
    move: true,
    child: true,
    filelds: {
      description: false,
      image: true
    }
  },
  row: {
    add: true,
    delete: true,
    move: true
  }
}

const initialState = {
  loading: false,
  saving: false,
  config: initialConfig,
  data: {
    columns: [],
    rows: [],
    categories: []
  }
}


const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_DATA_REQUEST:
      return {
        ...initialState,
        loading: true,
        saving: false,
        error: false
      }

    case ACTION_TYPES.FETCH_DATA_SUCCESS:
      const lastRowsId = Math.max(...action.data.rows.map(({ id = 0 }) => id))
      const lastCid = Math.max(...action.data.categories.map(({ id = 0 }) => id))
      return {
        ...state,
        data: { ...action.data },
        config: {
          ...state.config,
          idCounter: createCounter(lastRowsId + 1),
          cidCounter: createCounter(lastCid + 1)
        },
        loading: false,
        saving: false,
        error: false
      }

    case ACTION_TYPES.FETCH_DATA_FAILURE:
      return {
        ...initialState,
        loading: false,
        saving: false,
        error: 'error'
      }

    case ACTION_TYPES.SAVE_DATA_REQUEST:
      return {
        ...state,
        saving: true,
        error: false
      }

    case ACTION_TYPES.SAVE_DATA_SUCCESS:
      return {
        ...state,
        saving: false,
        error: false
      }

    case ACTION_TYPES.SAVE_DATA_FAILURE:
      return {
        ...state,
        saving: false,
        error: 'Ошибка сохранения каталога'
      }

    default:
      return state
  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  let fullData = {}

  const handleOnChange = (data) => {
    fullData = data
    console.log('handleOnChange', fullData)
  }

  const fetchData = async () => {
    dispatch({
      type: ACTION_TYPES.FETCH_DATA_REQUEST
    })

    // setTimeout(() => {
    //   const { rows, categories } = demoCatalog
    //   dispatch({
    //     type: ACTION_TYPES.FETCH_DATA_SUCCESS,
    //     data: {
    //       rows,
    //       categories,
    //       columns
    //     }
    //   })
    // }, 0)

    try {
      const result = await axios.get(`${baseUrl}/api/v1/catalog/read.php`)
      dispatch({
        type: ACTION_TYPES.FETCH_DATA_SUCCESS,
        data: {
          ...result.data,
          columns
        }
      })
    } catch (e) {
      dispatch({
        type: ACTION_TYPES.FETCH_DATA_FAILURE,
        loading: false,
        error: 'Ошибка загрузки каталога'
      })
      console.log('fetchData', e)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const handleSave = async () => {
    dispatch({
      type: ACTION_TYPES.SAVE_DATA_REQUEST
    })

    try {
      const result = await axios.post(`${baseUrl}/api/v1/catalog/save.php`, {
        data: fullData
      })
      console.log(result)
      dispatch({
        type: ACTION_TYPES.SAVE_DATA_SUCCESS
      })
    } catch (e) {
      console.log('save save', e)
      dispatch({
        type: ACTION_TYPES.SAVE_DATA_FAILURE
      })
    }
  }


  return (
     <div className="App">
       {!state.loading && (
          <div className={styles.appBtns}>
            <h1>Прайс-лист</h1>
            {state.error && <h1 className={styles.error}>{state.error}</h1>}
            <Btn onClick={handleSave}>
              {state.saving ? (
                 <AiOutlineLoading className={styles.iconSpin}/>
              ) : (
                 'Сохранить'
              )}
            </Btn>
          </div>
       )}
       {state.loading ? (
          <div className={styles.loading}>
            <AiOutlineLoading className={styles.iconSpin}/>
            {` `}
            Загрузка каталога...
          </div>
       ) : (
          <Editor
             config={state.config}
             data={state.data}
             onChange={handleOnChange}/>
       )}
     </div>
  )
}

export default App
