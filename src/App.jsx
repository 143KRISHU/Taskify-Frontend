import { Outlet } from "react-router-dom"
import Header from "./Component/Header";
import './App.css'
import { useDispatch } from "react-redux";
import {setUserDetail} from "./Store/userSlice.js"
import backendRoutesAPI from "./BackendAPiEndPoints/Api";
import { useEffect } from "react";
import { useSelector } from 'react-redux';
function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state?.user?.user)

  const getUserDetail = async () => {
    const backendAPIResponse = await fetch(backendRoutesAPI.current_user.url, {
      method: backendRoutesAPI.current_user.method,
      credentials: "include",
      headers:{
        "Authorization":`Bearer ${user.data.accessToken}`,
        'content-type':'application/json' 
      }
    })
    const finalResponse = await backendAPIResponse.json()
    if (finalResponse.success) {
      dispatch(setUserDetail(finalResponse.data))
    }
    else {
      return
    }
  }

  useEffect(() => {
    if(user){
      getUserDetail()
    }
  }, [user])

  return (
    <>
      <header>
        <Header />
      </header>
      <main >
        <section className="container mx-auto">
        <Outlet />
        </section>
      </main>
    </>
  )
}

export default App
