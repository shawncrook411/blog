const User = require('./user')
const BlogPost = require('./blogpost')


BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
})    

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


module.exports = { BlogPost, User }