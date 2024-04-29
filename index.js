const express=require('express')
const path=require("path")
const bcrypt=require('bcrypt')
const app=express();
const collection=require("./config")
const collection1=require("./mongodb")
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get("/signup",(req,res)=>{
    res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/collections', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'collections.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/payment', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'payment.html'));
});
app.post("/signup",async(req,res)=>{
    const data={
        name:req.body.username,
        email:req.body.useremail,
        password:req.body.password
    }
    const existingUser=await collection.findOne({name:data.name});
    if(existingUser){
        res.send('<script>alert("User already Exists.Please choose a different username.");window.location.href = "/signup";</script>');
    }
    else{
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(data.password,saltRounds);
        data.password=hashedPassword;
        const userdata=await collection.insertMany(data);
        console.log(userdata);
        res.send('<script>alert("Sign in Successful😎");window.location.href = "/";</script>');
    }
});

app.post("/index",async(req,res)=>{
        const check=await collection.findOne({email:req.body.useremail});
        if(!check){
            res.send("User email not found");
            return;
        }else{
        const isPasswordMatch=await bcrypt.compare(req.body.password,check.password);
        if(isPasswordMatch){
            res.sendFile(path.join(__dirname, 'views', 'home.html'));
        }
        else{
            res.send("Wrong password");
        }
    }  
});
app.listen(5000,()=>{
    console.log('Server is running on port 5000')

})