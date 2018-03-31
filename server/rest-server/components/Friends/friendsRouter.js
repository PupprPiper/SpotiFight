const express = require("express");

const friendsController = require("./friendsController");
const router = express.Router();

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
  } else {
    res.sendStatus(403);
  }
};

router.get("/", (req, res) => {
  res.send("you have reached friends");
});

router.route("/requestFriend").post(friendsController.requestFriend);

router
  .route("/fetchAllFriends/:user_id")
  .get(friendsController.fetchAllFriends);

  router
  .route("/fetchAllPendingFriends/:user_id")
  .get(friendsController.fetchAllPendingFriends);

router
  .route("/deleteFriend/:user_id/:friend_id")
  .delete(friendsController.deleteFriend);

router.route("/acceptFriend").put(friendsController.acceptFriend);

module.exports = router;
