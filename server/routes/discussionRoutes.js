const express= require("express");
const { getComments, storeComments, reportComment, deleteComment} = require("../controllers/discussionController");

const routes = express.Router();

//_id
routes.get("/comments/:_id", getComments);

//sender message
routes.post("/comment", storeComments);

routes.post("/report", reportComment);

routes.delete("/comment/:_id/:userId", deleteComment);

module.exports = routes;