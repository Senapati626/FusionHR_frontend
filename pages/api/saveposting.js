import connect from "../../lib/mogoconnect"
import User from "../../models/userschema"

connect()

export default async function handler(req, res) {
  try{
    const {userid,posting} = req.body
    const user = await User.updateOne({_id: userid},{$addToSet: {saved: posting}})
    return user.json()
  }
  catch(error){
    console.log(error)
    res.json({status:400})
  }
}