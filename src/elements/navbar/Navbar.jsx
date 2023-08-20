/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import i18next from 'i18next'

import { BsSearch } from 'react-icons/bs'
import { AiOutlineGlobal } from 'react-icons/ai'
import '../../../node_modules/flag-icon-css/css/flag-icons.min.css'

import style from './style.module.css'
import { useTranslation } from 'react-i18next'

export default function Navbar () {
  const langs = [
    {
      code: 'fr',
      name: 'Français',
      flag_code: 'fr'
    },
    {
      code: 'en',
      name: 'English',
      flag_code: 'gb'
    },
    {
      code: 'ar',
      name: 'العربية',
      flag_code: 'dz',
      dir: 'rtl'
    }
  ]

  const currentLanguageCode = localStorage.getItem('language') || 'en'
  const currentLanguage = langs.find(l => l.code === currentLanguageCode)
  const { t } = useTranslation()

  useEffect(() => {
    document.body.dir = currentLanguage.dir || 'ltr'
  }, [currentLanguage])

  return (
    <nav className={style.navBar}>
      <div className={style.navLogo}>
        <Link to={'/'}>
          <img
            src='https://www.freeiconspng.com/thumbs/logo-design/blank-logo-design-for-brand-13.png'
            alt=''
          />
        </Link>
      </div>

      <div className={style.navSearchBar}>
        <form action='/Search' method='GET'>
          <div>
            <BsSearch />
            <input
              type='text'
              name='searchQuery'
              placeholder={t('navbar.searchLabel')}
              id=''
            />
          </div>
        </form>
      </div>

      <div className={style.navList}>
        <ul>
          <li>
            <Link>{t('navbar.Categories')} </Link>
          </li>
          <li>
            <Link to={'/aboutUs'}>{t('navbar.AboutUs')}</Link>
          </li>
          <li>
            <Link to={'contactUs'}>{t('navbar.ContactUs')}</Link>
          </li>
          <li>
            <div lang={currentLanguageCode} className={style.langDropdown}>
              <AiOutlineGlobal />
              <ul className={style.dropdownMenue}>
                {langs.map(({ code, name, flag_code }, index) => (
                  <li key={index}>
                    <button
                      type='button'
                      className='b-transparent'
                      disabled={currentLanguageCode == code}
                      onClick={() => {
                        i18next.changeLanguage(code)
                      }}
                    >
                      <span
                        className={`flag-icon flag-icon-${flag_code}`}
                      ></span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}
