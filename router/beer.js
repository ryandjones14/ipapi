const express = require("express");
const routes = express.Router();
const dbo = require("../dbConn");
const { ObjectId } = require("mongodb");

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
  const query = { name };

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



// // This section will help you create a new record.
// routes.route("/listings/recordSwipe").post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const matchDocument = {
//     listing_id: req.body.id,
//     last_modified: new Date(),
//     session_id: req.body.session_id,
//     direction: req.body.direction
//   };

//   dbConnect
//     .collection("matches")
//     .insertOne(matchDocument, function (err, result) {
//       if (err) {
//         res.status(400).send("Error inserting matches!");
//       } else {
//         console.log(`Added a new match with id ${result.insertedId}`);
//         res.status(204).send();
//       }
//     });
// });

// // This section will help you update a record by id.
// routes.route("/listings/updateLike").post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const query = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1
//     }
//   };

//   dbConnect
//     .collection("listingsAndReviews")
//     .updateOne(query, updates, function (err, _result) {
//       if (err) {
//         res.status(400).send(`Error updating likes on listing with id ${query.id}!`);
//       } else {
//         console.log("1 document updated");
//       }
//     });
// });

// // This section will help you delete a record.
// routes.route("/listings/delete/:id").delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const query = { listing_id: req.body.id };

//   dbConnect
//     .collection("listingsAndReviews")
//     .deleteOne(query, function (err, _result) {
//       if (err) {
//         res.status(400).send(`Error deleting listing with id ${query.listing_id}!`);
//       } else {
//         console.log("1 document deleted");
//       }
//     });
// });

module.exports = routes;