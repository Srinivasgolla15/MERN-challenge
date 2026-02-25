const mongoose = require('mongoose');



async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log("Connected to MongoDB");
}

main()
    .then((res) => { console.log("DB Connection Successful") })
    .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);
const Employee = mongoose.model('Employee', new mongoose.Schema({
    name: String,
    position: String,
    department: String,
}));