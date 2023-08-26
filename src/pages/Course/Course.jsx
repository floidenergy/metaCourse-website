import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet'

import style from './style.module.css'
import { entries } from '../../assets/Coursedatabase.json'

import CourseCard from '../../elements/courceCard/Card'

export default function Course () {
  const currentLangCode = localStorage.getItem('language') || 'en'
  const location = useLocation()
  const { t } = useTranslation()

  const [wilayasCourse, setWilayasCourse] = useState([])
  const [facultyCourse, setFacultyCourse] = useState([])
  const [fieldCourse, setFieldCourse] = useState([])

  const params = useMemo(() => new URLSearchParams(location.search), [location])
  const course = entries.courses.find(course => course.id == params.get('id'))

  useEffect(() => {
    setWilayasCourse(
      entries.courses.filter(
        item => item[currentLangCode].wilaya == course[currentLangCode].wilaya
      )
    )
    setFacultyCourse(
      entries.courses.filter(
        item => item[currentLangCode].faculty == course[currentLangCode].faculty
      )
    )
    setFieldCourse(
      entries.courses.filter(
        item =>
          item[currentLangCode].fieldOfStudy ==
          course[currentLangCode].fieldOfStudy
      )
    )
  }, [course, currentLangCode])

  return (
    <main className={`${style.CourseProfile} b-whiteBlue`}>
      <Helmet>
        <title>{course[currentLangCode].title} | {t('website.name')}</title>
        <meta name='description' content={course[currentLangCode].description}/>
      </Helmet>
      <section className={`${style.courseInfo} b-white`}>
        <div className={style.leftSide}>
          <img src={course.thumbnail} alt='' />
          <Link to={course.link} className={` button white b-green`}>
            {t('card.download')} ({course.downloadCount})
          </Link>
        </div>
        <div className={style.rightSide}>
          <p className={`${style.title} black`}>{course[currentLangCode].title}</p>
          <p className={`${style.faculty} gray`}>
            {course[currentLangCode].faculty} -{' '}
            {course[currentLangCode].fieldOfStudy} (
            {course[currentLangCode].wilaya})
          </p>
          <ul className={style.tagsContainer}>
            {course[currentLangCode].tags?.map((tag, index) => (
              <li className={`white b-blue`} key={index}>
                {tag}
              </li>
            ))}
          </ul>
          <div className={style.about}>
            <p className={`${style.header} green underlined bold`}>
              {t('coursePage.descriptionTitle')}:
            </p>
            <p className={`${style.description} black`}>
              {course[currentLangCode].description}
            </p>
          </div>
        </div>
      </section>
      <section className={`${style.suggestion} b-white`}>
        <header>
          <p className='green bold'>{course[currentLangCode].wilaya}</p>
          <Link
            to={`/search?wilaya=${course[currentLangCode].wilaya}`}
            className={`blue bold underlined`}
          >
            {t('card.view')}
          </Link>
        </header>
        <div className={style.cards}>
          {wilayasCourse.slice(0, 4).map((item, index) => (
            <CourseCard
              key={index}
              id={item.id}
              tags={item[currentLangCode].tags}
              thumbnail={item.thumbnail}
              downloadCount={item.downloadCount}
              courseName={item[currentLangCode].title}
              type={`${item[currentLangCode].faculty} - ${item[currentLangCode].fieldOfStudy} - (${item[currentLangCode].wilaya})`}
              classname={style.card}
            />
          ))}
        </div>
      </section>
      <section className={`${style.suggestion} b-white`}>
        <header>
          <p className='green bold'>{course[currentLangCode].faculty}</p>
          <Link
            to={`/search?faculty=${course[currentLangCode].faculty}`}
            className={`blue bold underlined`}
          >
            {t('card.view')}
          </Link>
        </header>
        <div className={style.cards}>
          {facultyCourse.slice(0, 4).map((item, index) => (
            <CourseCard
              key={index}
              id={item.id}
              tags={item[currentLangCode].tags}
              thumbnail={item.thumbnail}
              downloadCount={item.downloadCount}
              courseName={item[currentLangCode].title}
              type={`${item[currentLangCode].faculty} - ${item[currentLangCode].fieldOfStudy} - (${item[currentLangCode].wilaya})`}
              classname={style.card}
            />
          ))}
        </div>
      </section>
      <section className={`${style.suggestion} b-white`}>
        <header>
          <p className='green bold'>{course[currentLangCode].fieldOfStudy}</p>
          <Link
            to={`/search?field=${course[currentLangCode].fieldOfStudy}`}
            className={`blue bold underlined`}
          >
            {t('card.view')}
          </Link>
        </header>
        <div className={style.cards}>
          {fieldCourse.slice(0, 4).map((item, index) => (
            <CourseCard
              key={index}
              id={item.id}
              tags={item[currentLangCode].tags}
              thumbnail={item.thumbnail}
              downloadCount={item.downloadCount}
              courseName={item[currentLangCode].title}
              type={`${item[currentLangCode].faculty} - ${item[currentLangCode].fieldOfStudy} - (${item[currentLangCode].wilaya})`}
              classname={style.card}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
