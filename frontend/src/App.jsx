import './styles/App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className='app-container'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
