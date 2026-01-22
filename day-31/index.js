const express=require('express');
const app=express();

port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

app.get('/ig/:username',(req,res)=>{
    let {username} = req.params;
   
    res.render('instagram.ejs', { username: username });
});

