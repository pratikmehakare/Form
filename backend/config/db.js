const mongoose = require('mongoose')

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected..")
    }catch(err){
        console.log("DB Connection Fail")
    }
}

module.exports = connectDb;