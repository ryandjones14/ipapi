const express = require("express");
const routes = express.Router();
const dbo = require("../dbConn");
const utils = require("../utils");

const BREWERIES = "breweries";

// get brewery by id
routes.route("/brewery/id").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  var id = req.body.id;
  const query = { id };

  console.log(id)

  dbConnect
    .collection(BREWERIES)
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// get brewery by name
routes.route("/brewery/name").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  var name = req.body.name;
  const regex = new RegExp(utils.escapeRegex(name), 'gi');
  const query = { name: regex };

  dbConnect
    .collection(BREWERIES)
    .find(query)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

routes.route("/brewery/search").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  var text = req.body.text;
  const regex = new RegExp(utils.escapeRegex(text), 'gi');
  const query = {
    $or: [
      { "name": { "$in": [regex] } },
      { "state": { "$in": [regex] } },
      { "city": { "$in": [regex] } },
    ]
  };

  dbConnect
    .collection(BREWERIES)
    .find(query)
    .toArray((err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// get all breweries
routes.route("/brewery").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection(BREWERIES)
    .find({})
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

module.exports = routes;
