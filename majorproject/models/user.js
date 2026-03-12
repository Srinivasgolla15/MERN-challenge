const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username:String,
    password:String,
    email:{type:String, required:true},
    role: {
    type: String,
    enum: ['customer', 'host', 'admin'],
    default: 'customer'  // New users default to customer
},
    createdAt : {
        type:Date,
        default:Date.now()
    }
});

userSchema.plugin(
    passportLocalMongoose.default || passportLocalMongoose
);

module.exports = mongoose.model("User", userSchema);