import connect from "../../lib/mogoconnect"
import User from "../../models/userschema"

connect()

export default async function handler(req, res) {
  try{
    const {emailAddress,password} = req.body
    const user = await User.findOne({emailAddress,password})
    if(!user){
        console.log("user not found")
        return res.json({status:404})
    }
    res.redirect(`/user/${user._id.toString()}`)
  }
  catch(error){
    console.log(error)
    res.json({status:400})
  }
}