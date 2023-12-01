const router = require('express').Router()
const { BlogPost, User } = require('../models/index')

router.get('/', async (req, res) => {
    try {
        let loggedIn = true
        res.render('homepage'), {
            loggedIn,
        }
    } catch(err) {}
})



router.get('/login', async (req, res) => {
    try{
        let loggedIn = false
        res.render('login', {
            loggedIn,
        })
    } catch(err) {}
})

router.get('/signup', async (req, res) => {
    try{
        let loggedIn = false
        res.render('signup', {
            loggedIn,
        })
    } catch(err) {}
})


router.get('/dashboard', async (req, res) => {
    try{
        let loggedIn = true
        const blogs = await BlogPost.findAll({
            include: [{ model: User, attributes: []}]
        })       
        
        res.render('dashboard', {
            blogs,
            // loggedIn: req.session.loggedIn
            loggedIn,
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router