const User = require('./user');
const BlogPosts = require('./blogposts');
const Comments = require('./comments');

User.hasMany(BlogPosts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

BlogPosts.belongsTo(User, {
    foreignKey: 'user_id',
});

User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
});

BlogPosts.hasMany(Comments, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
});

Comments.belongsTo(BlogPosts, {
    foreignKey: 'blogpost_id',
});

module.exports = { User, BlogPosts, Comments };