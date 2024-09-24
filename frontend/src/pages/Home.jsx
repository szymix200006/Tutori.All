import React from 'react'
import '../styles/Home.css'
import Homepage_Background from '../assets/Homepage_Background.mp4'
import SearchInput from '../components/SearchInput'

const Home = () => {
  return (
    <div className='home-page-container'>
        <video autoPlay muted loop className='home-page-background-video'>
            <source src={Homepage_Background} type='video/mp4'/>
        </video>
        <div className="home-page-header-section">
          <h1 className="home-page-header">All tutorials in one place</h1>
          <span className="home-page-description">Discover tutorials created by our community</span>
          <SearchInput />
        </div>
    </div>
  )
}

export default Home
