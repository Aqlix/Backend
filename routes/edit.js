const express =  require('express');
const router =  express.Router();
const userModel = require('../models/user');

router.put('/user/:id', async (req,res)=>{
  //extract user id from database
const userId = req.params.id;
const updatedUserDetails =  req.body;
 const updatedDetails = await userModel.findOneAndUpdate({ _id: userId},
    { $set: updatedUserDetails },
    { new: true })
res.json(updatedDetails)
console.log(updatedDetails)

})



module.exports = router