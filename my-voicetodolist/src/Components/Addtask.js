import './addtask.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import React, {useEffect}from 'react'
import axios from 'axios'
import MicOffIcon from '@mui/icons-material/MicOff';


export default function Addtask(props) {

  const { transcript, resetTranscript } = useSpeechRecognition();
    
    useEffect(() => {
        SpeechRecognition.startListening({continuous:true})
        console.log('listening starts')
    },[])
  const addtranscript = () => {
    if(transcript.trim() === ''){
      return
    } else {
        axios.post('http://localhost:4000/api/tasks', {
          todo : transcript,
          isComplete : false
        }).then (res => {
          resetTranscript("")
          props.addTask(res.data)
        }).catch(err => console.log(err))
    }
  }
  return (
    <div className='addtask'>
      <input type='text' placeholder='Add Task. . .' value={transcript} onChange = {event => resetTranscript(event.target.value)}></input>
      <button className='buttonadd' onClick={() => addtranscript()}>Add</button>
      <button className='buttonmic'>
        <MicOffIcon onClick={(e) => {
            e.preventDefault();
            SpeechRecognition.stopListening()
            console.log('Listening Stops...')
            }}>
        </MicOffIcon>
      </button>
    </div>
  )
}
 