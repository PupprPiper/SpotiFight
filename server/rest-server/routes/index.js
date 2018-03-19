
const router = require('express').Router();
const userRouter = require('../components/User/userRouter');
const friendsRouter = require('../components/Friends/friendsRouter')
const spotifyRouter = require('../components/Spotify/spotifyRouter')
//to add the rest later

router.use('/users', userRouter);
router.use('/friends', friendsRouter);
// router.use('/songs', songRouter);
// router.use('/history', historyRouter);
// router.use('/leaderboard', leaderboardRouter);

router.use('/spotify', spotifyRouter);





module.exports = router;