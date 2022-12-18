// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connect from "../../lib/mongoconnect"
import User from "../../models/userschema"
const bcrypt = require('bcryptjs')


connect()

export default async function handler(req, res) {
  try{
    const {fullname,emailid,password} = req.body

    const oldUser = await User.findOne({emailAddress:emailid})
    
    if(oldUser){
      return res.status(409).send("User Already Exists")
    }

    let encryptedPassword = await bcrypt.hash(password,15)
    const user = await User.create({
      fullName: fullname,
      emailAddress: emailid,
      password: encryptedPassword
    })

    if(!user){
      return res.json({status:404})
    }  
    else{
      res.redirect(`/user/${user._id.toString()}`)
    }  
  }
  catch(error){
    console.log(error)
    res.json({status:400})
  }
}
