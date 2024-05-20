import React from 'react'
import Lottie from 'react-lottie';
import animation from '../assets/dashboard-anime.json'
import {useNavigate} from 'react-router-dom'
function Home() {
      
   //for front page animation Purpose
   const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animation,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

    const navigate = useNavigate()

  return (
      <div className='h-[90vh] flex justify-center items-center'>
      <Lottie options={defaultOptions}
        height={400}
        width={400} />
      <div className='w-full max-w-[80%] flex flex-col justify-center items-center gap-4'>
        <h1 className='text-[102px] lg:text-[92px] md:text-[72px] sm:text-[52px]'>Welcome To Taskify</h1>
        <h2 className='text-[52px] sm:text-[32px]'>Manage All Your Task</h2>
        <button className='text-3xl text-white bg-[#0077b6] py-4 px-8 rounded-full border-4  hover:border-4 
          hover:border-[#0077b6]  hover:text-black hover:bg-white'
          onClick={() => navigate('/log-in')}>
          Click to login....</button>
      </div>
    </div>
  )
}

export default Home
