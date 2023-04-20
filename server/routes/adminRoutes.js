const express= require("express");
const { getAllComment, getAllUser, deleteComment, deleteUser } = require("../controllers/adminController");

const routes = express.Router();

routes.get("/comments", getAllComment);

routes.get("/users", getAllUser);

routes.delete("/comment/:key/:_id", deleteComment);

routes.delete("/user/:key/:_id", deleteUser);

module.exports = routes;