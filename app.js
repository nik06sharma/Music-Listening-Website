var express = require("express"); 
var app = express(); 
var path = require("path"); 
var mysql = require("mysql2"); 
 
var port = 3000; 
 
var con = mysql.createConnection({ 
  host: "localhost", 
  user: "root", 
  password: "password", 
  database: "songs", 
}); 
 
con.connect(function (err) { 
  if (err) throw err; 
  console.log("Connected!"); 
}); 
 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname))); 
app.use(express.json()); 
 
app.get("/home", function (req, res) { 
  res.sendFile(path.join(__dirname, "index.html")); 
}); 
 
app.get("/", function (req, res) { 
  res.redirect('/login'); 
}); 
 
app.post("/home", function (req, res) { 
  var keyword = req.body.searchkey; 
  console.log(keyword); 
  con.query( 
    `SELECT * FROM songs WHERE name LIKE '%${keyword}%'`, 
    function (err, result, fields) { 
      if (err) throw err; 
      console.log(result); 
      res.render("index.ejs", { songs: result }); 
    } 
  ); 
}); 
+app.get("/login", function (req, res) { 
  res.sendFile(path.join(__dirname + "/login.html")); 
}); 
 
app.post("/login", function (req, res) { 
  var username = req.body.username; 
  var password = req.body.password; 
  con.query( 
    "SELECT * FROM authuser WHERE username = ? AND password = ?", 
    [username, password], 
    function (err, result) { 
      if (err) throw err; 
      if (result.length > 0) { 
        res.redirect("/home"); 
      } else { 
        res.redirect("/login"); 
      } 
    } 
  ); 
}); 
 
app.get("/signup", function (req, res) { 
  res.sendFile(path.join(__dirname + "/signup.html")); 
}); 
 
app.post("/signup", function (req, res) { 
  var username = req.body.username; 
  var password = req.body.password; 
  con.query( 
    "INSERT INTO authuser (username, password) VALUES (?, ?)", 
    [username, password], 
    function (err, result) { 
      if (err) throw err; 
      res.redirect("/login"); 
    } 
  ); 
}); 
 
app.get("/songs", function (req, res) { 
  con.query(`SELECT * FROM songs`, function (err, result, fields) { 
    if (err) throw err; 
    console.log(result); 
    res.render("index.ejs", { songs: result }); 
  }); 
}); 
 
app.post("/songs", function (req, res) { 
  var keyword = req.body.searchkey; 
  console.log(keyword); 
  con.query( 
    `SELECT * FROM songs WHERE name LIKE '%${keyword}%'`, 
    function (err, result, fields) { 
      if (err) throw err; 
      console.log(result); 
      res.render("index.ejs", { songs: result }); 
    } 
  ); 
}); 
 
app.listen(port, function () { 
  console.log("Example app listening on port 3000!"); 
  console.log("http://localhost:" + port); 
}); 
 
 s
