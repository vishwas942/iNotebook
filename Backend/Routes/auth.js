const express = require("express");
const router = express.Router();
const User = require('../Models/User')
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Haetvdryidsfu$oifjosed";
// const fetchuser2 = require('../middleware/fetchuser2')


// ROUTE 1


// Creating a user using POST , /api/auth/createuser  (No login required)  Create a new user page
router.post("/createuser",
       body('Name', 'Enter a valid name').isLength({ min:3 }),
        body('Email', 'Enter a valid Email').isEmail(),
        body('password').isLength({ min:5 }),
           async (req, res) => {
            try{ 
                let success = false;
              // If there are errors return bad request and the errors
                const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                    return res.status(400).json({success, errors: errors.array() });
                    }

              // check wheteher Email already exist
               
                    let user = await User.findOne({Email: req.body.Email})
                    console.log(user);
                    if (user){
                        return res.status(400).json({success, error:"Sorry a User with the given email already exists"})
                    }
              // Create a new User
                    const salt = await bcrypt.genSaltSync(10);
                    const secPass = await bcrypt.hash(req.body.password, salt);
                    user = await User.create({
                        Name:req.body.Name,
                        Email:req.body.Email,
                        password:secPass,
                    })
                      const data = {
                        user:{
                          id: user.id,
                        }
                      }
                      success = true;
                      const authtoken = jwt.sign(data, JWT_SECRET);
                   res.json({success, authtoken})    
                    }  catch(error){
                      console.log(error.message);
                      res.status(500).send("Some error occured");
                 }               
           }
);



//ROUTE 2
// Authenticate a User using POST api/auth/login... No login required (login page)

router.post("/login",
        body('Email', 'Enter a valid Email').isEmail(),
        body('password', 'Password cannot be blank').exists(),
           async (req, res) => {
              let success = false;
             // If there are errors return bad request and the errors
             const errors = validationResult(req);
             if (!errors.isEmpty()) {
               return res.status(400).json({errors: errors.array() });
               }

               const {Email, password} = req.body;
               try {
                  let user = await User.findOne({Email})
                  if(!user){
                    return res.status(404).json({Error : "Sorry, User does not exist!!"})
                  }

                  const passwordCompare = await bcrypt.compare(password, user.password)
                  if(!passwordCompare){
                    return res.status(404).json({success, Error: "Please Enter the correct password"})
                  }
                  success = true;


                  const data = {
                    user:{
                      id: user.id,
                    }
                  }
                  const authtoken = jwt.sign(data, JWT_SECRET);
                  res.json({success, authtoken});



               }   catch(error){
                console.log(error.message);
                res.status(500).send("Some error occured");
           }
           })


// ROUTE 3
// Get loggedin user details using POST (/api/auth/getuser)


router.get("/getuser",  fetchuser,  async (req, res) => {

            try {
              const userId = req.user.id;
              const user = await User.findById(userId).select("-password");
              res.send(user);
              
            } catch (error) {
              console.log(error.message);
                res.status(500).send("Some error occured");
            }
          });



module.exports = router;