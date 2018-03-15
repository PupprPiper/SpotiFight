const router = require('express').Router();
const userRouter = require('../components/User/userRouter')

router.use('/users', userRouter)


module.exports = router;