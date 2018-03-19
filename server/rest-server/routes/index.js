
const router = require('express').Router();
const userRouter = require('../components/User/userRouter');
const authRouter = require('./../components/Auth/authRouter')
//to add the rest later

// user route
router.use('/users', userRouter);
// router.use('/songs', songRouter);
// router.use('/history', historyRouter);
// router.use('/leaderboard', leaderboardRouter);

// auth route
// router.use('/auth', authRouter);




module.exports = router;