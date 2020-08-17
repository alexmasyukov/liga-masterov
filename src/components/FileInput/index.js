import React, { useRef, useState } from 'react'
import axios from "axios"


const FileInput = ({ children, uploadUrl, onUpload }) => {
  const [loading, setLoading] = useState(false)
  const fileInput = useRef(null)

  const handleClick = (event) => {
    event.stopPropagation()
    event.preventDefault()
    fileInput.current.click()
  }

  const handleOnChange = (event) => {
    event.stopPropagation()
    event.preventDefault()
    setLoading(true)

    const file = new FormData()
    file.append('attachments', event.currentTarget.files[0])
    axios.post(uploadUrl, file)
       .then(({ data, ...other }) => {
         const { status, result } = data
         console.log('then', data, status, result)

         setLoading(false)
         if (status === 'done') {
           onUpload(JSON.parse(result))
         } else {
           console.log(data, status, result)
           console.log(other)
           alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
         }
       })
       .catch(err => {
         console.log(err)
         setLoading(false)
         alert('Ошибка при загрузке изображения. Попробуйте другое изображение.')
       })
  }

  return (
     <div>
       <input
          style={{ display: 'none' }}
          type="file"
          accept=".png, .jpg, .jpeg, .gif"
          ref={fileInput}
          multiple={false}
          onChange={handleOnChange}
       />
       {children(loading, handleClick)}
     </div>
  )
}

// console.log(event.currentTarget.files[0])
// return axios[type]('', , { //this._uploadImagesBase
// headers: { 'Content-Type': 'multipart/form-data' },
// withCredentials: true
// })

export default FileInput