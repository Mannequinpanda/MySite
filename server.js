const express = require("express");
const session = require('express-session');

var db = require("./db")

// setup the app object
const app = express();
const PORT = 3006

app.use(express.urlencoded({extended:true})); 
app.use(session({secret:"qweroiuertopiusdfgopv"}))
app.use(express.static('resources'))

app.set("views", "templates");
app.set("view engine", "pug");

let userInfo = {username : "login"};
let clicks = 0;

app.get("/", function(req, res) {
    res.redirect("/myAboutMe", userInfo)
});

app.get("/myAboutMe", async function(req, res) {
    res.render("myAboutMe.pug", userInfo)
});

app.get("/myContacts", async function(req, res) {
    res.render("myContacts.pug", userInfo)
});

app.get("/myWidgets", async function(req, res) {
    let obj = {username: userInfo.username, clickCount: clicks}
    res.render("myWidgets.pug", obj)
});

app.get("/contactMe", async function(req, res) {
    res.render("contactMe.pug", {
        username: userInfo.username,
        recieved: false
    })
});

app.get("/login", async function(req, res) {
    res.render("login.pug", userInfo)
});

app.post("/login", async function(req, res) {
    req.session.username = req.body.username;
    userInfo.username = req.body.username;
    res.redirect("/myAboutMe")
});

app.get("/api/click", async function(req, res) {
    res.json({clickCount : clicks})
});

app.post("/api/click", async function(req, res) {
    clicks += 1;
    //return clicks as a json from https://www.geeksforgeeks.org/express-js-res-json-function/
    res.json({clickCount : clicks})
});

app.post("/logout", async function(req, res) {
    req.session.username = "login"
    userInfo.username = "login"
    res.redirect("/myAboutMe")
})

app.get("/contactLog", async function(req, res) {
    const type = req.query.filter || "all";
    const logs = await db.getLogs(type); 
    res.render("contactLog.pug", {
        username: userInfo.username,
        logs: logs
    });
});

app.post("/contactLog", async function(req, res) {
    await db.addLog(
        req.body.postTitle,
        req.body.email,
        req.body.username,
        req.body.link,
        req.body.category,
        req.body.message
    );
    res.render("contactMe.pug", {
        username: userInfo.username,
        recieved: true
    });
});

// Start the web server
app.listen(PORT, function() {
   console.log(`Listening on http://localhost:${PORT}`);
});