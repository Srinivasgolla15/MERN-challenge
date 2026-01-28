const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

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

let q = "INSERT INTO user (id,username,email,password) VALUES ? ";
 
let users = [];
for (let i = 0; i < 500; i++) {
    users.push(getrandomuser());
}

connection.query(q, [users], (err, res) => {
    if (err) throw err;
    console.log(res);
})

connection.end();


