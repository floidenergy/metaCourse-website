/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

import style from './style.module.css'

export default function NotFound () {
  const navigate = useNavigate();
  // navigate('/')

  return <main className={style.notFound}>404 NotFound</main>
}
