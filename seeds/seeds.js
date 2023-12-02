const { BlogPost, User, Comment } = require('../models/index')
const sequelize = require('../config/connection.js')


const seedDatabase = async () => {
    await sequelize.sync({ force: true })

    await User.bulkCreate([
        {
            username: 'test_user_1',
            password: 'test1234'
        },
        {
            username: 'test_user_2',
            password: 'test1234'
        },
        {
            username: 'test_user_3',
            password: 'test1234'
        },
    ])

    await BlogPost.bulkCreate([
        {
            user_id: '1',
            title: 'test_title_1',
            text: 'test text area number 1',
        },
        {
            user_id: '1',
            title: 'test_title_2',
            text: 'test text area number 2',
        },
        {
            user_id: '2',
            title: 'test_title_3',
            text: 'test text area number 3',
        },
        {
            user_id: '2',
            title: 'test_title_4',
            text: 'test text area number 4',
        },
        {
            user_id: '3',
            title: 'test_title_5',
            text: 'test text area number 5',
        },
    ])

    await Comment.bulkCreate([
        {
            post_id: '1',
            user_id: '3',
            title: 'test_title_1',
            text: 'test text area number 1',
        },
        {
            post_id: '1',
            user_id: '2',
            title: 'test_title_2',
            text: 'test text area number 2',
        },
        {
            post_id: '2',
            user_id: '3',
            title: 'test_title_3',
            text: 'test text area number 3',
        },
        {
            post_id: '2',
            user_id: '1',
            title: 'test_title_4',
            text: 'test text area number 4',
        },
        {
            post_id: '3',
            user_id: '1',
            title: 'test_title_5',
            text: 'test text area number 5',
        },
    ])

    process.exit(0)
}

seedDatabase()