# FAST NUCES Career Development Portal Guide

## Backend

### Step 1: Install Dependencies
Start by installing all necessary dependencies and packages by running the following command in the terminal:
```bash
npm install
```
### Step 2: Understanding app.js

The app.js file is the main entry point for an Express.js web server. It sets up the server, configures middleware, defines routes for handling various functionalities (e.g., job postings, user login and registration, email handling, user profiles, and newsfeed posts), and starts the server to listen for incoming requests.

## Dependencies in app.js
#### **express**: A web application framework for Node.js.
#### **body-parser**: Middleware to parse incoming request bodies.
#### **cors**: Middleware to enable Cross-Origin Resource Sharing.
#### **azure/storage-blob**: Azure SDK for interacting with Blob storage.
#### **dotenv**: Loads environment variables from a .env file.



## **Route Handlers**
#### **loginUser.js**
Handles user login requests by validating the provided credentials against stored data, and if valid, generates and returns a JSON Web Token (JWT) for session management.

#### **registerUser.js**
Handles user registration requests by checking if a user already exists, hashing the provided password, and saving the user details to the database.

## **Backend Files and Configurations**
#### **app.js**
+ Lines 1-26: Internal file routes.
+ Line 32: Cors connection configuration for allowing cross-origin data sharing. Set origin to http://localhost:3000 for localhost or your deployed link.
+ Line 84: Connection string for Azure Blob Storage container. Consult documentation on how to get the connection string from Azure Portal.
+ Line 85: Name of your blob container created on Azure Portal.
+ Line 91: Same as Line 32 for additional CORS configuration.

#### **db.js**
+ Contains information about the database connection.
+ Localhost: Uncomment lines 11-14 and comment lines 4-10.
+ Deployment: Uncomment lines 4-10 and comment lines 11-14.

#### **knexFile.js**
+ Sets up and exports a knex instance for connecting to a MySQL database.
+ Localhost: Uncomment lines 1-11, comment lines 14-26.
+ Deployment: Uncomment lines 14-26, comment lines 1-11.

### Routes Folder
Contains routes for job functionality, login, and register. The userRoutes subfolder contains routes for user profiles using knex.

Non-functional Files
The files roles.js and sendConfirmationEmail.js are mentioned but were not implemented properly and can be completed if needed.

## Configuration Files
**vercel.json:** Used for deployment configuration.

**.env:** Stores sensitive information such as MONGODB_CONNECT_URI, FRONTEND_API, AZURE_STORAGE_CONNECTION_STRING, AZURE_STORAGE_CONTAINER_NAME, JWT_SECRET_KEY.
Uploads Folder
Contains uploaded images for the Newsfeed section. Currently, data is stored in Azure Blob Storage container.

## Other Important Files
**/api/models/Post.js:** Contains schema for noSQL db used in the newsfeed section deployed on MongoDB Atlas.

**/controllers:** Contains files for sending emails, triggered after a new job is created.
/Middleware/verifyToken.js: Verifies JSON token validity.

**/Routes/getProfile.js:** Fetches data for the logged-in profile.

**/Routes/profileGetAll.js:** Fetches data for all profiles shown in the "directory" tab.

**/Routes/profilePost.js:** Handles user profile edits and stores data in the database.

*The FILES jobsDelete.js, jobsEdit.js, jobsGet.js, jobsPost.js, partialJobsEdit.js, singleJobGet.js are files referring to jobs .*

*The FILES loginUser.js and registerUser.js are used for handling data for registering and logging of user.*

## Deployment
The backend deployment is done on Vercel. Follow this [video guide](https://youtu.be/LUuIeg2oYm0?si=e7FDnJhN1gLs3qXK)
 to deploy the backend and SQL database.


___________
*This guide provides a comprehensive overview of configuring and running the backend of the FAST NUCES Career Development Portal. For further details, refer to comments in the code and consult ChatGPT if needed.*