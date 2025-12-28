const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')

const app=express()

app.use(express.json())

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
.then(() => {
    console.log("MongoDB connected")
})
.catch((err) => {
    console.log(err)
})

const todoschema = new mongoose.Schema({
    uniqueid:{
        type:Number,
        require:true
    },
    activity:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startdate:{
        type:String,
        required:true
    },
    enddate:{
        type:String,
        required:true
    }
})
const todomodel=mongoose.model('todomodel',todoschema)

app.post('/todo',async(req,res) => {
    const {uniqueid,activity,description,startdate,enddate} = req.body
    try{
        const newtodo=new todomodel({
            uniqueid,
            activity,
            description,
            startdate,
            enddate
        })
        await newtodo.save()
        res.status(200).json(newtodo)
    }
    catch(err){
        res.status(404).json({msg:err.msg})
    }
})

app.get('/todo',async(req,res) => {
    try{
        const alltodo=await todomodel.find()
        res.status(200).json(alltodo)
    }
    catch(err){
        res.status(404).json({msg:err.msg})
    }
})

app.put('/todo/:id',async(req,res) => {
    const {activity,description,startdate,enddate}=req.body
    const id=req.params.id
    try{
        const updatedtodo=await todomodel.findByIdAndUpdate(
            id,
            {activity,description,startdate,enddate},
            {new:true}
        )
        if(!updatedtodo){
            return res.status(404).json({msg:"Not found"})
        }
        res.status(200).json(updatedtodo)
    }
    catch(err){
        res.status(404).json({msg:err.msg})
    }
})

app.delete('/todo/:id', async(req,res) => {
    const id=req.params.id
    try{
        const deletedtodo=await todomodel.findByIdAndDelete(
            id
        )
        res.status(200).json(deletedtodo)
    }
    catch(err){
        res.status(404).json({msg:err.msg})
    }
})

const port=8001
app.listen(port,() => {
    console.log(`Server is listening at ${port}`)
})


