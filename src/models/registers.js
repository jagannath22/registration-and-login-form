const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const employeeSchema=new mongoose.Schema({
    First:{
        type:String,
        required:true
    },
    Last:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true  
    },
    number:{
        type:Number,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }

})

employeeSchema.pre("save",async function(next){
    if(this.isModified("password")){
        console.log(`the cuurent text is ${this.password}`);
        this.password=await bcrypt.hash(this.password,10);
        console.log(`the cuurent text is ${this.password}`);
        this.confirmpassword=undefined;
    }
  next();
})
//now ew need to create collection

const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;