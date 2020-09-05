import React, { useReducer } from 'react'
import useScript from 'react-script-hook'
import CommonLayout from "layouts/CommonLayout"
import Input from "components/Input"
import styles from 'app.module.sass'

const ACTION_TYPES = {
  SET_FIELD: 'SET_FIELD'
}


const setField = ({ field = '', value = '' }, state) => {
  return {
    ...state,
    [field]: value
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_FIELD:
      return setField(action, state)

    default:
      return state
  }
}

const initialState = {
  cost: 10000,
  service: 'Ремонт и отделка помещения',
  errors: {
    cost: false
  }
}

const OtpBankPage = () => {
  const [{ errors, ...state }, dispatch] = useReducer(reducer, initialState)
  const [loading, error] = useScript({
    src: 'https://shop.otpbank.ru/form/js/form.min.js',
    onload: () => onLoad()
  })

  const handleInputChange = (field = '') => ({ target: { value = '' } }) => {
    dispatch({
      type: ACTION_TYPES.SET_FIELD,
      field,
      value
    })
  }

  const onLoad = () => {
    console.log('onLoad')
    // window.$ = $
    // window.accessID = '1763'
  }

  const handleClick = () => {
    window.otpform.start({
      view: 'modal',
      accessID: '1763',
      tradeID: '12776',
      creditFirstPaymentFrom: '0',
      creditFirstPaymentTo: '99',
      creditTermFrom: '6',
      creditTermTo: '18',
      creditType: '1',
      items: [
        {
          'name': state.service,
          'count': '1',
          'price': state.cost
        }
      ]
    })
  }


  return (
     <CommonLayout className={styles.otpPage}>
       {loading && <h1>Загрузка скриптов банка ОТП...</h1>}
       {error && <h1>Ошибка скриптов банка! ${error.message}</h1>}

       <div className={styles.block}>
         <h1>Банк ОТП</h1>

         <Input
            name="password"
            onChange={handleInputChange('cost')}
            placeholder="Сумма"
            value={state.cost}
            hasError={errors.cost}
            meta={{ error: errors.cost }}
         />

         <Input
            name="password"
            onChange={handleInputChange('service')}
            placeholder="Услуга"
            value={state.service}
            hasError={errors.service}
            meta={{ error: errors.cost }}
         />

         {/*<input type="text" value={category}*/}
         {/*onChange={({ target: { value } }) => setCategory(value)}/>*/}
         <div className={styles.btn} onClick={handleClick}>Начать</div>
         <div id="pos-credit-container"/>
       </div>
     </CommonLayout>
  )
}

export default OtpBankPage