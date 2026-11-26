import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import './App.css'

const PROPERTY_HEADER_STORAGE_KEY = 'cityPropertyHeaderHiddenPath'

function App() {
  const { pathname, state } = useLocation()
  const isIndependentCityPage = /^\/ciudades\/[^/]+\/?$/.test(pathname)
  const isPropertyPage = /^\/products\/[^/]+\/?$/.test(pathname)
  const persistedPropertyPath = localStorage.getItem(PROPERTY_HEADER_STORAGE_KEY)
  const isPropertyOpenedFromCity =
    isPropertyPage &&
    (state?.fromCityPage === true ||
      (state?.fromCityPage !== false && persistedPropertyPath === pathname))

  useEffect(() => {
    if (isPropertyPage && state?.fromCityPage === true) {
      localStorage.setItem(PROPERTY_HEADER_STORAGE_KEY, pathname)
      return
    }

    if (
      !isPropertyPage ||
      state?.fromCityPage === false ||
      (persistedPropertyPath && persistedPropertyPath !== pathname)
    ) {
      localStorage.removeItem(PROPERTY_HEADER_STORAGE_KEY)
    }
  }, [isPropertyPage, pathname, persistedPropertyPath, state])

  return (
    <>
      {!isIndependentCityPage && !isPropertyOpenedFromCity && <Header />}
    </>
  )
}

export default App
