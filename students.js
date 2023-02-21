import express from "express";

import mongoose from "mongoose";
import connectDB from "./studentsdb.js";
Students
const studentsSchema=mongoose.Schema(
    {
    name:{
        type:String,
        required:true,
        },
    rollno:{
         type:String,
        required:true,
     },
                     })

var Students = mongoose.model('Students', studentsSchema);
studentsSchema.plugin(Students);

connectDB();
const app=express();
app.use(express.json());

const students=[{
    name:"priya",
    rollno:"1",
},
{
    name:"sridhar",
    rollno:"2",
},
{
    name:"sumathi",
    rollno:"3",
},
{
    name:"aswnini",
    rollno:"4",
},
{
    name:"megha",
    rollno:"5",
},
{
    name:"rathiga",
    rollno:"6",
},
{
    name:"harishankar",
    rollno:"7",
},
{
    name:"selvaraj",
    rollno:"8",
},
]


app.get("/api/students",(req,res) =>
{
    try{
        res.status(200).send(students);
    }
    catch(error){
        res.json({message:"not available"});
    }
});
app.post("/api/studentsdetails",async(req,res)=>{
    try{
        const students={
           name:req.body.name,
            rollno:req.body.rollno,
           
        }
        console.log(students);
        var create=new Students(students);
        var studentsCreated=await create.save();
      
        if(studentsCreated){
            console.log("created");
        res.status(201).json({message:"show details"});
        }
else{
    res.status(401);
    throw new error("not found");
}
}catch(err){
    return res.status(500).json({message:err.message});
}}
);
app.put('/api/students/:id',(req,res)=>{
    console.log(req.params.id);
    Students.findOneAndUpdate({_id:req.params.id},{
        $set:{
           
            name:req.body.name,
            rollno:req.body.rollno,

        }
    })
    .then(result=>{
        res.status(200).json({
            updated_students:result       
         })
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            error:err
        })
    })
    })
    app.delete("/api/students/:id",(req,res)=>{
        console.log(req.params.id);
        Students.deleteOne({_id:req.params.id},{
            $set:{
               
                name:req.body.name,
                rollno:req.body.rollno,
    
            }
        })
        .then(result=>{
            res.status(200).json({
                deleted_students:result       
             })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        })
        app.delete("/api/students",(req,res)=>{
    
            Students.deleteMany({students},(err,result)=>{
            if(err) throw err
            res.send(students)
            })
        })
const port=5000;
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    console.log(students);
});