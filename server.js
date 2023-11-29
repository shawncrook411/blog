const path = require('path')

const express = require('express')
const session = require('express-sessions')
const exphbs = require('express-handlebars')

const routes = required('./controllers')
const helpers = require('./utils/helpers')

const sequelize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

const cookieSession = {
    secret: '0',
    resave: false,
    saveUninitialize: false,
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
    applisten(PORT, () => console.log(`Now Listening on PORT: ${PORT}`))
})