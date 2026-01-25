const express=require('express');
const { url } = require('inspector');
const app=express();
const port=3000;
const path=require('path');
const {v4:uuidv4}=require('uuid');
uuidv4();
const method_ovverride=require('method-override');

app.use(method_ovverride('_method'));

app.use(express.urlencoded({ extended: true }));


let posts=[
    {
        id:uuidv4(),
        username:"john_doe",
        caption:"Enjoying the sunny day!",
        
    },
    {
        id:uuidv4(),
        username:"jane_smith",
        caption:"Loving this new recipe I tried."
        },
    {
        id:uuidv4(),
        username:"alex_92",
        caption:"Just finished a great workout!"
    }
];


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/posts',(req,res)=>{
    res.render('index.ejs', { posts });
});

app.get('/posts/new',(req,res)=>{
    res.render('form.ejs');
});

app.post('/posts',(req,res)=>{
     let { username, caption } = req.body;
     let id=uuidv4();
     posts.push({ id,username, caption });
     res.redirect('/posts');
});

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post= posts.find(p=> id===p.id);
    res.render('post.ejs',{post});
});

app.patch('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post= posts.find(p=> id===p.id);
    let {caption}=req.body;
    post.caption=caption;
    res.redirect('/posts');
});

app.get('/posts/:id/edit',(req,res)=>{
    let {id}=req.params;
    let post=posts.find(p=> id===p.id);
    res.render('edit.ejs',{post});
     
});

app.delete('/posts/:id',(req,res)=>{
    let {id}=req.params;
    posts=posts.filter(p=> p.id!==id);
    res.redirect('/posts');
});





app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});