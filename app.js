const express = require("express");
const app = express();
const routes = require("./routes/routes");

const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");

// ====== Routes ======
app.use("/", routes);

app.use(express.static(__dirname + '/views'));

app.listen(PORT, () => {
  console.log(`Express listening on port ${PORT}`);
});