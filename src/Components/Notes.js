import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


const Notes = () => {
  const context = useContext(NoteContext);
  const { Notes, getNote, EditNote } = context;
  let Navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote();
    }else{
      Navigate('/login')
    }

    // eslint-disable-next-line
  }, []);

   const [note, setNote] = useState({id : "", etitle : "", edescription : "", tag : "default"})
  
      const handleClick = (e)=>{
        EditNote(note.id, note.etitle, note.edescription)
        closeref.current.click();

    }

    const onChange = (e)=>{
            setNote({...note, [e.target.name]: e.target.value})
    }
  const updatenote = (currentNote)=>{
      ref.current.click();
      setNote({id: currentNote._id, etitle: currentNote.title, edescription:currentNote.description});
  } 
  const ref = useRef(null);
  const closeref = useRef(null);
  return (
    <>

      <AddNote/>
       
     {/* MOdal starts from here */}
<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" id="edescription"value={note.edescription} name='edescription' onChange={onChange} />
  </div>

</form>
      </div>
      <div className="modal-footer">
        <button type="button" ref={closeref} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button"  className="btn btn-primary" onClick={handleClick} >Save changes</button>
      </div>
    </div>
  </div>
</div>

{/* Modal ends here */}
      
      <div className="row my-3">
        <h2>Your Notes</h2>
        {Notes.map((note) => {
          return (
            <NoteItem key={note._id} updatenote={updatenote} note={note} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
