// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connect from "../../lib/mogoconnect"
import User from "../../models/userschema"

connect()

export default async function handler(req, res) {
  try{
    const user = await User.create(req.body)
    if(!user){
      return res.json({status:404})
    }    
    res.redirect(`/user/${user._id.toString()}`)
    console.log(user)
  }
  catch(error){
    console.log(error)
    res.json({status:400})
  }
}
