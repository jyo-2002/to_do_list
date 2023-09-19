const express = require("express")
const body = require("body-parser")
const mongoose = require("mongoose")
const app=express()
app.set('view engine', 'ejs');
app.use(body.urlencoded({extended:true}))
app.use(express.static("public"))


mongoose.connect("mongodb+srv://shashank1321:todo1321@cluster0.vufefye.mongodb.net/tododb",{useNewUrlParser:true})

//schema
const todoschema = new mongoose.Schema({
    task: String
}) 

//model
const todomodel = mongoose.model('tasks', todoschema)

//object
// const t1 = new todomodel({task: "Gaming"})
// const t2 = new todomodel({task: "Studying"})
// const t3 = new todomodel({task: "Coding"})
//t1.save()
//t2.save()
//t3.save()

var list=[]

app.get("/",function(req,res){
    todomodel.find().then((result) => {
        res.render('index',{tasks:result})
    }).catch((err) => {
        console.log(err)
    });
})

app.post("/",function(req,res){
    var todotask = req.body.task
    const task = new todomodel({task: todotask})
    task.save()
    res.redirect("/")
})

app.post("/delete",function(req,res){
    var item = req.body.checkbox
    todomodel.deleteOne({_id: item}).then((result) => {
        res.redirect("/")
    }).catch((err) => {
        console.log(err)
    });
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is up and running")
})
