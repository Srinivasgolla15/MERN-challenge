const express=require('express');
const { url } = require('inspector');
const app=express();
const port=3000;
const path=require('path');


app.use(express.urlencoded({ extended: true }));


let posts=[
    {
        username:"john_doe",
        caption:"Enjoying the sunny day!",
        
    },
    {
        username:"jane_smith",
        caption:"Loving this new recipe I tried."
        },
    {
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
     posts.push({ username, caption });
     res.redirect('/posts');
});


app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});