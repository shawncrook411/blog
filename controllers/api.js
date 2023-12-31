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

        const comments = await Comment.findAll({
            where: { user_id: req.session.user_id },
            include: [{ model: User}, { model: BlogPost }]
        })

        commentData = comments.map((data) => 
            data.get({ plain: true}))
        
        res.render('dashboard', {
            blogsData,
            commentData,
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
        
        const comment = await Comment.findAll({
            where: { post_id: req.params.id },
            include: [{ model: User}, { model: BlogPost }]
        })
        commentData = comment.map((data) =>
            data.get({ plain: true}))

        res.render('blogpost', {
            blogData,
            commentData,
            loggedIn: req.session.loggedIn
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/myBlog/:id', async (req, res) => {
    try{
        const blog = await BlogPost.findByPk(req.params.id)
        
        blogData = blog.get({ plain: true})

        res.render('myPost', {
            blogData,
            loggedIn: req.session.loggedIn
        })        
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

router.get('/myComment/:id', async (req, res) => {
    try{
        const comment = await Comment.findByPk(req.params.id)
        
        commentData = comment.get({ plain: true})

        res.render('myComment', {
            commentData,
            loggedIn: req.session.loggedIn
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

router.post('/newPost', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login')
            return
        }

        BlogPost.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        }).then((newBlog) => {
            res.status(200).json(newBlog)
        })

    } catch (err) {
        console.log(err)
        res.status(500).json(err)
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

router.put('/myBlog/:id/updatePost', (req, res) => {
    BlogPost.update(
        {
            title: req.body.title,
            text: req.body.text,
        },
        {
            where: { id: req.params.id },
        }
    )
    .then((updatedPost) => {
        res.json(updatedPost)
    })
})

router.put('/myComment/:id/updateComment', (req, res) => {
    Comment.update(
        {
            title: req.body.title,
            text: req.body.text,
        },
        {
            where: { id: req.params.id },
        }
    )
    .then((updatedComment) => {
        res.json(updatedComment)
    })
})

router.delete(`/myBlog/:id/deletePost`, (req, res) => {    
    BlogPost.destroy({
            where: { id: req.params.id },
        },
    )
    .then((deletePost) => {
        res.json(deletePost)
    })
})

router.delete(`/myComment/:id/deleteComment`, (req, res) => {    
    Comment.destroy({
            where: { id: req.params.id },
        },
    )
    .then((deletedComment) => {
        res.json(deletedComment)
    })
})


module.exports = router