const express = require("express");
const routes = express.Router();
const dbo = require("../dbConn");
const utils = require("../utils");
const BEER = "beer";

// get beer by id
routes.route("/beer/id").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  var id = req.body.id;
  const query = { id };

  dbConnect
    .collection(BEER)
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// get beer by name
routes.route("/beer/name").get(async function (req, res) {
  const dbConnect = dbo.getDb();
  var name = req.body.name;
  const regex = new RegExp(utils.escapeRegex(name), 'gi');
  const query = { name: regex };

  dbConnect
    .collection(BEER)
    .findOne(query, (err, result) => {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

// get all beer
routes.route("/beer").get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection(BEER)
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
