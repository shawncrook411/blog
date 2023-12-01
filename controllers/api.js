const router = require('express').Router()

router.get('/', async (req, res) => {
    try {
        res.render('homepage')
    } catch(err) {}
})

router.get('/login', async (req, res) => {
    try{
        res.render('login')
    } catch(err) {}
})


module.exports = router