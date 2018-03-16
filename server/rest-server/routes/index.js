
const router = require('express').Router();
const userRouter = require('../components/User/userRouter')
//to add the rest later

router.use('/users', userRouter);
router.use('/songs', songRouter);
router.use('/history', historyRouter);
router.use('/leaderboard', leaderboardRouter);





module.exports = router;