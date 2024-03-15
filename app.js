// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const verifyToken = require("./Middleware/verifyToken.js");
// require("dotenv").config();

// //jobs routes
// const jobsPost = require("./Routes/jobsPost.js");
// const jobsGet = require("./Routes/jobsGet.js");
// const jobsDelete = require("./Routes/jobsDelete.js");
// const jobsEdit = require("./Routes/jobsEdit.js");
// const partialJobsEdit = require("./Routes/partialJobsEdit.js");

// //login
// const registerUser = require("./Routes/registerUser.js");
// const loginUser = require("./Routes/loginUser.js");

// //email routes
// const emailRoutes = require("./controllers/emailRoutes");

// //user routes
// const profilePost = require("./Routes/userRoutes/profilePost");

// const app = express();
// const port = process.env.PORT;
// app.use(cors({ credentials: true, origin: process.env.FRONTEND_API }));

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // app.post("/jobs", verifyToken, jobsPost);
// // app.get("/jobs", verifyToken, jobsGet);
// // app.delete("/jobs/:id", verifyToken, jobsDelete);
// // app.put("/jobs/:id", verifyToken, jobsEdit);
// // app.patch("/jobs/:id", verifyToken, partialJobsEdit);

// //job apis
// app.post("/jobs", jobsPost);
// app.get("/jobs", jobsGet);
// app.delete("/jobs/:id", jobsDelete);
// app.put("/jobs/:job_id", jobsEdit);
// app.patch("/jobs/:job_id", partialJobsEdit);

// //login apis
// app.post("/register", registerUser);
// app.post("/login", loginUser);

// //email apis
// app.use("/email", emailRoutes);

// //user profile apis
// app.post("/profile", profilePost);

// const mongoose = require("mongoose");

// const Post = require("./api/models/Post");

// const multer = require("multer");
// const uploadMiddleware = multer({ dest: "uploads/" });
// const fs = require("fs");
// app.use("/uploads", express.static(__dirname + "/uploads"));
// app.use(express.json());

// mongoose.set("strictQuery", false);
// // mongoose.connect(
// //   // "mongodb://hameezahmed23:nMbGO9kRfXZ1xKje@main-shard-00-00-03xkr.mongodb.net:27017,main-shard-00-01-03xkr.mongodb.net:27017,main-shard-00-02-03xkr.mongodb.net:27017/main?ssl=true&replicaSet=Main-shard-0&authSource=admin&retryWrites=true"
// //   "mongodb+srv://hameezahmed23:nMbGO9kRfXZ1xKje@cluster0.zrq5jo8.mongodb.net/?retryWrites=true&w=majority"
// // );
// mongoose.connect(process.env.MONGODB_CONNECT_URI);
// // console.log(process.env.MONGODB_CONNECT_URI);

// app.post("/newsfeed/createPost", uploadMiddleware.single("file"), async (req, res) => {
//     console.log("Hellopost");
//     const { originalname, path } = req.file;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1];
//     const newPath = path + "." + ext;
//     fs.renameSync(path, newPath);

//     const { title, summary, content } = req.body;
//     const postDoc = await Post.create({
//       title,
//       summary,
//       content,
//       cover: newPath,
//     });
//     res.json(postDoc);
//   }
// );
 
// // app.put("/newsfeed/post", uploadMiddleware.single("file"), async (req, res) => {
// //   console.log("helloput");
// //   let newPath = null;
// //   if (req.file) {
// //     const { originalname, path } = req.file;
// //     const parts = originalname.split(".");
// //     const ext = parts[parts.length - 1]; 
// //     newPath = path + "." + ext;
// //     fs.renameSync(path, newPath);
// //   }

// //   const { id, title, summary, content } = req.body;
// //   const postDoc = await Post.findById(id);
// //   await postDoc.update({
// //     title,
// //     summary,
// //     content,
// //     cover: newPath ? newPath : postDoc.cover,
// //   });

// //   res.json(postDoc);  
// // });

// //app.js put api call
// app.put("/newsfeed/post/:id", uploadMiddleware.single("file"), async (req, res) => {
//   console.log("helloput");
//   let newPath = null;
//   if (req.file) {
//     const { originalname, path } = req.file;
//     const parts = originalname.split(".");
//     const ext = parts[parts.length - 1]; 
//     newPath = path + "." + ext;
//     fs.renameSync(path, newPath);
//   }

//   const { id } = req.params; // Extract id from request parameters
//   const { title, summary, content } = req.body;
//   console.log(id + ' ' + title + ' ' + summary + ' ' + content);
//   try {
//     // Assuming cover image is received as part of the request body
//     const { cover } = req.file ? req.file : {}; // Get cover image path or undefined
//     const updatedPost = await Post.findByIdAndUpdate(id, {
//       title,
//       summary,
//       content,
//       cover: cover ? newPath : undefined, // Update cover path if cover image is provided
//     }, { new: true });

//     res.json(updatedPost);
//   } catch (error) {
//     console.error("Error updating post:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });





