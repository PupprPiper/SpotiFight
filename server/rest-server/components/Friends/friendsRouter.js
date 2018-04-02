// import express from 'express';
const express = require('express');

// import { friendsController } from './friendsControllers';
const friendsController = require('./friendsController');
const router = express.Router();

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
  } else {
    res.sendStatus(403);
  }
};

// router.get('/', (req, res) => {
//   res.send('you have reached friends');
// });

router.route('/addFriend').post(friendsController.addFriend);

router
  .route('/fetchAllFriends/:user_id')
  .get(friendsController.fetchAllFriends);

router
  .route('/deleteFriend/:user_id/:friend_id')
  .delete(friendsController.deleteFriend);

module.exports = router;
