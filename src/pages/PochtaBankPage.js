import React from 'react'
import useScript from 'react-script-hook'
import CommonLayout from "layouts/CommonLayout"

const PochtaBankPage = () => {
  const [loading, error] = useScript({
    src: 'https://my.pochtabank.ru/sdk/v1/pos-credit.js',
    onload: () => onLoad()
  })

  const onLoad = () => {
    console.log('onLoad')
    const options = {
      ttCode: '0512001001901',
      ttName: 'Г ЧИТА, УЛ КРАСНОАРМЕЙСКАЯ, Д. 65',
      fullName: ' ',
      phone: ' ',
      category: 250,
      manualOrderInput: true
    }
    window.PBSDK.posCredit.mount('#pos-credit-container', options)

    // подписка на событие завершения заполнения заявки
    window.PBSDK.posCredit.on('done', function (id) {
      console.log('Id заявки: ' + id)
    })

    // При необходимости можно убрать виджет вызвать unmount
    // window.PBSDK.posCredit.unmount('#pos-credit-container');
  }


  return (
     <CommonLayout>
       {loading && <h1>Загрузка скриптов Почтабанка...</h1>}
       {error && <h1>Ошибка скриптов банка! ${error.message}</h1>}
       <div id="pos-credit-container"/>
     </CommonLayout>
  )
}

export default PochtaBankPage