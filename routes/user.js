const express =  require('express');
const router =  express.Router();
const UserModel =  require('../models/user')
const bcrypt = require('bcryptjs')
router.post('/register', async (req,res)=>{

const { fullName , email , username , password, } = req.body;

if( !(fullName && email && username && password)){
    res.status(403).send('fill all credentials!')
}

const ExistingUser =  await UserModel.findOne({email: email })

if(ExistingUser){
    res.status(403).send('User Already exists!!')
}
const EncPass = await bcrypt.hash(password,10);

//saving the user in DB

const UserData  = await UserModel.create({
    // _id: _id,
    fullName: fullName,
    email : email,
    username: username,
    password:EncPass
})
console.log(UserData)
res.json(UserData);

//TODO::token generation using jwt.

})


module.exports = router;