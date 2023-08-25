// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Link } from 'react-router-dom'
import {
  BsFacebook,
  BsTwitter,
  BsFillEnvelopeAtFill,
  BsFillTelephoneFill,
  BsHouseDoorFill
} from 'react-icons/bs'
import { useTranslation } from 'react-i18next'

import style from './style.module.css'

export default function Footer () {
  const { t } = useTranslation()

  return (
    <footer className='b-green white'>
      <div className={style.navContainer}>
        <ul>
          <li>
            <Link to={'/search'}>{t('navbar.Categories')} </Link>
          </li>
          <li>
            <Link to={'/aboutUs'}>{t('navbar.AboutUs')}</Link>
          </li>
          <li>
            <Link to={'contactUs'}>{t('navbar.ContactUs')}</Link>
          </li>
        </ul>
      </div>
      <hr />
      <div className={style.contactContainer}>
        <div className={style.subContainer}>
          <img src='./logo.svg' alt='' />
          <div className={style.info}>
            <p>
              <BsFillEnvelopeAtFill />
              &nbsp;xyz@example.com
            </p>
            <p>
              <BsFillTelephoneFill />
              &nbsp;<span dir='ltr'>+213 (0) 550 XXX XXX</span>
            </p>
            <p>
              <BsHouseDoorFill />
              &nbsp;{t('website.address')}
            </p>
            <div className={style.socialMedia}>
              {/* TODO: Add links to social media */}
              <Link to={'https://facebook.com/'} target='_blank'>
                <BsFacebook />
              </Link>
              <Link to={'https://twitter.com/'} target='_blank'>
                <BsTwitter />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <span className={style.copyrights}>
        &copy; 2020 - {new Date().getFullYear()} &middot;{' '}
        <span className={style.websiteName}>{t('website.name')}</span> &middot;{' '}
        {t('website.copyrights')}
      </span>
    </footer>
  )
}
