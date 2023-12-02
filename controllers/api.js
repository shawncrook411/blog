const router = require('express').Router()
const { BlogPost, User, Comment } = require('../models/index')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const blogs = await BlogPost.findAll({
            order: ['id'],
            include: [{ model: User }, { model: Comment }]
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
        if(!req.session.loggedIn)
        {
          res.redirect('/login')
          return  
        }

        const blogs = await BlogPost.findAll({
            order: ['id'],
            where: { user_id: req.session.user_id },
            include: [{ model: User}, { model: Comment }]
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

router.get('/blog/:id', async (req, res) => {
    try{
        const blog = await BlogPost.findAll({
            where: { id: req.params.id },
            include: [{ model: User}, { model: Comment }]
        })

        blogData = blog.map((post) =>
            post.get({ plain: true}))

        res.render('blogpost', {
            blogData,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Dev Test Route
router.get('/dashboardTest' , async (req, res) => {
    try{
        
        const blogs = await BlogPost.findAll({
            // where: { user_id: 'shawn' },
            include: [{ model: User }, { model: Comment }]
        })       

        blogsData = blogs.map((blog) => 
            blog.get({ plain: true}))
        
        res.json(blogsData)
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Dev Test Route
router.get('/dashboardTestComment' , async (req, res) => {
    try{
        
        const blogs = await Comment.findAll({
            // where: { user_id: 'shawn' },
            include: [{ model: User },{ model: BlogPost }]
        })       

        blogsData = blogs.map((blog) => 
            blog.get({ plain: true}))
        
        res.json(blogsData)
        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})


//Dev Test Route
router.get('/users', async (req, res) => {
    try{
        const userData = await User.findAll({
            include: [{ model: BlogPost }, { model: Comment }],
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
            req.session.username = username
            req.session.user_id = userData.id
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

router.post('/createPost', async (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/login')
        return
    }
})

router.post('/blog/:id/createComment', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login')
            return
        }

        Comment.create({
            title: req.body.title,
            text: req.body.text,
            post_id: req.params.id,
            user_id: req.session.user_id,
        }).then((newComment) => {
            res.json(newComment).status(200)
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

module.exports = router