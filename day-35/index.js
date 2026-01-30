const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app=express();
const path = require('path');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
let getrandomuser = () => {
    return [
        faker.string.uuid(),
        faker.person.fullName(),
        faker.internet.email(),
        faker.internet.password(),
    ];
};

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Srinu@123',
    database: 'test'
})



app.get("/",(req,res)=>{

    let q =`SELECT count(*) as userCount FROM user`;
    try{
        connection.query(q,(err,result) =>{
            if (err) throw err;
            console.log(result);
            console.log(result[0]);
            let userCount = result[0].userCount;
            res.render("index.ejs",{userCount});
        })
    }catch(err){
        console.log(err);
    }
    
});

app.get("/users",(req,res)=>{

    let q =`SELECT id,username,email FROM user`;
    try{
        connection.query(q,(err,result) =>{
            if (err) throw err;
            // console.log(result);
            res.render("users.ejs",{users:result});
        })
    }catch(err){
        console.log(err);
    }
    
});

app.get("/users/:id/edit",(req,res)=>{
    let { id } = req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    try{
        connection.query(q,(err,result) =>{
            
            if (err) throw err;
            let user = result[0];
            // console.log(result);
            res.render("edit.ejs",{user});
        })
    }catch(err){
        console.log(err);
    }
});

app.patch("/users/:id",(req,res)=>{
    let {id}=req.params;
    let q = `SELECT * FROM user WHERE id = '${id}'`;
    // let q= `UPDATE user set username = ${req.body.username}, password=${req.body.password} WHERE id='${id}'`;
    try{
        connection.query(q,(err,result) =>{
            if (err) throw err;
            let user = result[0];
            let { username:formuser,password:formpass}=req.body;
            if (formpass!=user.password){
                res.send("password incorrect");
                res.redirect(`/users/${id}/edit`);
            }else{
                let updatequery=`UPDATE user set username = '${formuser}' WHERE id='${id}'`;
                connection.query(updatequery,(err2,result2)=>{
                    if (err2) throw err2;
                    // res.send( result2);
                    res.redirect("/users");
                });
            }
        })
    }catch(err){
        console.log(err);
    }

});



app.listen("8080",()=>{
    console.log("server started on port 8080");
});



// let q = "INSERT INTO user (id,username,email,password) VALUES ? ";
 
// let users = [];
// for (let i = 0; i < 500; i++) {
//     users.push(getrandomuser());
// }

// connection.query(q, [users], (err, res) => {
//     if (err) throw err;
//     console.log(res);
// })

// connection.end();