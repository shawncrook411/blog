const path = require('path')

const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const routes = require('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

const cookieSession = {
    secret: '0',
    cooke: {
        maxAge: 3
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(cookieSession))

const hbs = exphbs.create({ helpers })

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(routes)

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now Listening on PORT: ${PORT}`))
})

//TO DO

//When seeing a post, show post creater's username
//When seeing a comment, show the comment creater's username
//Ensure that dashboard loads properly
//check if new blog post works
//Add delete option to dashboard
//Add update option to dashboard
//check idle time
//Ensure consistant styling / sizing