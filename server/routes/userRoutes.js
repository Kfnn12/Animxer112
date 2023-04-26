const express = require("express");
const {addUser, loginUser, verify, changePassword, toggleBookmark, getBookmarks, changeName, changeProfile, getHistory, addHistory, clearHistory, getUser, removeHistory} = require("../controllers/userController");
const validateEmail = require("../middleware");

const route = express.Router();

route.get("/bookmark/:_id", getBookmarks);
route.get("/history/:_id", getHistory);
route.get("/:_id", getUser);

route.post("/register", validateEmail, addUser);
route.post("/login", validateEmail, loginUser);
route.post("/bookmark", toggleBookmark);
route.post("/verify", verify);
route.post("/change/password", changePassword);
route.post("/change/profile", changeProfile);
route.post("/change/name", changeName);
route.post("/history", addHistory);

route.delete("/history/:_id", clearHistory);
route.delete("/single/history/:_id/:animeId", removeHistory);
module.exports = route;