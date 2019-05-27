const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;
const Blog = require("./models/BookModel");
const db = "mongodb://localhost:27017/example";
const path = require("path")

mongoose.connect(db, { useNewUrlParser: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended:true
}));
app.use('/static',express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");

//routesus

app.get("/", (req,res)=>{
  Blog.find({})
    .exec((err, posts) =>{
      if(err){
        res.send(err)
      }else{
        res.render("index", {posts:posts});
      }
    })
})

app.post("/", (req,res)=>{
  const createBlog = new Blog(req.body);
  console.log(req.body)
  createBlog.save(err=>{
    if(err){
      return res.status(500).send(err);
    }
     res.redirect("/")
  })
});

app.get("/:id", (req,res)=>{
  Blog.findById(req.params.id, (err, post)=>{
    if(err){
      console.log(err);
    }else{
      res.render("update",{post:post})
      console.log(req.params.id)
    }
  });
})

app.post("/:id", (req,res)=>{
  Blog.findByIdAndUpdate(req.params.id,{$set:{name: req.body.name, description: req.body.description}},(err,result)=>{
    if(err){
      console.log(err)
    }else{
      res.redirect("/")
      console.log("success")
    }
  })
})

app.post("/:id/delete",(req,res)=>{
  Blog.findByIdAndRemove(req.params.id,(err,todo)=>{
    if(err){
      console.log(req.params.id)
    }else{
      res.redirect("/")
    }
  })
})

app.listen(port, ()=>{
  console.log("Server has started");
})
