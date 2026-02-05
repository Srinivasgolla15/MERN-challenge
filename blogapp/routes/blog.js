const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Blog = require("../models/blog");

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
