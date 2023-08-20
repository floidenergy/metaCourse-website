import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { BsFillSaveFill } from 'react-icons/bs'
import style from './style.module.css'

import { entries } from '../../assets/Coursedatabase.json'

export default function CollectionCard ({
  collectionName,
  downloadCount,
  coursesID,
  collectionType
}) {
  const [courseData, setCourseData] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    setCourseData(
      coursesID.map(({ id }) => entries.courses.find(course => id == course.id))
    )
  }, [coursesID])

  return (
    <div className={style.collectionCard}>
      <div className={style.thumbnail}>
        {/* {courseData.slice(0, 4).map((course, index) => (
          <img key={index} src={course.thumbnail} alt='' />
        ))} */}

        {[...Array(4)].map((_, index) =>
          courseData[index] ? (
            <img key={index} src={courseData[index].thumbnail} alt='' />
          ) : (
            <div key={index} className={style.nullImage}></div>
          )
        )}
      </div>
      <div className={style.footerContainer}>
        <div className={style.info}>
          <h3 className={style.cardName}>{collectionName}</h3>
          <p className={`${style.type} gray`}>{collectionType}</p>
          <p className={`${style.downloadCount} gray`}>
            <BsFillSaveFill />
            &nbsp;{downloadCount} - {coursesID.length}&nbsp;{t('card.courses')}
          </p>
        </div>
        <div className={style.actions}>
          {/* TODO: Add button to add this collection */}
          {/* TODO: Add button to delete the collection */}
          <Link className={` button white b-green`} to={'#'} type='submit'>
            {t('card.download')}
          </Link>
          <Link className={` button black b-whiteGray`} to={'#'} type='submit'>
            {t('card.view')}
          </Link>
        </div>
      </div>
    </div>
  )
}
