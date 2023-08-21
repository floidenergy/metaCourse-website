import { useState, useEffect } from 'react'
import { useNavigate, Link, useSearchParams } from 'react-router-dom'

import style from './style.module.css'
import { entries } from '../../assets/Coursedatabase.json'

import CourseCard from '../../elements/courceCard/Card'

export default function Search () {
  const navigation = useNavigate()
  const [params, setParams] = useSearchParams()
  const [pages, setPages] = useState()
  const [searchResult, setSearchResult] = useState([])

  
  const currentLangCode = localStorage.getItem('language') || 'en'
  
  useEffect(() => {
    setSearchResult(entries.courses)
  }, [])
  
  useEffect(() => {
    // TODO: GET PAGES FROM SEARCH PARAMS
    setPages(params.get('p') || 0)
  }, [params])

  console.log(JSON.stringify(params.values()));

  return (
    <main>
      <aside className={style.filterBar}>
        <div className={style.univ}>
          University:
          <select name='university' id=''>
            {/* TODO */}
          </select>
        </div>
        <div className={style.faculty}>
          Faculties:
          <select name='faculty' id=''></select>
        </div>
        <div className={style.year}>
          Year:
          <select name='yearOfStudy' id=''></select>
        </div>
      </aside>
      <article>
        <div className={style.header}>
          result for {pages}
          <span className={style.searchQuery}>{params.get('searchQuery')}</span>
          <hr />
        </div>
        <div className={style.coursesCardsContainer}>
          {searchResult
            ?.slice(pages * 9, pages * 9 + 9)
            .map((course, index) => (
              <CourseCard
                key={index}
                id={course.id}
                tags={course.tags}
                thumbnail={course.thumbnail}
                downloadCount={course.downloadCount}
                courseName={course[currentLangCode].title}
                type={`${course[currentLangCode]['faculty']} - ${course[currentLangCode]['fieldOfStudy']}`}
                downloadLink={course.link}
              />
            ))}
        </div>
        <div className={style.pagesButtons}>
          <button type='button'>{'<'}</button>
          {[...Array(Math.ceil(searchResult.length / 9))].map((_, index) => (
            <button
              key={index}
              type='button'
              onClick={() => {
                params.has('p') && params.delete('p')
                setParams({ ...params.keys(), p: 'a' })
              }}
            >
              {index + 1}
            </button>
          ))}
          <button type='button'>{'>'}</button>
        </div>
      </article>
    </main>
  )
}