// app.delete("/newsfeed/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   console.log("Delete request received for id:", id);
//   try {
//     const postDoc = await Post.findById(id);

//     if (!postDoc) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     // if (postDoc.cover) {
//     //   fs.unlinkSync(postDoc.cover);
//     // }
//     if (postDoc.cover) {
//       try {
//         fs.unlinkSync(postDoc.cover);
//       } catch (error) {
//         console.error("Failed to delete file:", error);
//         // Handle error (e.g., log it, notify admin)
//       }
//     }

//     await Post.findByIdAndDelete(id);

//     res.json({ message: "Post deleted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.get("/newsfeed/post", async (req, res) => {
//   console.log("hello2");
//   // console.log(res);
//   res.json(await Post.find().sort({ createdAt: -1 }).limit(20)); //.populate('author', ['username'])
// });

// app.get("/newsfeed/post/:id", async (req, res) => { 
//   console.log("hello1");
//   const { id } = req.params;
//   const postDoc = await Post.findById(id); //.populate('author', ['username']);
//   res.json(postDoc);
// });

// app.listen(port, () => console.log(`server running on ${port}`));




//app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./Middleware/verifyToken.js");
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");
require("dotenv").config();

//jobs routes
const jobsPost = require("./Routes/jobsPost.js");
const jobsGet = require("./Routes/jobsGet.js");
const jobsDelete = require("./Routes/jobsDelete.js");
const jobsEdit = require("./Routes/jobsEdit.js");
const partialJobsEdit = require("./Routes/partialJobsEdit.js");

//login
const registerUser = require("./Routes/registerUser.js");
const loginUser = require("./Routes/loginUser.js");

//email routes
const emailRoutes = require("./controllers/emailRoutes");

//user routes
const profilePost = require("./Routes/userRoutes/profilePost");

const app = express();
const port = process.env.PORT;
app.use(cors({ credentials: true, origin: process.env.FRONTEND_API }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.post("/jobs", verifyToken, jobsPost);
// app.get("/jobs", verifyToken, jobsGet);
// app.delete("/jobs/:id", verifyToken, jobsDelete);
// app.put("/jobs/:id", verifyToken, jobsEdit);
// app.patch("/jobs/:id", verifyToken, partialJobsEdit);

//job apis
app.post("/jobs", jobsPost);
app.get("/jobs", jobsGet);
app.delete("/jobs/:id", jobsDelete);
app.put("/jobs/:job_id", jobsEdit);
app.patch("/jobs/:job_id", partialJobsEdit);

//login apis
app.post("/register", registerUser);
app.post("/login", loginUser);

//email apis
app.use("/email", emailRoutes);

//user profile apis
app.post("/profile", profilePost);



const connectionString = "DefaultEndpointsProtocol=https;AccountName=cdp3;AccountKey=hzfOj//gM6C8mvt5xh0WkGuqYOp36lFLrR3TGiua/TxxdqMBNFxKfJjO9PVkoaUI9H4wV9duSOKF+AStYfNyKA==;EndpointSuffix=core.windows.net";
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Multer setup
const multer = require("multer");
const upload = multer();

// MongoDB setup
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_CONNECT_URI);

// Define schema for Post model
const Post = require("./api/models/Post");

// Import Readable class from stream module
const { Readable } = require('stream');

// Route for creating a new post
app.post("/newsfeed/createPost", upload.single("file"), async (req, res) => {
  try {
    const { title, summary, content } = req.body;
    const file = req.file;

    // Upload file to Azure Blob Storage
    const blobName = `${Date.now()}-${file.originalname}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(file.buffer);

    // Generate SAS token for the uploaded blob
    const blobSAS = generateBlobSASQueryParameters({
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"), // Read permission
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 90 * 24 * 3600 * 1000), // 3 months from now
    }, blobServiceClient.credential);

    // Append SAS token to the blob URL
    const blobUrlWithSAS = `${blockBlobClient.url}?${blobSAS.toString()}`;

    // Save post with the blob URL including the SAS token
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: blobUrlWithSAS,
    });

    res.json(postDoc);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route for updating an existing post
app.put("/newsfeed/post/:id", upload.single("file"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content } = req.body;
    const file = req.file;

    let coverUrl;
    if (file) {
      // Upload file to Azure Blob Storage
      const blobName = `${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const stream = file.buffer;
      await blockBlobClient.uploadStream(stream);
      coverUrl = blockBlobClient.url;
    }

    // Update post with new data
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        title,
        summary,
        content,
        ...(coverUrl && { cover: coverUrl }), // Update cover URL if cover image is provided
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  // console.log(res);
  res.json(await Post.find().sort({ createdAt: -1 }).limit(20)); //.populate('author', ['username'])
});

app.get("/newsfeed/post/:id", async (req, res) => { 
  console.log("hello1");
  const { id } = req.params;
  const postDoc = await Post.findById(id); //.populate('author', ['username']);
  res.json(postDoc);
});

app.listen(port, () => console.log(`server running on ${port}`));
