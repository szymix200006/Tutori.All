import React from 'react'
import '../styles/Home.css'
import Homepage_Background from '../assets/Homepage_Background.mp4'

const Home = () => {
  return (
    <div className='home-page-container'>
        <video autoPlay muted loop className='home-page-background-video'>
            <source src={Homepage_Background} type='video/mp4'/>
        </video>
    </div>
  )
}

export default Home
