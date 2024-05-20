import React, { useEffect, useState } from 'react'
import { FaChalkboard } from "react-icons/fa";
import { MdOutlineAddTask } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiLightbulbFlashLine } from "react-icons/ri";
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { IoMdDoneAll } from "react-icons/io";
import { GrInProgress } from "react-icons/gr";
import { IoMdAddCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate, useParams } from 'react-router-dom'
import backendRoutesAPI from '../BackendAPiEndPoints/Api';
import HourglassTopSharpIcon from '@mui/icons-material/HourglassTopSharp';
import { FaExclamationCircle } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import LoaderTwo from './SecondLoader/LoaderTwo';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import { CiCircleAlert } from "react-icons/ci";
import moment from 'moment';
import UpdateTaskForm from './UpdateTaskForm';

function Board() {
  // Here in params we get BoardID and Boardnme
  const params = useParams()

  // task Status Option with its Specific Icon
  const taskStatusOption = [
    {
      status: "In-Complete",
      label: <CiCircleAlert className='text-[red] font-bold text-xl mr-2' />
    },
    {
      status: "Completed",
      label: <DoneIcon className='text-[green] text-lg mr-2' />
    },
    {
      status: "In-Progress",
      label: <HourglassTopSharpIcon className='text-[#f37336] text-lg mr-2' />
    }
  ]

  // States variables
  const [isAddingNewTask, setIsAddingNewTask] = useState() //Checking task Add Button is Clicked
  const [taskFormData, settaskFormData] = useState({
    title: "",
    description: "",
    dueDate: ''
  })
  const [taskFormError, setTaskFormError] = useState({})  //For Form Error
  const [isAdding, setIsAdding] = useState(false) // to check final time without error task add button is clicked
  const [allTasks, setAllTask] = useState([]) // To render all task list in the front end
  const [totalTasks, setTotalTask] = useState([]) // make a copy of all task so when ALL Task SideBar Option is Clicked we can set the allTask state to all the task 
  const [allCompletdTask, setAllCompleted] = useState([]) // record of all completed task at the time of loading all the task
  const [allInProgressTask, setInProgresstask] = useState([]) // record of all in-progress task at the time of loading all the task
  const [allInCompleteTask, setInCompleteTask] = useState([]) // record of all in-progress task at the time of loading all the task

  const [currentUpdatingTask, setCurrentUpadtingTask] = useState() // when particular task upadte button is clicked this will store data of that paticular task in order to render the data in the update form

  const [taskIsUpadting, setTaskIsUpdating] = useState() // this is used to show the update form when user needs to update form

  const navigate = useNavigate()


  // Handle Add Task Form Field Changement
  const handleFormFieldChanges = (e) => {
    const { name, value } = e.target
    settaskFormData({ ...taskFormData, [name]: value })
  }

  //Validate Task Form Enteries
  const validateTaskForm = (data) => {
    const error = {}
    if (!data.title) { error.title = 'Task Title is required' }

    if (!data.description) { error.description = 'Task Description is required' }

    if (!data.dueDate) { error.dueDate = 'Task Due Date is required' }

    return error
  }

  // Handle Task Add Buttom Press
  const handleTaskAdd = () => {
    setTaskFormError(validateTaskForm(taskFormData))
    setIsAdding(true)
  }

  // Adding Task To DataBase
  const addTaskToDb = async () => {
    const finalData = { ...taskFormData, boardID: params.id }
    const backendResponse = await fetch(backendRoutesAPI.task.addTask.url, {
      method: backendRoutesAPI.task.addTask.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(finalData)
    })
    const finalResponse = await backendResponse.json()
    console.log(finalResponse)
    if (finalResponse.success) {
      settaskFormData({
        title: "",
        description: "",
        dueDate: ''
      })
      setIsAddingNewTask(false)
      getAllTasks()
      setIsAdding(false)
    }
    else {
      settaskFormData({
        title: "",
        description: "",
        dueDate: ''
      })
      setIsAddingNewTask(false)
      getAllTasks()
      setIsAdding(false)
    }
  }

  // get All tasks
  const getAllTasks = async () => {
    const backendResponse = await fetch(backendRoutesAPI.task.access_curr_board_tasks.url, {
      method: backendRoutesAPI.task.access_curr_board_tasks.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ boardID: params.id })
    })
    const finalResponse = await backendResponse.json()
    if (finalResponse.success) {
      setAllTask(finalResponse.data.allTasks)
      setTotalTask(finalResponse.data.allTasks)
      return
    }
    else {
      alert(finalResponse.message)
    }
  }

  // Categorise Task
  const categoriseTask = async () => {
    const completedTask = totalTasks.filter((task) => { if (task.status === 'Completed') { return task } })
    setAllCompleted(completedTask)
    const inProgressTask = totalTasks.filter((task) => { if (task.status === 'In-Progress') { return task } })
    setInProgresstask(inProgressTask)
    const inCompleteTask = totalTasks.filter((task) => { if (task.status === 'In-Complete') { return task } })
    setInCompleteTask(inCompleteTask)
  }

  // Hadnling Task Status Change
  const handleStatusChange = (taskStatus, currTask) => {
    console.log(taskStatus)
    console.log(currTask)
    let input
    if (currTask.status !== taskStatus) {
      input = prompt(`You want to change ${currTask.title} Task status from ${currTask.status} to ${taskStatus} - if Yes press Y`)
    }
    if (input?.toLowerCase() === 'y') {
      alert('Changing Status')
      updateTaskStatus(taskStatus, currTask._id)
    }
    else {
      alert('Invalid Response')
    }
  }

  // Upadation Task Status in DataBase
  const updateTaskStatus = async (taskStatus, id) => {
    const backendResponse = await fetch(backendRoutesAPI.task.taskStatusChange.url, {
      method: backendRoutesAPI.task.taskStatusChange.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ status: taskStatus, _id: id })
    })
    const finalResponse = await backendResponse.json()
    if (finalResponse.success) {
      alert(finalResponse.message)
      getAllTasks()
    }
    else {
      alert(finalResponse.message)
    }
  }

  // Handle Delete Task
  const handleDeleteTask = (task) => {
    let input = prompt(`You really want to delete ${task.title} Task - if Yes Enter Y`)
    if (input?.toLocaleLowerCase() === 'y') {
      alert('Task deletion in progress')
      deleteTaskFromDataBase(task)
    }
    else {
      alert('Inavlid Response')
    }
  }

  // Deleting task From DataBase
  const deleteTaskFromDataBase = async (task) => {
    const backendResponse = await fetch(backendRoutesAPI.task.deleteTask.url, {
      method: backendRoutesAPI.task.deleteTask.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ task: task })
    })
    const finalResponse = await backendResponse.json()
    if (finalResponse.success) {
      alert(finalResponse.message)
      getAllTasks()
    }
    else {
      alert(finalResponse.message)
    }
  }

  useEffect(() => {
    if (Object.keys(taskFormError).length === 0 && isAdding) {
      console.log(taskFormData)
      addTaskToDb()
    }
    else {
      setIsAdding(false)
    }
  }, [taskFormError])

  useEffect(() => {
    getAllTasks()
  }, [])
  useEffect(() => {
    categoriseTask()
  }, [allTasks])

  return (
    <div className='mt-5 flex gap-2 bg-opacity-30'>
      <aside className='flex relative flex-col w-full max-w-72 h-[50vh] 
        shadow-xl rounded-md p-2 bg-[white]'>

        {/* Go to Dashbord Button */}

        <a onClick={() => navigate('/dashboard')} className='text-4xl absolute bottom-2 left-4 text-right flex justify-end items-center gap-2  cursor-pointer'><FaHome /></a>

        {/* SideBar Heading Current Board Name */}

        <div id='head' className='w-full border-b-4 border-[black] mt-2 flex px-3 py-2 justify-between items-center max-w-[99%]'>
          <FaChalkboard className='text-3xl text-[#070ac7] mr-5' />
          <h1 className='capitalize text-2xl '>{params.name}</h1>
        </div>

        {/* Sidebar Actions or filteration */}

        <div className='w-full  mt-4'>
          <ul className='flex flex-col gap-2'>
            <li className='flex px-5 py-2 cursor-pointer text-lg  select-none justify-start gap-6 items-center hover:text-[white] hover:bg-[#48cae4]' onClick={() => setIsAddingNewTask(true)}><MdOutlineAddTask className='text-[#070ac7]' /> <span>Add Task</span></li>
            <li className='flex px-5 py-2 cursor-pointer text-lg  select-none justify-start gap-6 items-center hover:text-[white] hover:bg-[#48cae4]' onClick={() => setAllTask(totalTasks)}><GiNotebook className='text-[#070ac7]' /> <span>All Task</span></li>
            <li className='flex px-5 py-2 cursor-pointer text-lg  select-none justify-start gap-6 items-center hover:text-[white] hover:bg-[#48cae4]' onClick={() => setAllTask(allCompletdTask)} ><IoMdDoneAll className='text-[#070ac7]' /> <span>Completed Task</span></li>
            <li className='flex px-5 py-2 cursor-pointer text-lg  select-none justify-start gap-6 items-center hover:text-[white] hover:bg-[#48cae4]' onClick={() => setAllTask(allInProgressTask)}><GrInProgress className='text-[#070ac7]' /> <span>In-Progess Task</span></li>
            <li className='flex px-5 py-2 cursor-pointer text-lg  select-none justify-start gap-6 items-center hover:text-[white] hover:bg-[#48cae4]' onClick={() => setAllTask(allInCompleteTask)}><FaExclamationCircle className='text-[#070ac7]' /> <span>In-Complete Task</span></li>
          </ul>
        </div>
      </aside>
      <main className='rounded-sm bg-white  shadow-lg w-full ml-1 p-4 '>
        <div className='top w-full text-3xl font-bold text-center border-b-4 border-[#070ac7]'>
          <h1 className='p-3'>List Of Tasks</h1>
        </div>
        {/* Task Pane */}
        <div className='h-fit p-4 mt-5 w-full border-4 rounded-lg shadow-xl border-[black]'
          style={{ backgroundImage: 'repeating-radial-gradient(circle, #00b4d8, #0077b6 10%,white 15%)' }}>
          <div className='bg-white h-full w-full bg-opacity-15 flex flex-wrap items-center justify-around p-8 gap-12'>
            {
              allTasks.length > 0 ? (
                <>
                  {
                    allTasks.map((task, index) => {
                      return (
                        <div key={index} className='text-white rounded-2xl relative p-3 shadow-xl
                                h-[fit] w-[fit] bg-[#fff]  flex flex-col'>
                          {/* Task Card Top Portion */}
                          <div id='top' className='flex justify-between items-center p-1 w-full border-b-2 border-black  '>
                            <h1 className='text-black text-xl font-bold capitalize'>Task Title : {task.title}</h1>
                            <div className="actins flex text-md w-fit cursor-pointer gap-2">
                              <Tooltip title="Delete Task" arrow>
                                <IconButton onClick={() => { handleDeleteTask(task) }}>
                                  <MdDelete className='text-[red]  text-[1.15rem]' />
                                </IconButton>
                              </Tooltip>
                              {
                                task.status === 'Completed' ? null : (
                                  <>
                                    <Tooltip title="Update Task" arrow>
                                      <IconButton onClick={() => {
                                        setCurrentUpadtingTask(task)
                                        setTaskIsUpdating(true)
                                      }}>
                                        <RiLightbulbFlashLine className='text-[green] text-[1.15rem]' />
                                      </IconButton>
                                    </Tooltip>
                                  </>
                                )
                              }
                            </div>
                          </div>

                          {/* Card Main Div */}
                          <div id='main-content' className='text-black'>
                            <div className='p-2'>
                              <h3 className='font-medium text-md underline underline-offset-4 mb-2'>Task Description: </h3>
                              <p className='border text-sm p-2 bg-slate-400 bg-opacity-25 font-semibold rounded-md text-justify'>{task.description}</p>
                            </div>
                          </div>

                          {/* Status & Action on Status */}
                          <div id='status' className='text-black mb-6'>
                            <div className='p-2'>
                              <h3 className='font-medium text-md mb-4 flex justify-between items-center'>Task Status: <p>{task.status}</p> </h3>
                              <div id='task-action'>
                                {
                                  task.status === 'Completed' ? null : (
                                    <Stack direction="row" spacing={1}>
                                      {
                                        taskStatusOption.map((taskStatus, index) => {
                                          return (
                                            task.status === taskStatus.status ? null : (
                                              <div className='cursor-pointer flex  justify-between items-center rounded-full bg-slate-400 bg-opacity-25
                                            px-2 py-1 gap-2 group' key={index}
                                                style={taskStatus.status === 'Completed' ? { backgroundColor: '#bfffe0' } : (taskStatus.status === 'In-Progress' ?
                                                  { backgroundColor: '#fcf2e7' } : { backgroundColor: '#fecdd3' })}
                                              >
                                                <span>{taskStatus.label}</span>
                                                <span onClick={() => handleStatusChange(taskStatus.status, task)}
                                                  style={taskStatus.status === 'Completed' ? { color: 'green' } : (taskStatus.status === 'In-Progress' ?
                                                    { color: '#f37336' } : { color: 'red' })}><b>{taskStatus.status}</b></span>
                                              </div>
                                            )
                                          )
                                        })
                                      }
                                    </Stack>
                                  )
                                }
                              </div>
                            </div>
                          </div>

                          {/* Task Time Stamps */}
                          <div className=' text-[black]  w-full left-0  flex justify-between  items-center mr-4'>
                            <h1 className='text-xs flex gap-2 '><b>Created:</b> <p className='text-[#949494] capitalize'>{moment(task.createdAt).fromNow('LLL')} ago</p></h1>
                            <h1 className='text-xs flex gap-2'><b>Updated:</b> <p className='text-[#949494] capitalize'>{moment(task.updatedAt).fromNow('LLL')} ago</p></h1>
                          </div>
                        </div>
                      )
                    })
                  }
                </>
              ) : <h1 className='text-black  bg-white text-5xl p-4'>No Task Added</h1>
            }
          </div>
        </div>
      </main>

      {/* Create Task Form */}
      {
        isAdding ? <LoaderTwo /> : (
          <>
            {
              isAddingNewTask && (
                <>
                  <div className='absolute bg-slate-800 bg-opacity-50 top-0 bottom-0 right-0 left-0 flex justify-center items-center'>
                    <div className='bg-[#caf0f8] shadow-2xl px-10 py-3 rounded-2xl w-[30rem]'>
                      <form className='flex flex-col ' >
                        <div className="grid  mt-2 mb-2 p-4">
                          {/* Task Title */}

                          <label className="text-xl text-center mb-4 font-semibold" htmlFor='title'>Task Title:&nbsp;&nbsp;  </label>
                          <div className='bg-slate-100 p-2'>
                            <input type='text' id='title' placeholder='Enter Task Title' value={taskFormData.title} onChange={handleFormFieldChanges}
                              className='w-full h-full outline-none mb-4  bg-transparent' name='title' />
                          </div>
                          <p className='text-red-600 px-2'>{taskFormError.title}</p>

                          {/* Task Description */}

                          <label className="text-xl text-center mb-4 font-semibold" htmlFor='description'>Task Detail:&nbsp;&nbsp;  </label>
                          <div className='bg-slate-100 p-2'>
                            <input type='text' id='description' placeholder='Enter Task Detail' value={taskFormData.description} onChange={handleFormFieldChanges}
                              className='w-full h-full outline-none mb-4  bg-transparent' name='description' />
                          </div>
                          <p className='text-red-600 px-2'>{taskFormError.description}</p>

                          {/* Due Date */}

                          <label className="text-xl text-center mb-4  font-semibold" htmlFor='dueDate'>Due Date:&nbsp;&nbsp;  </label>
                          <div className='bg-slate-100 p-2'>
                            <input type='date' id='dueDate' placeholder='Enter Task Detail' value={taskFormData.dueDate} onChange={handleFormFieldChanges}
                              className='w-full h-full outline-none mb-4  bg-transparent' name='dueDate' />
                          </div>
                          <p className='text-red-600 px-2'>{taskFormError.dueDate}</p>

                          {/* Form Action Button */}

                          <div className="btns flex justify-between items-center px-6 mt-4">
                            <IoCloseCircle className='text-5xl text-[red]  cursor-pointer'
                              onClick={() => {
                                setIsAddingNewTask(false)
                                setTaskFormError({})
                                settaskFormData({
                                  title: "",
                                  description: "",
                                  dueDate: ''
                                })
                              }
                              } />
                            <IoMdAddCircle className='text-5xl text-[green] cursor-pointer' onClick={handleTaskAdd} />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>

                </>
              )
            }
          </>
        )
      }

      {/* Task update Form */}
      {
        taskIsUpadting ? <UpdateTaskForm task={currentUpdatingTask} onClose={() => setTaskIsUpdating(false)} refreshBoard={() => getAllTasks()} /> : null
      }

    </div>
  )
}

export default Board
