const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jobsPost = require('./Routes/jobsPost.js');
const jobsGet = require('./Routes/jobsGet.js');

const app = express();
const port = process.env.PORT || 7000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.post("/jobs", jobsPost);
app.get("/jobs", jobsGet);

app.listen(port, () => console.log(`server running on ${port}`));