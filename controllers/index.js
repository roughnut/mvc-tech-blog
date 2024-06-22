const router = require('express').Router();

const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const userRoutes = require('./users');
const blogRoutes = require('./blogs');

router.use('/', homeRoutes);
router.use('/users', userRoutes);
router.use('/api', apiRoutes);
router.use('/blogs', blogRoutes);

module.exports = router;