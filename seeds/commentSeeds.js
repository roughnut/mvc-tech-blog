const { Comments } = require('../models');

const commentData = [
  {
    comment_text: 'Great post, thanks for sharing!',
    user_id: 2,
    blogpost_id: 1
  },
  {
    comment_text: 'I found this very helpful, thank you.',
    user_id: 3,
    blogpost_id: 2
  },
  {
    comment_text: 'I disagree with your point about JavaScript, but appreciate the discussion.',
    user_id: 4,
    blogpost_id: 2
  },
  {
    comment_text: 'This is a fantastic resource for travelers, bookmarking this for later!',
    user_id: 5,
    blogpost_id: 3
  },
  {
    comment_text: 'I love this book too, great review!',
    user_id: 1,
    blogpost_id: 4
  },
];

const seedComments = () => Comments.bulkCreate(commentData);

module.exports = seedComments;