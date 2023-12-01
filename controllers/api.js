const router = require('express').Router()
const { BlogPost, User } = require('../models/index')

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

router.get('/dashboard', async (req, res) => {
    try{
        const blogs = await BlogPost.findAll({
            include: [{ model: User, attributes: []}]
        })
        
        console.log(blogs)
        
        
        
        
        
        
        
        res.render('dashboard', {
            blogs,
            // loggedIn: req.session.loggedIn
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router