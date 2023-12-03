const User = require('./user')
const BlogPost = require('./blogpost')
const Comment = require('./comment')


BlogPost.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})    

User.hasMany(BlogPost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Comment.belongsTo(BlogPost, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
})    

BlogPost.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
})    

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})


module.exports = { BlogPost, User, Comment }