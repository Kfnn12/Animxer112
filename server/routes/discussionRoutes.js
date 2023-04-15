const express= require("express");
const { getComments, storeComments} = require("../controllers/discussionController");

const routes = express.Router();

//_id
routes.get("/comments/:_id", getComments);

//sender message
routes.post("/comment", storeComments);

module.exports = routes;