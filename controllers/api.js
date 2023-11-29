const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        res.render('blog')
    } catch(err) {}
})



module.exports = router