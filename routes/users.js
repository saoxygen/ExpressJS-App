const express = require("express");
const router = express.Router();

router.use(logger); //middleware function I created

router.get("/", (req, res) => {
    res.send("User list " + req.query.name); // access name property in the query url method http://localhost:3000/users?name=Kyle
});

router.get("/new", (req, res) => {
    // res.send("New user form");
    res.render("users/new", {firstName: "Kopano"})
});

router.post("/", (req, res) => { // post called made from the new.ejs form
    // res.send("Create user");
    // console.log(req.body.firstName);
    // res.send("Hi");

    const isValid = true;

    if(isValid){

        users.push({name: req.body.firstName}); // add new user to the array we have below

        res.redirect(`/users/${users.length - 1}`); // redirect is used to redirct the user to different parts of the application

    } else {

        console.log("Error");
        res.render("users/new", {firstName: req.body.firstName})

    }

})

// url checks each route, make sure static routes come before dynamic routes such as /:id because /new will get mistaken as an id

const users = [{name: "Kopano"}, {name: "David"}];
router.param("id", (req, res, next, id) => { // middleware that runs any time a id param is found
    req.user = users[id].name;
    next(); //with out this function the rest of the code won't run
})

router
.route("/:id")
.get((req, res) => {
    res.send(`Send info related to user: ${req.params.id} ${req.user}`)
})
.post((req, res) => {
    res.send(`Update info related to user: ${req.params.id}`)
})
.delete((req, res) => {
    res.send(`Update info related to user: ${req.params.id}`)
})

function logger(req, res, next){
    console.log(req.originalUrl)
    next();
}

module.exports = router