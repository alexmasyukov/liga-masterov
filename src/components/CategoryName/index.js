import React, { useContext, useState } from 'react'
import cn from 'classnames'
import Btn from "components/Btn"
import { CategoriesContext } from "components/CategoriesContext"
import { CommonContext } from "components/CommonContext"
import FileInput from "components/FileInput"
import { AiOutlineLoading } from "react-icons/ai"
import styles from 'components/Editor/editor.module.sass'

const ParentCategorySelector = ({
                                  skipCategoryId = 0,
                                  selectCategoryById = 0,
                                  onChange = () => {
                                  }
                                }) => {
  const categories = useContext(CategoriesContext)

  return (
     <select value={selectCategoryById} onChange={onChange}>
       <option key={0} value={0}>/</option>
       {categories
          .filter(({ id }) => id !== skipCategoryId)
          .map(({ id, path }) => (
             <option key={id} value={id}>
               {path}/
             </option>
          ))}
     </select>
  )
}

const CategoryName = ({
                        categoryId,
                        categoryParentId: initialPid = 0,
                        name: initialName,
                        description: initialDescription,
                        path = '',
                        count = 0,
                        images = [],
                        onChange,
                        onClick
                      }) => {
  const { config, handlers } = useContext(CommonContext)
  const [isEdit, setIsEdit] = useState(false)
  const [name, setName] = useState(initialName)
  const [editLinkVisible, setEditLinkVisible] = useState(true)
  const [description, setDescription] = useState(initialDescription)
  const [pid, setPid] = useState(initialPid)
  const [image] = images

  const handleNameClick = () => {
    setIsEdit(true)
  }

  const handleSaveClick = () => {
    setIsEdit(false)
    onChange({
      id: categoryId,
      pid,
      name,
      description
    })
  }

  return isEdit ? (
     <div className={styles.categoryEditor}>
       <div className={styles.col}>
         <h2 className={styles.name}>Редактирование категории "{initialName}"</h2>
       </div>
       <div className={styles.row}>
         <div className={styles.col}>
           <p>Родительская категория</p>
           <ParentCategorySelector
              skipCategoryId={categoryId}
              selectCategoryById={pid}
              onChange={({ target: { value } }) => setPid(value)}
           />
         </div>
         <div className={styles.col}>
           <p>Название</p>
           <input
              autoFocus
              className={styles.edit}
              onChange={({ target: { value } }) => setName(value)}
              value={name}
           />
         </div>
       </div>
       <div className={styles.row}>
         {config.category.filelds.description && (
            <div className={styles.col}>
              <p>Описание</p>
              <textarea
                 className={cn(styles.edit, styles.desc)}
                 onChange={({ target: { value } }) => setDescription(value)}
                 rows={4}
                 defaultValue={description}
              />
            </div>
         )}
         {config.category.filelds.image && (
            <div className={styles.col}>
              <div className={cn(styles.image, styles.bigImage)}>
                {image && (
                   <img src={config.getImage(image[0])} alt=''/>
                )}
              </div>
              <FileInput
                 onUpload={handlers.onCategoryAddImage(categoryId)}
                 uploadUrl={config.uploadImageUrl}
              >
                {(loading, onClick) =>
                   loading ? (
                      <AiOutlineLoading className={styles.iconSpin}/>
                   ) : (
                      <Btn
                         onClick={onClick}
                         title="Загрузить изображение"
                      />
                   )}
              </FileInput>
            </div>
         )}
         <div className={styles.col}>
           <Btn onClick={handleSaveClick} title="Сохранить"/>
         </div>
       </div>
     </div>
  ) : (
     <div
        onClick={onClick}
        className={styles.title}
        onMouseEnter={() => setEditLinkVisible(true)}
        onMouseLeave={() => setEditLinkVisible(false)}
     >
       {config.category.filelds.image && (
          <div className={styles.image}>
            {image && (
               <img src={config.getImage(image[0])} alt=''/>
            )}
          </div>
       )}
       <div>
         {path}
         {count > 0 && <span>{count} услуг</span>}
       </div>

       {config.category.edit && editLinkVisible && (
          <Btn
             title={'Редактировать'}
             onClick={handleNameClick}
             className={styles.editLink}
          />
       )}
     </div>
  )
}

export default React.memo(CategoryName)