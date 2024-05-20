import React, { useState } from 'react'
import { SiTask } from "react-icons/si";
import { Menu, X } from 'lucide-react'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { setUserDetail } from "../Store/userSlice.js"
import backendRoutesAPI from '../BackendAPiEndPoints/Api.js';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify"
import { blue } from '@mui/material/colors';

export default function Header() {
  const user = useSelector((state) => state?.user?.user)
  console.log( 'Haeder',user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // LOGOUT fUNCTION

  const handleLogout = async () => {
    const backendApiResponse = await fetch(backendRoutesAPI.signout.url, {
      method: backendRoutesAPI.signout.method,
      credentials: "include",
    })
    const finalResponse = await backendApiResponse.json()
    if (finalResponse.success) {
      toast.success(finalResponse.messsage)
      dispatch(setUserDetail(null))
      navigate("/");
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto flex max-w-[96rem] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className='text-4xl text-[#0e11bd] cursor-pointer'>
            <SiTask className='cursor-pointer' onClick={() => {
              user?navigate('/dashboard'):navigate('/')
            }} />
          </span>
          <span className=" text-xl font-bold">Taskify</span>
        </div>
        <div className="ml-6 mt-2 hidden lg:block">
          {
            user && (
              <>
                <span className="relative inline-block">
                  <Stack direction="row" spacing={2}>
                    <Avatar sx={{ bgcolor: blue[500] }}>Hi</Avatar>
                  </Stack>
                  <span className="absolute -bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white"></span>
                </span>
              </>
            )
          }
          {
            user && (
              <button className='text-lg text-white bg-[#0077b6] py-1 px-3 ml-6 rounded-xl border-4 hover:border-4 
              hover:border-[#0077b6]  hover:text-black hover:bg-white'
                onClick={() => handleLogout()}>
                logout</button>
            )
          }
        </div>
        <div className="ml-2 lg:hidden">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
        </div>
        {isMenuOpen && (
          <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span className='text-4xl text-[#0e11bd]'>
                      <SiTask />
                    </span>
                    <span className=" text-xl font-bold">Taskify</span>
                  </div>
                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="ml-3 mt-4 flex justify-between items-center space-x-2">
                  {
                    // if user is logged in thenn only show user details
                    user && (
                      <>

                        <div className='flex gap-2'>
                          <Stack direction="row" spacing={2}>
                            <Avatar sx={{ bgcolor: blue[500] }}>0</Avatar>
                          </Stack>
                          <span className="flex flex-col">
                            <span className="text-sm font-medium text-gray-900">{user?.fullname}</span>
                            <span className="text-sm font-medium text-gray-500">@{user?.userName}</span>
                          </span>
                        </div>
                        <button className='text-lg text-white bg-[#0077b6] py-1 px-3  rounded-xl border-4 hover:border-4  hover:border-[#0077b6]  hover:text-black hover:bg-white'
                          onClick={() => handleLogout()}>
                          logout</button>
                      </>
                    )
                  }

                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
