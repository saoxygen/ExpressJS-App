
const express = require("express"); // require the library we installed
const app = express(); // call express function

app.use(express.static("public")); // render static files from the public folder //can be used to access subfolders and files as well

app.set("view engine", "ejs"); //set up view engine to pass info to html file and to load html from the server

app.get("/", (req, res) => {
    console.log("Here");
    //res.send("Hi");
    // res.status(500).send("Oops error on our end"); // send normal text info, good for testing
    // res.status(500).json({message: "Oops error on our end"}); // send json info, good for APIs
    // res.download("server.js"); // send files to client
    res.render("index", {text: "world"}); //send html file to client
})

// route info related to users to the user.js file
const userRouter = require("./routes/users");
app.use("/users", userRouter)

app.listen(3000); // port number used for the app