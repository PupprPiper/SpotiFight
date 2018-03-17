// import express from 'express';
const express = require('express');

// import { friendsController } from './friendsControllers';
const friendsController = require('./friendsController')
const router = express.Router();

router.route('/addFriend')
  .post(friendsController.addFriend);

// router.route('/fetchAllFriends/:user_id')
//   .get(friendsController.fetchAllFriends);

// router.route('/deleteFriend/:user_id/:friend_id')
//   .delete(friendController.deleteFriend);

module.exports = router;