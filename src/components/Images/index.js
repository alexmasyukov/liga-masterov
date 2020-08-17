import React, { useContext } from 'react'
import cn from 'classnames'
import { CommonContext } from "components/CommonContext"
import {
  AiOutlineArrowLeft,
  AiOutlineCloudUpload,
  AiOutlineLoading
} from "react-icons/ai"
import FileInput from "components/FileInput"
import styles from 'components/Editor/editor.module.sass'


const Images = ({ rowId, colKey, items = [] }) => {
  const { handlers, config } = useContext(CommonContext)

  return (
     <div className={styles.images}>
       {items.map((images, idx) => {
         const [smallImg] = images
         return (
            <div
               key={idx}
               className={cn(styles.img, idx > 0 && styles.btnImgMoveLayer)}
               onClick={handlers.onImageMoveLeft(rowId, colKey, idx)}
            >
              {idx > 0 && (
                 <AiOutlineArrowLeft className={styles.btnImageLeft}/>
              )}
              <img
                 src={config.getImage(smallImg)}
                 alt=""
              />
            </div>
         )
       })}
       <div className={cn(styles.img, styles.btnImgageUpload)}>
         <FileInput
            uploadUrl={config.uploadImageUrl}
            onUpload={handlers.onAddImage(rowId, colKey)}
         >
           {(loading, onClick) =>
              loading ? (
                 <AiOutlineLoading className={styles.iconSpin}/>
              ) : (
                 <AiOutlineCloudUpload onClick={onClick}/>
              )
           }
         </FileInput>

       </div>

     </div>
  )
}


export default React.memo(Images)