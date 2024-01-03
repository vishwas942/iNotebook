const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../Models/Notes');
const { body, validationResult } = require("express-validator");

// ROUTE 1
// Get all the notes of a logged in user using GET (/api/notes/FetchAllNotes). Login required

router.get('/FetchAllNotes', fetchuser, async (req,res)=>{
    try {
    const notes = await Notes.find({user: req.user.id})
    res.json(notes);   
} catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
}
})


//ROUTE 2 
// To add note in a logged in user account using POST (/api/notes/addnotes).  Login required

router.post('/addnote', fetchuser, body('title', "Can't be left blank").isLength({ min:1 }),
                body('description'), 
                async (req,res)=> {

                    try {
                    const {title, description, tag} = req.body
                    const errors = validationResult(req);
                    if (!errors.isEmpty()) {
                      return res.status(400).json({errors: errors.array() });
                      }
                      const note = new Notes({
                        title, description, tag, user: req.user.id
                      })
                      const SaveNote = await note.save()
                      res.json(SaveNote)
                    } catch (error) {
                        console.log(error.message);
                        res.status(500).send("Some error occured");
                    }
                })

  // ROUTE 3
  // Update an existing note  using PUT (/api/notes/updatenote).  Login required
  router.put('/updatenote/:id', fetchuser, async (req,res)=> {
        const {title, description, tag} = req.body;
        // create  a newNote object
        try {
        const newNote = {}
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}
  
// Find the note to be updated and update it
        let note = await Notes.findById(req.params.id)
        if(!note){return res.status(404).send({error : "Not found"})}
        if(note.user.toString() !== req.user.id ){
          return res.status(401).send({Warning : "Not allowed"})
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});
       } catch (error) {
          console.log(error.message);
          res.status(500).send("Some error occured");
      }
        
  })


  // ROUTE 4
  // Delete a note using DELETE (api/notes/deletenote).   Login required
  router.delete('/deletenote/:id', fetchuser, async (req,res)=> {
       
    try {
// Find the note to be deleted and delete it
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(404).send({error : "Not found"})}

    // Allow deletion only if user owns this note
    if(note.user.toString() !== req.user.id ){
      return res.status(401).send({Warning : "Not allowed"})
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted"});
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
}
})

module.exports = router;