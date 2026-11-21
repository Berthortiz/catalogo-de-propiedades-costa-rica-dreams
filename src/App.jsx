import { useLocation } from 'react-router-dom'
import Header from './components/Header'
import './App.css'

function App() {
  const { pathname } = useLocation()
  const isIndependentCityPage = /^\/ciudades\/[^/]+\/?$/.test(pathname)

  return (
    <>
      {!isIndependentCityPage && <Header />}
    </>
  )
}

export default App
