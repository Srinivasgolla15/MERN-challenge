require("dotenv").config();
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
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
}

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));


app.get("/", async (req, res) => {
    if (!req.user) {
        return res.render("home", {
            user: null,
            blogs: [],
            error: "Please sign in to see blogs",
        });
    }

    const allBlogs = await Blog.find({}).sort({ createdAt: -1 });

    res.render("home", {
        user: req.user,
        blogs: allBlogs,
        error: null,
    });
});


app.use("/user", userRoute);
app.use("/blog",blogRoute)

const PORT = process.env.PORT  ;
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
});
