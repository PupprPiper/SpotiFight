
const router = require('express').Router();
const userRouter = require('../components/User/userRouter');
const friendsRouter = require('../components/Friends/friendsRouter')
//to add the rest later

router.use('/users', userRouter);
router.use('/friends', friendsRouter);
// router.use('/songs', songRouter);
// router.use('/history', historyRouter);
// router.use('/leaderboard', leaderboardRouter);





module.exports = router;