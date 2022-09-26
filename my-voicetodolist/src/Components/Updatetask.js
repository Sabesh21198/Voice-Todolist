import React, {useState} from 'react'
import './updatetask.css'
import axios from 'axios'

export default function Updatetask(props) {
    const [task,setTask]= useState(props.task.todo)
    const updateTask = () => {
        if (task.trim() === '' || props.task.todo === task){
            return
        } else {
            axios.put(`http://localhost:4000/api/tasks/${props.task._id}`,{
                _id : props.task.id,
                todo : task,
                isComplete: props.task.isComplete
            }).then(res => {
                props.removePopup()
                props.updatetask(res.data)
            }).catch(err => console.log(err))
        }
    }
  return (
    <div className='popup'>
        <div className='popup-content'>
            <input type='text' placeholder='Update task...' value={task} onChange = {event => setTask(event.target.value)}></input>
            <button onClick={() => updateTask()}>Update</button>
        </div>
    </div>
  )
}

