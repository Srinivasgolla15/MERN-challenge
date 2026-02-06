const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog");
const Comment = require("../models/comment");

router.get("/add-new", (req, res) => {
  res.render("addBlog", { user: req.user });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(
      __dirname,
      "../public/uploads",
      req.user._id.toString()
    );

    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/:id", async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comments = await Comment.find({blogId : req.params.id}).populate("createdBy");
  return res.render("blog",{
    user:req.user,
    blog,
    comments,
  });
})

router.delete("/:id", async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.redirect("/");

  if (blog.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).send("Unauthorized");
  }

  await Blog.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.post('/comment/:blogId',async(req,res)=>{
   if (!req.user) return res.redirect("/user/signin");
  await Comment.create({
    content : req.body.content,
    blogId: req.params.blogId,
    createdBy:req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogId}`);
})

router.post("/", upload.single("coverImage"), async (req, res) => {
  if (!req.user) return res.redirect("/user/signin");

  const { title, body } = req.body;

  await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: req.file
      ? `/uploads/${req.user._id}/${req.file.filename}`
      : undefined,
  });

  res.redirect("/");
});

module.exports = router;
