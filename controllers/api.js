const router = require('express').Router()
const { BlogPost, User } = require('../models/index')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const blogs = await BlogPost.findAll({
            include: [{ model: User, attributes: []}]
        })       

        blogsData = blogs.map((blog) => 
            blog.get({ plain: true}))
        
        res.render('homepage', {
            blogsData,
            loggedIn: req.session.loggedIn,
        })
    } catch(err) {}
})



router.get('/login', async (req, res) => {
    try{
        res.render('login', {
            loggedIn: req.session.loggedIn,
        })
    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/signup', async (req, res) => {
    try{
        res.render('signup', {
            loggedIn: req.session.loggedIn
        })
    } catch(err) {}
})

router.get('/dashboard', async (req, res) => {
    try{
        console.log(req.session)
        const blogs = await BlogPost.findAll({
            where: { username: req.session.username },
            include: [{ model: User, attributes: []}]
        })       

        blogsData = blogs.map((blog) => 
            blog.get({ plain: true}))
        
        res.render('dashboard', {
            blogsData,
            loggedIn: req.session.loggedIn,
        })
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Dev Test Route
router.get('/dashboardTest' , async (req, res) => {
    try{
        const blogData = await BlogPost.findAll({
            include: [{ model: User, attributes: []}]
        })

        res.json(blogData).status(200)
    } catch (err) {
        console.log (err)
        res.status(500).json(err)
    }
})

//Dev Test Route
router.get('/users', async (req, res) => {
    try{
        const userData = await User.findAll({
            include: [{ model: BlogPost, attributes: []}]
        })

        res.json(userData).status(200)
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
       const username = req.body.username
       const password = req.body.password

        const userData = await User.findOne({ where: { username: username }})
        if (!userData) {
            res.status(404).json({ message: 'Login Failure'})
            return
        }

        const validPassword = await bcrypt.compare(
            password,
            userData.password
        )

        if(!validPassword) {
            res.status(400).json({ message: 'Login Failure'})
            return
        }

        req.session.save( () => {
            req.session.loggedIn = true
            req.username = username
            res.status(200).json({ message: 'Login successful' })
        })

    } catch(err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.post('/logout', async (req, res) => {    
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }    
})

module.exports = router