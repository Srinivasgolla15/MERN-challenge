const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

let connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Srinu@123',
    database: 'test'
})

connection.query("SHOW TABLES",(err,res)=>{
    if (err) throw err;
    console.log(res);
})

connection.end();
let getrandomuser = () => {
    return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

 