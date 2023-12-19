const express =  require('express');
const router =  express.Router();
const UserModel =  require('../models/user');
const bcrypt = require('bcryptjs');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('file') , async (req,res)=>{

const { fullName , email , username , password, file } = req.body;// Extract the file data from the request

if( !(fullName && email && username && password)){
    res.status(403).send('fill all credentials!')
}

const ExistingUser =  await UserModel.findOne({email: email })

if(ExistingUser){
    res.status(403).send('User Already exists!!')
}
const EncPass = await bcrypt.hash(password,10);

 
 

 // Encode the file data as base64
 const base64File = file ? file.buffer.toString('base64') : null;

//saving the user in DB

const UserData  = await UserModel.create({
    // _id: _id,
    fullName: fullName,
    email : email,
    username: username,
    password:EncPass,
    image: base64File
    
})
console.log(UserData)
res.json(UserData);

//TODO::token generation using jwt.

})


module.exports = router;