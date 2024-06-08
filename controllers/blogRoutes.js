const router = require('express').Router();

router.get('/', async (req, res) => {
    res.render('blogpage');
});

module.exports = router;