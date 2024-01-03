import React, {useContext} from 'react'
import NoteContext from '../Context/Notes/NoteContext'

export default function NoteItem(props) {
    const {note, updatenote} = props;
    const context = useContext(NoteContext)
    const{deleteNote} = context;
    

  return (
    <div className="col-md-3" >
      <div className="card m-3">
  <div className="card-body">
    <h5 className="card-title">{note.title}</h5>
    <p className="card-text">{note.description}</p>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updatenote(note)}}></i>
    <i className="fa-solid fa-trash" onClick={()=>{deleteNote(note._id)}}></i>
  </div>
</div>
    </div>
  )
}


