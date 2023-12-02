const User = require('./user')
const BlogPost = require('./blogpost')
const Comment = require('./comment')


BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
})    

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
})    

BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
})    

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})


module.exports = { BlogPost, User, Comment }