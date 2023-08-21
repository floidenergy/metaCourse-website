// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { BsFillSaveFill } from 'react-icons/bs'

import style from './style.module.css'

export default function CourseCard ({
  id,
  tags,
  thumbnail,
  downloadCount,
  courseName,
  type,
  downloadLink,
  classname
}) {
  const { t } = useTranslation()

  return (
    <div className={`${style.CourseCard} ${classname !== undefined ? classname : ""}`} >
      <ul className={style.tagsContainer}>
        {tags?.map((tag, index) => (
          <li className={`white b-blue`} key={index}>{tag}</li>
        ))}
      </ul>
      <div className={style.thumbnailContainer}>
        <img src={thumbnail} alt='Thumbnail' />
        <p className={`white b-blue`}>
            <BsFillSaveFill />&nbsp; {downloadCount || 0}
        </p>
      </div>
      <h3 className={`${style.cardTitle}`}>{courseName}</h3>
      <p className={`${style.cardDetail} gray`}>
        <span role='img'>📚</span>&nbsp;{type}&emsp;
      </p>
      <div className={style.actions}>
        <Link
          to={downloadLink}
          target='_blank'
          className={`button b-green white`}
        >
          {t('card.download')}
        </Link>
        <Link
          to={`/courses/${encodeURIComponent(id)}`}
          className={`button b-whiteGray black`}
        >
          {t('card.view')}
        </Link>
      </div>
    </div>
  )
}
