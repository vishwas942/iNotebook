import NoteContext from './NoteContext'
import { useState } from 'react'

const NoteState = (props) =>{
   const host = "http://localhost:5000"
    const InitialNotes = []
      const[Notes, setNotes] = useState(InitialNotes)


      // To do API calls

      
//    To get all notes 

      const getNote = async ()=>{


        const response = await fetch(`${host}/api/notes/FetchAllNotes`, {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" : localStorage.getItem('token'),
          }, 

        });
        const json = await response.json()
        console.log(json)
        setNotes(json);
      }


 

      // To add note
      const addNote = async (title, description, tag)=>{
        
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" :localStorage.getItem('token'),
          },
          body: JSON.stringify({title, description, tag}), 
        });
        const note = await response.json();
        setNotes(Notes.concat(note))
      }
      
      let newNotes =  JSON.parse(JSON.stringify(Notes))



      // To edit note
     const EditNote = async (id, title, description, tag)=>{

      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
          "auth-token" :localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}), 
      });
      const json = response.json();
      console.log(json)
        for (let index = 0; index < newNotes.length; index++) {
          const element = newNotes[index];
          if(element._id === id){
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }
        }  
        setNotes(newNotes)
      }





      // to delete note
      const deleteNote = async (id)=>{

        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE", 
          headers: {
            "Content-Type": "application/json",
            "auth-token" :localStorage.getItem('token'),
          },
        });
        const json = await response.json()
        console.log(json)

        console.log("Delete note with id " + id)
        const NewNote = Notes.filter((note)=>{
           return note._id!==id;
        })
        setNotes(NewNote);
      }


    return(
        <NoteContext.Provider value = {{Notes, addNote, EditNote, deleteNote, getNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;