const express=require('express');
const app=express();
const path=require('path');


app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

port = 3000;

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})

app.get('/ig/:username',(req,res)=>{
    const { username } = req.params;
    const InstaData=require("./data.json")
    const data=InstaData[username];
    console.log(data);
    res.render('instagram.ejs', { data });
});

