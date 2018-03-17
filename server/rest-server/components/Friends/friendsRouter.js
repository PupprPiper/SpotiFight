import express from 'express';

import { friendsController } from './friendsControllers';

const router = express.Router();

router.route('/addFriend')
  .post(friendsController);

router.route('/fetchAllFriends/:user_id')
  .get(friendController);

router.route('/deleteFriend/:user_id/:friend_id')
  .delete(friendController);

export default router;