import { useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

import style from './style.module.css'
import { entries } from '../../assets/Coursedatabase.json'

import CourseCard from '../../elements/courceCard/Card'

export default function Search () {
  const navigate = useNavigate()
  const [pages, setPages] = useState()
  const [searchResult, setSearchResult] = useState([])

  const [wilayasFilter, setWilayasFilter] = useState([])
  const [facultiesFilter, setFacultiesFilter] = useState([])
  const [fieldsFilter, setFieldsFilter] = useState([])
  const [yearsFilter, setYearsFilter] = useState([])

  const location = useLocation()

  const params = useMemo(() => new URLSearchParams(location.search), [location])

  const currentLangCode = localStorage.getItem('language') || 'en'

  const queryRegex = new RegExp(params.get('searchQuery') || '', 'i')

  useEffect(() => {
    if (params.get('wilaya')) setWilayasFilter(params.get('wilaya'))
    if (params.get('faculty')) setFacultiesFilter(params.get('faculty'))
    if (params.get('field')) setFieldsFilter(params.get('field'))

    setPages(Number(params.get('p')) || 0)
  }, [params])

  // filter courses
  useEffect(() => {
    let result = entries.courses.filter(
      course =>
        queryRegex.test(course.en.title) ||
        queryRegex.test(course.fr.title) ||
        queryRegex.test(course.ar.title)
    )

    if (wilayasFilter.length > 0) {
      result = result.filter(item =>
        wilayasFilter.includes(item[currentLangCode].wilaya)
      )
    }

    if (facultiesFilter.length > 0) {
      result = result.filter(item =>
        facultiesFilter.includes(item[currentLangCode].faculty)
      )
    }

    if (fieldsFilter.length > 0) {
      result = result.filter(item =>
        fieldsFilter.includes(item[currentLangCode].fieldOfStudy)
      )
    }

    if (yearsFilter.length > 0) {
      result = result.filter(item =>
        yearsFilter.includes(item[currentLangCode].year)
      )
    }

    setSearchResult(result)
    setPages(0)
  }, [wilayasFilter, facultiesFilter, fieldsFilter, yearsFilter])

  return (
    <main className={style.searchPage + ' b-whiteBlue'}>
      <aside className={style.filterBar + ' b-white'}>
        <div className={style.univ}>
          <header>Wilaya</header>
          <div className={style.checkboxes}>
            {entries.courses
              .map(element => element[currentLangCode].wilaya)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((wilaya, index) => (
                <label key={index}>
                  <input
                    type='checkbox'
                    name='wilaya'
                    checked={wilayasFilter.includes(wilaya)}
                    value={wilaya}
                    onChange={() => {
                      if (wilayasFilter.includes(wilaya))
                        setWilayasFilter(
                          wilayasFilter.filter(w => w !== wilaya)
                        )
                      else setWilayasFilter([...wilayasFilter, wilaya])
                    }}
                  />
                  <p>{wilaya}</p>
                </label>
              ))}
          </div>
        </div>
        <div className={style.faculty}>
          <header>Faculties:</header>
          <div className={style.checkboxes}>
            {entries.courses
              .map(element => element[currentLangCode].faculty)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((faculty, index) => (
                <label key={index}>
                  <input
                    type='checkbox'
                    name='faculty'
                    checked={facultiesFilter.includes(faculty)}
                    value={faculty}
                    onChange={() => {
                      if (facultiesFilter.includes(faculty))
                        setFacultiesFilter(
                          facultiesFilter.filter(w => w !== faculty)
                        )
                      else setFacultiesFilter([...facultiesFilter, faculty])
                    }}
                  />
                  <p>{faculty}</p>
                </label>
              ))}
          </div>
        </div>
        <div className={style.field}>
          <header>Field:</header>
          <div className={style.checkboxes}>
            {entries.courses
              .map(element => element[currentLangCode].fieldOfStudy)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((field, index) => (
                <label key={index}>
                  <input
                    type='checkbox'
                    name='field'
                    checked={fieldsFilter.includes(field)}
                    value={field}
                    onChange={() => {
                      if (fieldsFilter.includes(field))
                        setFieldsFilter(fieldsFilter.filter(w => w !== field))
                      else setFieldsFilter([...facultiesFilter, field])
                    }}
                  />
                  <p>{field}</p>
                </label>
              ))}
          </div>
        </div>
        <div className={style.year}>
          <header>Year:</header>
          <div className={style.checkboxes}>
            {entries.courses
              .map(element => element.year)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((year, index) => (
                <label key={index}>
                  <input
                    type='checkbox'
                    name='year'
                    checked={yearsFilter.includes(year)}
                    value={year}
                    onChange={() => {
                      if (yearsFilter.includes(year))
                        setYearsFilter(yearsFilter.filter(w => w !== year))
                      else setYearsFilter([...facultiesFilter, year])
                    }}
                  />
                  <p>{year}</p>
                </label>
              ))}
          </div>
        </div>
      </aside>
      <div className={style.coursesPages + ' b-white'}>
        <header className={style.header}>
          result for&nbsp;
          <span className={style.searchQuery + ' green'}>
            {params.get('searchQuery')}
          </span>
        </header>
        {searchResult.length > 0 ? (
          <>
            <div className={style.coursesCardsContainer}>
              {searchResult
                ?.slice(pages * 9, pages * 9 + 9)
                .map((course, index) => (
                  <CourseCard
                    key={index}
                    id={course.id}
                    tags={course[currentLangCode].tags}
                    thumbnail={course.thumbnail}
                    downloadCount={course.downloadCount}
                    courseName={course[currentLangCode].title}
                    type={`${course[currentLangCode]['faculty']} - ${course[currentLangCode]['fieldOfStudy']}`}
                    downloadLink={course.link}
                    classname={style.card}
                  />
                ))}
            </div>
            <div className={style.pagesButtons}>
              <button
                type='button'
                className='b-transparent'
                disabled={pages <= 0}
                onClick={() => {
                  params.set('p', pages - 1)
                  navigate({ search: `?${params.toString()}` })
                }}
              >
                <BsChevronLeft />
              </button>
              {[...Array(Math.ceil(searchResult.length / 9))].map(
                (_, index) => (
                  <button
                    key={index}
                    type='button'
                    className={
                      pages == index
                        ? 'green b-transparent underlined bold'
                        : 'b-transparent'
                    }
                    onClick={() => {
                      params.set('p', index)
                      navigate({ search: `?${params.toString()}` })
                    }}
                  >
                    {index + 1}
                  </button>
                )
              )}
              <button
                type='button'
                className='b-transparent'
                disabled={pages >= Math.ceil(searchResult.length / 9) - 1}
                onClick={() => {
                  params.set('p', pages + 1)
                  navigate({ search: `?${params.toString()}` })
                }}
              >
                <BsChevronRight />
              </button>
            </div>
          </>
        ) : (
          <div className={style.nothFound}>
            <p>Couldn&apos;t find anything for {params.get('searchQuery')}</p>
          </div>
        )}
      </div>
    </main>
  )
}
