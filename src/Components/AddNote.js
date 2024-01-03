import React, {useContext, useState} from 'react'
import NoteContext from '../Context/Notes/NoteContext'
export default function AddNote() {

    const context = useContext(NoteContext)
    const{addNote} = context;

    const [note, setNote] = useState({title : "", description : "", tag : "default"})

    const handleClick = (e)=>{
        e.preventDefault();
            addNote(note.title, note.description, note.tag);
            setNote({title: "", description: ""})
    }

    const onChange = (e)=>{
            setNote({...note, [e.target.name]: e.target.value})
    }

  return (
    <div>
      <h1>Add your Note</h1>
    <div className='container my-3'>
    <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onChange} />
  </div>

  <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>

    </div>
  )
}
