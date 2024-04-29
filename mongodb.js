const mongoose=require("mongoose")
mongoose.connect("mongodb://localhost:27017/Login")
.then(()=>{
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("mongodb not connected")
})

const LogInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection1=new mongoose.model("collection2",LogInSchema)
module.exports=collection1
