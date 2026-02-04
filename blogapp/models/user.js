const mongoose =  require("mongoose");
const {createHmac,randomBytes} = require("crypto")

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    salt:{
        type:String,
        
    },
    password: {type: String, required: true},
    profilePic:{
        type:String,
        default:"/images/defaultUserAvatar.jpg",
    },
    role:{
        type:String,
        enum : ["USER","ADMIN"],
        default:"USER",
    },
}, {timestamps: true}
);

userSchema.pre("save", async function () {
    // `this` refers to the current user document

    // Only hash password if it is new or modified
    if (!this.isModified("password")) return;

    // Generate random salt
    const salt = randomBytes(16).toString("hex");

    // Hash the password using the salt
    const hashedPassword = createHmac("sha256", salt)
        .update(this.password)
        .digest("hex");

    // Store salt and hashed password
    this.salt = salt;
    this.password = hashedPassword;
});



const User = mongoose.model('user', userSchema);
module.exports = User;