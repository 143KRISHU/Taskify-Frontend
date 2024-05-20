import React, { useState } from 'react'
import { IoMdAddCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import backendRoutesAPI from '../BackendAPiEndPoints/Api';

function UpdateTaskForm({ task, onClose, refreshBoard }) {
      const [taskFormData, settaskFormData] = useState({
            title: task.title,
            description: task.description,
      })

      // Handle Add Task Form Field Changement
      const handleFormFieldChanges = (e) => {
            const { name, value } = e.target
            settaskFormData({ ...taskFormData, [name]: value })
      }

      // Handle Task Add Buttom Press
      const handleTaskAdd = () => {
            if (!taskFormData.title) { alert(`task title is requured`) }
            else if (!taskFormData.description) { alert(`task description is required`) }
            else {
                  addTaskToDb()
            }

      }

      const addTaskToDb = async () => {
            alert(`updating task .....`)
            const finaldata = { ...taskFormData, id: task._id }
            const backendResponse = await fetch(backendRoutesAPI.task.updateTask.url, {
                  method: backendRoutesAPI.task.updateTask.method,
                  headers: {
                        "content-type": "application/json"
                  },
                  body: JSON.stringify(finaldata)
            })
            const finalResponse = await backendResponse.json()
            console.log(finalResponse)
            if (finalResponse.success) {
                  onClose()
                  alert(finalResponse.message)
                  refreshBoard()
            }
            else {
                  alert(finalResponse.message)
                  refreshBoard()
                  onClose()
            }}

            return (
                  <>
                        (
                        <>
                              (
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

                                                            {/* Task Description */}

                                                            <label className="text-xl text-center mb-4 font-semibold" htmlFor='description'>Task Detail:&nbsp;&nbsp;  </label>
                                                            <div className='bg-slate-100 p-2'>
                                                                  <input type='text' id='description' placeholder='Enter Task Detail' value={taskFormData.description} onChange={handleFormFieldChanges}
                                                                        className='w-full h-full outline-none mb-4  bg-transparent' name='description' />
                                                            </div>

                                                            {/* Form Action Button */}

                                                            <div className="btns flex justify-between items-center px-6 mt-4">
                                                                  <IoCloseCircle className='text-5xl text-[red]  cursor-pointer'
                                                                        onClick={() => {
                                                                              onClose()
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

                        </>
                        )

                  </>
            )
      }

      export default UpdateTaskForm
