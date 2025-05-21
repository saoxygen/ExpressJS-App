const express = require("express");
const router = express.Router();

router.use(logger); //middleware function I created

router.get("/", (req, res) => {
    res.send("User list")
});

router.get("/new", (req, res) => {
    res.send("New user form")
});

router.post("/", (req, res) => {
    res.send("Create user")
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