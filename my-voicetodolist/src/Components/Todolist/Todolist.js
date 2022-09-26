import React from 'react'
import './todolist.css'
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios'

export default function Todolist(props) {
const todolist = props.todolist.map((task,index) => {
  const taskComplete= task =>{
      axios.put(`http://localhost:4000/api/tasks/${task._id}` , {
          _id : task._id,
          todo : task.todo,
          isComplete : !task.isComplete
      }).then(res => props.taskComplete(res.data)).catch(err => console.log
        (err))
  }
  const removeTask = id => {
    axios.delete(`http://localhost:4000/api/tasks/${id}`).then(res => props.removeTask(res.data)).catch(err => console.log(err))
  }
    return <li key={index}>
        <div style={{display : 'flex'}}>
          <CheckIcon className={task.isComplete ? 'iscomplete' : 'checkicon'}/>
          <p className={task.isComplete ? 'taskcomplete':''} onClick={()=>
          {
            taskComplete(task)            
          }}>{task.todo}</p>
        </div>
        <div>
          <EditIcon className='edit' onClick = {() => {
            props.tasktoUpdate(task)
            props.showPopup()
          }}/>
          <DeleteOutlineIcon className='delete' onClick = {() => {
              removeTask(task._id)
          }}/>
        </div>
        </li>
})

  return (
    <div className='tasklist'>
        <ul>
            {todolist}
        </ul>
    </div>
  )
}
