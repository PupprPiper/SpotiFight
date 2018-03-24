const router = require('express').Router();
const userRouter = require('../components/User/userRouter');
const friendsRouter = require('../components/Friends/friendsRouter');
const spotifyRouter = require('../components/Spotify/spotifyRouter');
const authRouter = require('./../components/Auth/authRouter');
//to add the rest later
// const passport = require('passport');


// user route
router.use('/users', userRouter);
router.use('/friends', friendsRouter);

router.post('/', (req, res) => {
 if (!!req.body) {
   console.log(req.body, 'here is my token');
 }

});

// router.use('/songs', songRouter);
// router.use('/history', historyRouter);
// router.use('/leaderboard', leaderboardRouter);

router.use('/spotify', spotifyRouter);

// auth route
router.use('/auth', authRouter);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/lobby');
});

module.exports = router;
