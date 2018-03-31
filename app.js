const express = require("express");
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// ====== Routes ======
// User login page
let users = require('./routes/users');
app.use('/users', users);

// Stories page
let stories = require('./routes/stories');
app.use('/stories', stories);

// Home page
let main = require('./routes/main');
app.use('/', main);


app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});
