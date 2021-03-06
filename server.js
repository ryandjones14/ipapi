require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const dbo = require("./dbConn");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(require("./router/beer"));
app.use(require("./router/brewery"));

// Global error handling
app.use(function (err, _req, res) {
  console.error(err.stack);
  res.json('Something broke!');
});

// perform a database connection when the server starts
dbo.connectToServer(function (err) {
  if (err) {
    console.error(err);
    process.exit();
  }

  // start the Express server
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });
});