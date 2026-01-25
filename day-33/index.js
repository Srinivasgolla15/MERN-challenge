const express=require('express');
const { url } = require('inspector');
const app=express();
const port=3000;
const path=require('path');


app.use(express.urlencoded({ extended: true }));


let posts=[
    {
        id:11,
        username:"john_doe",
        caption:"Enjoying the sunny day!",
        
    },
    {
        id:2,
        username:"jane_smith",
        caption:"Loving this new recipe I tried."
        },
    {
        id:3,
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

app.get('/posts/:id',(req,res)=>{
    let {id}=req.params;
    let post= posts.find(p=> id===p.id.toString());
    res.render('post.ejs',{post});
});



app.post('/posts',(req,res)=>{
     let { username, caption } = req.body;
     posts.push({ username, caption });
     res.redirect('/posts');
});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});