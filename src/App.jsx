/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import NavBar from './elements/navbar/Navbar'
import Footer from './elements/footer/Footer'

import Home from './pages/home/Home'
import Search from './pages/search/Search'
import Course from './pages/Course/Course'
import NotFound from './pages/NotFound/NotFound'

export default function App () {
  const { t } = useTranslation()

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Search' element={<Search />} />
        <Route path='/Course' element={<Course />} />
        
        <Route path='/*' element={<NotFound/>} />
      </Routes>
      <Footer />
    </>
  )
}
