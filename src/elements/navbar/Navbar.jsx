import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import i18next from 'i18next'

import { BsSearch } from 'react-icons/bs'
import { RiMenuLine } from 'react-icons/ri'
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
  const [showNavBar, setShowNavBar] = useState(false)
  const MobNav = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (MobNav && MobNav.current && !MobNav.current.contains(event.target)) {
        setShowNavBar(false)
      }
      console.log('click outside')
    }
    document.addEventListener('mousedown', handleClickOutside)

    document.body.dir = currentLanguage.dir || 'ltr'
  }, [currentLanguage])

  return (
    <>
      <div
        className={style.navTriggerButton}
        onClick={() => setShowNavBar(!showNavBar)}
        onBlur={() => console.log('blured')}
      >
        <RiMenuLine />
      </div>
      <nav
        ref={MobNav}
        className={
          showNavBar ? style.activeNavBar + ' ' + style.navBar : style.navBar
        }
      >
        <div className={style.navLogo}>
          <Link to={'/'}>
            <img src='/logo.svg' alt='' />
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
            {/* <li>
              <Link to={'/search'}>{t('navbar.Categories')} </Link>
            </li>
            <li>
              <Link to={'/aboutUs'}>{t('navbar.AboutUs')}</Link>
            </li>
            <li>
              <Link to={'/contactUs'}>{t('navbar.ContactUs')}</Link>
            </li> */}
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
    </>
  )
}
