const express=require("express");
const path=require("path");
 const app=express();
require("../src/db/conn");
const hbs=require("hbs");
const Register = require("./models/registers");
const bcrypt=require("bcryptjs");

const port =process.env.PORT || 3000;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set("view engine","hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

 app.get("/",(req,res)=>{
    res.render("index");
 });
 app.get("/register",(req,res)=>{
   res.render("register");
 });
 app.get("/Home",(req,res)=>{
  res.render("header");
 });
 app.get("/home1",(req,res)=>{
  res.render("Home");
 });
 app.get("/about",(req,res)=>{
  res.render("about");
 });

//create a new user in our database

 app.post("/register",async(req,res)=>{
  try{
     const password=req.body.password;
     const cpassword=req.body.confirmpassword;
     if(password===cpassword){
     const registerEmployee=new Register({
      First:req.body.First,
      Last:req.body.Last,
      Email:req.body.Email,
      gender:req.body.gender,
      number:req.body.number,
      age:req.body.age,
      password:password,
      confirmpassword:cpassword
     })

     const registerd=await registerEmployee.save();
     res.status(201).render("header");
     }else{
      res.send("password are not matching");
     }
  }catch(e){
    res.status(400).send(e);
  }
 })

 // login check

 app.post("/",async(req,res)=>{
  try{
     const Email=req.body.Email;
     const password=req.body.password;

     const useremail=await Register.findOne({Email:Email});

     const isMatch=await bcrypt.compare(password,useremail.password);
     if(isMatch){
      res.status(201).render("Home");
     }else{
      res.send("Invalid Email Id or password");
     }

  }catch(e){
    res.status(400).send("Invalid Email Id or password");
  }
 })

//  const bcrypt=require("bcryptjs");
//  const securePassword=async(password)=>{
//   const passwordHash=await bcrypt.hash(password,10);
//   console.log(passwordHash);
//  } 
//  securePassword("jaga@1");

app.listen(port,()=>{
 console.log(`connection run at port no ${port}`);
});
