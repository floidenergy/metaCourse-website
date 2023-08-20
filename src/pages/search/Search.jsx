import { useState, useEffect } from 'react'
import { useNavigation, Link } from 'react-router-dom'

import style from './style.module.css'
import { entries } from '../../assets/Coursedatabase.json'

import CourseCard from '../../elements/courceCard/Card'

export default function Search () {
  const navigation = useNavigation()
  
  return (
    <main>
      <aside className={style.filterBar}></aside>
    </main>
  )
}
