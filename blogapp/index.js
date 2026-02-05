const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/auth");
const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const Blog = require("./models/blog");

const app = express();

main().catch(err => { console.log(err); });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/BlogDB");
    console.log("Connected to MongoDB");
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));


app.get("/", async(req, res) => {
    const allBlogs = await (await Blog.find({})) ;
    res.render("home", {
        user: req.user,
        blogs:allBlogs,
    });
});

app.use("/user", userRoute);
app.use("/blog",blogRoute)

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
