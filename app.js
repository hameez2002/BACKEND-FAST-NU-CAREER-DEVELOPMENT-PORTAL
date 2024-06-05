//app.js :

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const verifyToken = require("./Middleware/verifyToken.js");
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");
require("dotenv").config();
// const imageType = require('image-type');

//jobs routes
const jobsPost = require("./Routes/jobsPost.js");
const jobsGet = require("./Routes/jobsGet.js");
const jobsDelete = require("./Routes/jobsDelete.js");
const jobsEdit = require("./Routes/jobsEdit.js");
const partialJobsEdit = require("./Routes/partialJobsEdit.js");
const getJobSingle = require("./Routes/singleJobGet.js");

//login
const registerUser = require("./Routes/registerUser.js");
const loginUser = require("./Routes/loginUser.js");

//email routes
const emailRoutes = require("./controllers/emailRoutes");

//user routes
const profilePost = require("./Routes/userRoutes/profilePost");
const getProfile = require("./Routes/userRoutes/getProfile");
const profileGetAll = require("./Routes/userRoutes/profileGetAll.js");

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
const port = 7000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




//login apis
app.post("/register", registerUser);
app.post("/login", loginUser);


// app.use(verifyToken);

app.post("/jobs", verifyToken, jobsPost);
app.get("/jobs", verifyToken, jobsGet);
app.delete("/jobs/:id", verifyToken, jobsDelete);
app.put("/jobs/:id", verifyToken, jobsEdit);
app.patch("/jobs/:id", verifyToken, partialJobsEdit);
app.get("/jobs/:id",verifyToken, getJobSingle);


let imageType;
import('image-type').then(module => {
  imageType = module.default;
}).catch(err => {
  console.error('Error importing image-type:', err);
});



//job apis
// app.post("/jobs", jobsPost);
// app.get("/jobs", jobsGet);
// app.delete("/jobs/:id", jobsDelete);
// app.put("/jobs/:job_id", jobsEdit);
// app.patch("/jobs/:job_id", partialJobsEdit);
// app.get("/jobs/:id", getJobSingle);


//email apis
app.use("/email", emailRoutes);

//user profile apis
app.post("/profile", profilePost);
app.get("/profile/:user_id", getProfile);
app.get("/profile", profileGetAll);


//AZURE BLOB STORAGE CONTAINER Connectivity
const connectionString = "DefaultEndpointsProtocol=https;AccountName=cdp3;AccountKey=hzfOj//gM6C8mvt5xh0WkGuqYOp36lFLrR3TGiua/TxxdqMBNFxKfJjO9PVkoaUI9H4wV9duSOKF+AStYfNyKA==;EndpointSuffix=core.windows.net";
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient(containerName);

// Multer setup
const multer = require("multer");
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

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
    console.log("Entered Create Post");
    const { title, summary, content } = req.body;
    const file = req.file;

    // Detect image type
    const imageMimeType = imageType(file.buffer);
    const contentType = imageMimeType ? `image/${imageMimeType.ext}` : 'application/octet-stream';

    // Upload file to Azure Blob Storage
    const blobName = `${Date.now()}-${file.originalname}`;
    console.log(file.originalname);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    
    // Create a readable stream from the file buffer
    const stream = Readable.from(file.buffer);
    console.log(stream);
    
    // Upload the stream to Azure Blob Storage
    await blockBlobClient.uploadStream(stream, undefined, undefined, { blobHTTPHeaders: { blobContentType: contentType } });
    console.log(blockBlobClient.url);
    
    // Save post with file URL
    const postDoc = await Post.create({
      title,
      summary,
      content,
      cover: blockBlobClient.url,
    });

    res.json(postDoc);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Route for updating an existing post
// updatepost put api
app.put("/newsfeed/post/:id", upload.single("cover"), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, summary, content } = req.body;
    const file = req.file;

    let coverUrl;
    if (file) {
      // Handle cover image upload
      const imageMimeType = imageType(file.buffer);
      const contentType = imageMimeType ? `image/${imageMimeType.ext}` : 'application/octet-stream';

      const blobName = `${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const stream = Readable.from(file.buffer);
      await blockBlobClient.uploadStream(stream, undefined, undefined, { blobHTTPHeaders: { blobContentType: contentType } });
      coverUrl = blockBlobClient.url;
    }

    // Update post with new data
    const updatedFields = {
      title,
      summary,
      content,
      ...(coverUrl && { cover: coverUrl }), // Update cover URL if cover image is provided
    };

    const updatedPost = await Post.findByIdAndUpdate(id, updatedFields, { new: true });

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
