const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./Middleware/verifyToken.js");
const jobsPost = require("./Routes/jobsPost.js");
const jobsGet = require("./Routes/jobsGet.js");
const jobsDelete = require("./Routes/jobsDelete.js");
const jobsEdit = require("./Routes/jobsEdit.js");
const partialJobsEdit = require("./Routes/partialJobsEdit.js");

const registerUser = require("./Routes/registerUser.js");
const loginUser = require("./Routes/loginUser.js");

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// app.post("/jobs", verifyToken, jobsPost);
// app.get("/jobs", verifyToken, jobsGet);
// app.delete("/jobs/:id", verifyToken, jobsDelete);
// app.put("/jobs/:id", verifyToken, jobsEdit);
// app.patch("/jobs/:id", verifyToken, partialJobsEdit);

app.post("/jobs", jobsPost);
app.get("/jobs", jobsGet);
app.delete("/jobs/:id", jobsDelete);
app.put("/jobs/:id", jobsEdit);
app.patch("/jobs/:id", partialJobsEdit);

app.post("/register", registerUser);
app.post("/login", loginUser);

const mongoose = require("mongoose");

const Post = require("./api/models/Post");

const multer = require("multer");
const uploadMiddleware = multer({ dest: "uploads/" });
const fs = require("fs");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/api/uploads"));

mongoose.set("strictQuery", false);
mongoose.connect(
  "mongodb+srv://hameezahmed23:nMbGO9kRfXZ1xKje@cluster0.zrq5jo8.mongodb.net/?retryWrites=true&w=majority"
);

app.post(
  "/newsfeed/createPost",
  uploadMiddleware.single("file"),
  async (req, res) => {
    console.log("Hellopost");
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
  }
);

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

app.listen(port, () => console.log(`server running on ${port}`));
