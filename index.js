// 1. import the Express Package
const express = require("express");
// 2. import the Session Package
const session = require("express-session");
// 3. import the MySQLStore which is used to store session
const MySQLStore = require("connect-mysql2")(session);
// 12.1. import path module
const path = require("path");
// 4. import the dotenv package
require("dotenv").config();

// 5. We also need our database connection. Remember we had already exported it, we need to access it in the config folder
const db = require("./config/db");
// 6. Then we define our authentication-routes (authRoutes) in the routes
const authRoutes = require("./routes/auth");

// 7. Initialize our Server
const app = express();

// 8. Set-up our Middleware: Middleware is a piece of application, all the features and functionalities that sit in between two Interfaces
// 8.1. Middleware in this regard is on the application itself. We will be using the JSON data configuration using the USE Method to express JSON. So it simple means we are expecting it to use the JSON data format
app.use(express.json());

// 9. Set-up Session: This is use for User and Data Management
// 9.1 With session, you can store data in the session for later use rather than having to retrieve or fetch it from the database.
// 9.1 In order to perform some additional processes or logic from your application
// 9.1.1. The set-up takes up an Object with a Key, a Key is the identifier for the session: key: 'user_sid',
// 9.1.2. Note that we also have to export the SESSION_SECRET to .env file
// 9.1.2.1. We also add this Session-Secret to our .env file and we add a random set of numbers and characters as its value, the longer the much better
app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    //store: new MySQLStore({}, db),
  })
);

//routes
// 12.0. defining route for the form: to do this, we import a module for "path" at the top and continue in 10. with app.get method for the form.
// 10. setting up our routes in order of: 1. app.use, 2 app.get
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/auth", authRoutes);

// 11. Start Server
// 11.1. We start by using a variable to define our port either by statically or place it in the .env: process.env.PORT.
const port = 3007;
//const port = process.env.PORT || 3000;

// 11.2. Then we can start our server by using the app.listen() Method.
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
