const BlogPost = require('./blogpost')
const User = require('./user')


User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
})    

module.exports = { BlogPost, User }