import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateBoardForm from './CreateBoardForm';
import { FaPencil } from "react-icons/fa6";
import backendRoutesAPI from '../BackendAPiEndPoints/Api';
import { MdRefresh } from "react-icons/md";
import LoaderTwo from "../Component/SecondLoader/LoaderTwo.jsx"
import { IoIosFastforward } from "react-icons/io";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { MdDelete } from "react-icons/md";
import moment from "moment"
import UpdateBoardName from './UpdateBoradName';

function Dashborad() {
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user)
  const [showCreateBoard, setShowCreateBoard] = useState(false)
  const [whichBoradIsUpdating, setWhichBoardIsUpdating] = useState()
  const [showUpdateForm, setShowUpdateForm] = useState(false)
  const [allBoards, setAllBoards] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  //Fetching Current User Boards
  const getAllHisBoard = async () => {
    const backendResponse = await fetch(backendRoutesAPI.board.access_curr_user_boards.url, {
      method: backendRoutesAPI.board.access_curr_user_boards.method,
      credentials: "include",
      headers:{
        'Authorizarion':`Bearer ${user.accessToken}`,
        'content-type':'application/json' 
      }
    })
    const finalResponse = await backendResponse.json()
    if (finalResponse.success) {
      setAllBoards(finalResponse.data.allBoards)
      setIsLoading(false)
    }
    else {
      alert(finalResponse.message)
    }
  }

  //Handle Delete Button Press
  const handleDeleteBoard = (board) => {
    let input = prompt(`Are You Sure Want To Delete the Board, While Doing So You will Lose all your Task Linked to this Board! - Type Y to Continue`)
    if (input?.toLowerCase() === 'y') {
      let input2 = prompt(`IF YES,  TYPE => ${board.boardName.toUpperCase()}`)
      if (input2 === board.boardName.toUpperCase()) {
        alert('Deleting is in Progress........................')
        deleteBoardFromDb(board)
      }
      else {
        alert(`Board Name You Entered is not same as you want to delete or You Not Type the Correct Prompt `)
      }
    }
    else {
      alert(`Invalid Response`)
    }

  }

  // Deleting Board From DataBase
  const deleteBoardFromDb = async (board) => {
    const backendResponse = await fetch(backendRoutesAPI.board.deleteBoard.url, {
      method: backendRoutesAPI.board.deleteBoard.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ board: board })
    })
    const finalResponse = await backendResponse.json()
    if (finalResponse.success) {
      alert(finalResponse.message)
      getAllHisBoard()
    }
    else {
      alert(finalResponse.message)
      getAllHisBoard()
    }
  }

  useEffect(() => {
    if (user) {
      getAllHisBoard()
    }
  }, [])

  useEffect(() => {
    if (user) {
      getAllHisBoard()
    }
  }, [user])

  return (
    <>
      {
        user ? (
          <div className='flex justify-center items-center my-10'>
            <div className="container w-full px-5 py-2 max-w-[80%] gap-4 flex flex-col  mx-auto bg-[#ffffff]">
              <div className='flex justify-between items-center'>
                <div className="heading text-[32px] mt-2">
                  <h1 className='capitalize'>{user.fullname} - Your Boards</h1>
                </div>

                <div className='flex justify-between items-center'>
                  <div className='text-[32px] cursor-pointer w-fit text-[#0077b6]'
                    onClick={() => {
                      getAllHisBoard()
                      setIsLoading(true)
                    }}>
                    {/* Refresh Button */}
                    <MdRefresh />
                  </div>
                  {/* Craete Board Button */}
                  <div className="block">
                    {
                      user && (
                        <>
                          <ul className="ml-12 inline-flex space-x-8">
                            <li>
                              <h1
                                className="-m-3 flex cursor-pointer border-[#0077b6] border-2 bg-white items-center rounded-lg hover:border-[black] p-3 text-sm font-semibold hover:bg-[#0077b6] hover:text-white"
                                onClick={() => setShowCreateBoard(true)}
                              >
                                Create Board
                              </h1>
                            </li>
                          </ul>
                        </>
                      )
                    }
                  </div>
                </div>
              </div>
              <div className='flex justify-evenly items-center flex-wrap gap-6 bg-[#5bc4f500] p-8'>
                {
                  isLoading ? <LoaderTwo /> : (
                    <>
                      {
                        allBoards.length > 0 ? (
                          allBoards.map((board, index) => {
                            return (
                              <div key={index} className='text-white rounded-xl relative p-3 shadow-xl border-2 border-[#0096c7] 
                                h-[fit] w-[fit] bg-[#caf0f8] flex flex-col group'>

                                <div id='top' className='flex justify-between items-center  '>
                                  <h1 className='text-black font-bold capitalize text-ellipsis line-clamp-2'>{board.boardName}</h1>
                                  <div className='flex justify-between'>
                                    <Tooltip title="Edit Board" arrow>
                                      <IconButton
                                        onClick={() => {
                                          setShowUpdateForm(true)
                                          setWhichBoardIsUpdating(board)
                                        }
                                        } >
                                        <FaPencil className='text-[green]  text-[1.15rem]' />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Task" arrow>
                                      <IconButton onClick={() => handleDeleteBoard(board)} >
                                        <MdDelete className='text-[red]  text-[1.15rem]' />
                                      </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Open Board" arrow>
                                      <IconButton onClick={() => navigate(`/user/${user._id}/board/${board._id}/${board.boardName}`)} >
                                        <IoIosFastforward className='text-xl text-black flex cursor-pointer' />
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                </div>

                                {/* Task Time Stamps */}
                                <div className=' text-[black]  w-full mt-5  flex justify-between  items-center mr-4'>
                                  <h1 className='text-xs flex gap-2 '><b>Created:</b> <p className='text-[#949494] capitalize'>{moment(board.createdAt).fromNow('LLL')} ago</p></h1>
                                  <h1 className='text-xs flex gap-2'><b>Updated:</b> <p className='text-[#949494] capitalize'>{moment(board.updatedAt).fromNow('LLL')} ago</p></h1>
                                </div>

                              </div>
                            )
                          })
                        ) : null
                      }
                    </>
                  )
                }
              </div>
            </div>
          </div>
        ) : null
      }
      {
        showCreateBoard ? <CreateBoardForm onClose={() => setShowCreateBoard(false)} refresh={() => getAllHisBoard()} /> : null
      }
      {
        showUpdateForm ? <UpdateBoardName board={whichBoradIsUpdating} onClose={() => setShowUpdateForm(false)} refresh={() => getAllHisBoard()} /> : null
      }
    </>
  )
}

export default Dashborad
