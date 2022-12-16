import mongoose from "mongoose";

const referralsSchema = new mongoose.Schema({
    postingId: {type: String},
    candidateId: {type: String}
})

const querySchema = new mongoose.Schema({
    userDoubt: {type: String},
    adminResponse: {type: String}
})

const userSchema = new mongoose.Schema({
    fullName: {type:String, required:true},
    emailAddress: {type:String, required: true, unique: true},
    password: {type:String, required:true},
    saved: {type:[String]},
    referrals: [referralsSchema]
})


module.exports = mongoose.models.User || mongoose.model('User',userSchema)