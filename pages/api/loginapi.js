import connect from "../../lib/mongoconnect"
import User from "../../models/userschema"
const bcrypt = require('bcryptjs')

connect()

export default async function handler(req, res) {
  try{
    const {emailAddress,password} = req.body
    const user = await User.findOne({emailAddress})
    if(user && (await bcrypt.compare(password,user.password))){
      res.redirect(`/user/${user._id.toString()}`)
    }
    else{
      console.log("user not found")
      return res.status(400).send("Invalid Credentials")
    }
  }
  catch(error){
    console.log(error)
    res.json({status:400})
  }
}