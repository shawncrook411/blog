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


router.get('/logout', async (req, res) => {
    try{

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/login', async (req, res) => {
    try{
        let loggedIn = false
        res.render('login', {
            loggedIn,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
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

router.post('/createAccount', async (req, res) => {
    try{
        const newUserName = req.body.username
        const newPassword = req.body.password

        const userData = await User.findOne({ where: { username: newUserName }})
        if (userData){
            res.status(409).json('Username already exists')
            return
        }

        await User.create({
            username: newUserName,
            password: newPassword
        }).then(
            (newUser) => {
                res.status(200).json(`New User Created with ID: ${newUser.id} and Username: ${newUser.username} `)
            }
        )

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})


router.post('/login', async (req, res) => {
    try{
       


    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router