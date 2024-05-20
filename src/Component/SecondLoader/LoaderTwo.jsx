import React from 'react'
import "./LoaderTwo.css"
function LoaderTwo() {
  return (
    <div className='  fixed bg-slate-600 bg-opacity-45   w-full h-full top-0 bottom-0 
      left-0 right-0 flex justify-center items-center' >
      <div className=" loader-div w-96 flex items-center gap-4">
        <div className="bar1 h-28 w-14 rounded-md  "style={{
          backgroundColor:"#0077b6",
          border:"3px solid #EDF6F9"
        }} ></div>
        <div className="bar2 h-28 w-14 rounded-md"style={{
          backgroundColor:"#0077b6",
          border:"3px solid #EDF6F9"
        }} ></div>
        <div className="bar3 h-28 w-14 rounded-md"style={{
          backgroundColor:"#0077b6",
          border:"3px solid #EDF6F9"
        }} ></div>
        <div className="bar4 h-28 w-14 rounded-md"style={{
          backgroundColor:"#0077b6",
          border:"3px solid #EDF6F9"
        }} ></div>
        <div className="bar5 h-28 w-14 rounded-md"style={{
          backgroundColor:"#0077b6",
          border:"3px solid #EDF6F9"
        }} ></div>
        <div className="bar6 h-28 w-14 rounded-md"style={{
          backgroundColor:"#0077b6",
          border:"3px solid #EDF6F9"
        }} ></div>
      </div>
    </div>
  )
}

export default LoaderTwo
