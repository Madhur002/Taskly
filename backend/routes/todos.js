import express from "express";
import fetchuser from "../middleware/fetchuser.js";
import Todos from "../models/Todos.js";
import { body, validationResult } from 'express-validator';
const router = express.Router();


// Route 1  To fetch all the notes that our user has created with /api/notes/fetchallnotes login required
router.get('/fetchtodos',fetchuser, async (req, res) => {
try {
    const notes = await Todos.find({user: req.user.id})
    res.json(notes)
  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error"); 
  }
})



// Route 2  To add the notes that our user has created with /api/notes/addnote login required

router.post('/addtodos',fetchuser, [
  body('title', 'Enter a valid title').isLength({ min:3 }),
  body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
try {
  const { title, description, tag } = req.body;
   // If there are errors, return Bad request and errors
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array()});
   }
  const notes = new Todos({
    title, description, tag, user: req.user.id
  })
  const savednotes = await notes.save()

  res.json(savednotes)
}
catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error"); 
}
})


// Route 3  To Update the existing note with /api/notes/updatenote login required
router.put('/updatetodo/:id',fetchuser, async (req, res) => {
try {
  const { title, description, tag } = req.body;
   // create a new note object.......
   const newNote = {};
   if(title){newNote.title = title};
   if(description){newNote.description = description};
   if(tag){newNote.tag = tag};

   // Find the note to be updated and update it.........
   let note = await Todos.findById(req.params.id);
   if(!note){return res.status(404).send("Not Found")}

   if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
   }

   note = await Todos.findByIdAndUpdate(req.params.id, {$set:newNote}, {new:true});
  res.json(note)
}
catch (error) {
  console.error(error.message);
  res.status(500).send("Internal server error"); 
}
})


// Route 4  To delete the existing note with /api/notes/deletenote login required
router.delete('/deletetodo/:id',fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
  
     // Find the note to be deleted and delete it.........
     let note = await Todos.findById(req.params.id);
     if(!note){return res.status(404).send("Not Found")}
  
     // To check if the user who is trying to delete the file owns the note or not ........
     if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
     }
  
     note = await Todos.findByIdAndDelete(req.params.id);
    res.json({ "Successfully" : "deleted Todo", note : note})
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error"); 
  }
  })
  

export default router;
