const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const Post = require("./models/Post");

const app = express();
const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

mongoose.set("strictQuery", false);
mongoose.connect(
  // "mongodb://hameezahmed23:nMbGO9kRfXZ1xKje@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true"
  "mongodb+srv://hameezahmed23:hameez12@cluster0.zrq5jo8.mongodb.net/?retryWrites=true&w=majority"
);
app.post("/newsfeed/createPost", uploadMiddleware.single("file"), async (req, res) => {
  console.log('Hellopost');
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const ext = parts[parts.length - 1];
  const newPath = path + "." + ext;
  fs.renameSync(path, newPath);

  const { title, summary, content } = req.body;
  const postDoc = await Post.create({
    title,
    summary,
    content,
    cover: newPath,
  });
  res.json(postDoc);
});

app.put("/newsfeed/post", uploadMiddleware.single("file"), async (req, res) => {
  console.log("helloput");
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { id, title, summary, content } = req.body;
  const postDoc = await Post.findById(id);
  await postDoc.update({
    title,
    summary,
    content,
    cover: newPath ? newPath : postDoc.cover,
  });

  res.json(postDoc);
});

app.delete("/newsfeed/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Delete request received for id:", id);
  try {
    const postDoc = await Post.findById(id);

    if (!postDoc) {
      return res.status(404).json({ error: "Post not found" });
    }

    // if (postDoc.cover) {
    //   fs.unlinkSync(postDoc.cover);
    // }
    if (postDoc.cover) {
      try {
        fs.unlinkSync(postDoc.cover);
      } catch (error) {
        console.error("Failed to delete file:", error);
        // Handle error (e.g., log it, notify admin)
      }
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/newsfeed/post", async (req, res) => {
  console.log("hello2");
  res.json(await Post.find().sort({ createdAt: -1 }).limit(20)); //.populate('author', ['username'])
});

app.get("/newsfeed/post/:id", async (req, res) => {
  console.log("hello1");
  const { id } = req.params;
  
  const postDoc = await Post.findById(id); //.populate('author', ['username']);
  res.json(postDoc);
});

app.listen(4000);
