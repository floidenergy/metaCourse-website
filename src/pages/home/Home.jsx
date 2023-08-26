// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import style from './style.module.css'
import { entries } from '../../assets/Coursedatabase.json'

import CourseCard from '../../elements/courceCard/Card'
// import CollectionCard from '../../elements/collectionCard/CollectionCard'

export default function Home () {
  const { t } = useTranslation()

  const currentLangCode = localStorage.getItem('language') || 'en'

  const wilayas = {}
  for (let index = 0; index < entries.courses.length; index++) {
    const element = entries.courses.at(index)[currentLangCode].wilaya
    if (wilayas[element]) wilayas[element]++
    else wilayas[element] = 1
  }

  return (
    <main>
      <header className={style.hero}>
        <div className={`${style.heroDescription} black`}>
          <h2 className={style.title}>{t('hero.title')}</h2>
          <p className={style.description}>{t('hero.description')}</p>
          <Link className='button b-green white' to={'/search'}>
            {t('hero.action')}
          </Link>
        </div>
        <div className={style.heroImage}>
        </div>
      </header>
      <section className={`${style.wilayas} b-white`}>
        <p className={`${style.sectionTitle} titleHeaderC black`}>
          {t('wilayasDisplay.title')}
        </p>
        <div className={style.wilayasListContainer}>
          {Object.keys(wilayas).map(key => (
            <Link
              to={`/search?wilaya=${key}`}
              key={key}
              className={`${style.wilaya} black b-green`}
            >
              <span className={style.name}>{key}</span>
              <span className={`${style.numberOfCourses} b-white`}>
                {wilayas[key]}
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className={`${style.explore} b-whiteBlue`}>
        <header className={`${style.header}`}>
          <p className={`${style.sectionTitle} titleHeaderL black`}>
            {t('explore.title')}
          </p>
        </header>
        <div className={style.coursesCardContainer}>
          {entries.courses.slice(0, 8).map(course => {
            return (
              <CourseCard
                key={course.id}
                id={course.id}
                tags={course[currentLangCode].tags}
                thumbnail={course.thumbnail}
                downloadCount={course.downloadCount}
                courseName={course[`${currentLangCode}`]['title']}
                type={`${course[currentLangCode]['faculty']} - ${course[currentLangCode]['fieldOfStudy']}`}
                downloadLink={course.link}
                classname={style.courseCard}
              />
            )
          })}
        </div>
      </section>

      {/* COLLECTIONS */}
      {/* <section className={`${style.collections} b-whiteBlue`}>
        <header className={`${style.header}`}>
          <p className={`${style.sectionTitle} titleHeaderL black`}>
            {t('collection.title')}
          </p>
        </header>
        <div className={style.collectionCardContainer}>
          {entries.collection.slice(0, 8).map((collection, index) => (
            <CollectionCard
              key={index}
              collectionName={collection[currentLangCode]['name']}
              collectionType={`${collection[currentLangCode].faculty} - ${collection[currentLangCode].fieldOfStudy}`}
              downloadCount={collection.downloadCount}
              coursesID={collection.courses}
            />
          ))}
        </div>
      </section> */}
    </main>
  )
}
