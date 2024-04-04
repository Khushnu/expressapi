const express = require('express'); 

const app = express(); 
app.use(express.static('./src/logger'));
app.use(express.json());

function createPost(id, title, content, author) {
    return {
      id: id,
      title: title,
      content: content,
      author: author,
    };
  }

  const posts = [
    createPost(1, 'Hello World', 'This is my first blog post', 'Alice'),
    createPost(2, 'Express JS', 'This is a blog post about Express JS', 'Bob'),
    createPost(3, 'RESTful API', 'This is a blog post about RESTful API', 'Charlie'),
  ];
  

app.get('/api/home', (req, res)=>{
    res.status(200).json({"succes":true, "data":posts});
    console.log(req.method);
})

app.delete('/api/home/:id', (req,res)=>{
const postId = posts.find((e)=> e.id === Number(req.params.id));
if(!postId){ 
    res.status(404).json({success:false, msg:`No data found ${req.params.id}`});
}
const newPostId = posts.filter((e)=> e.id !== Number(req.params.id)); 
return res.status(200).json({
    success:true, 
    data:newPostId
})
})


app.get('/api/home/:id', (req, res)=>{
    const {id} = req.params; 
    const postId = posts.find((post)=> post.id === Number(id)); 
    if(!postId){
        res.status(404).json({"succes":false, msg:`No Data found for id : ${id}`})
    }
    res.status(200).json({"success":true, data:`${postId}`});
})


app.put('/api/home/:id', (req, res)=>{
    const { id } = req.params;
const { author, content, title} = req.body;
const postss = posts.find((post)=> post.id === Number(id)); 
if(!postss){
    res.status(404).json({
        success:false, 
        msg:`No data found for id : ${id} `
    })
}

const updatedPost = posts.map((post)=>{
    if(post.id === Number(id)){
        post.author = author;
        post.content = content, 
        post.title = title 
    }
   return post;
})
res.status(200).json({success:true, data:updatedPost})
})


app.post('/api/home', (req, res)=>{
const name= req.body; 
if(name.title && name.author && name.content){
    const newId = posts.length + 1; 
    const newName = new createPost(newId, name.title, name.author);
    posts.push(newName); 
    res.status(200).json({"success": true, "data": [...posts, newName]})
}else {
    res.status(400).json({"success": false, "msg":"Post couldnt be created"});
}
})

app.listen(3000,()=> {
    console.log('Server Started and listening....')
})