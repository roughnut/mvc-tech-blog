const { BlogPosts } = require('../models');

const blogData = [
  {
    blog_title: 'The Art of DJing',
    blog_text: 'DJing is not just about choosing the right tracks. It is about creating a journey through music.',
    user_id: 1
  },
  {
    blog_title: 'JavaScript: The Ninja Language',
    blog_text: 'JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.',
    user_id: 2
  },
  {
    blog_title: 'Traveling: The Bug That Bites',
    blog_text: 'Traveling - it leaves you speechless, then turns you into a storyteller.',
    user_id: 3
  },
  {
    blog_title: 'Books: The Best Friends',
    blog_text: 'Books are the quietest and most constant of friends; they are the most accessible and wisest of counselors, and the most patient of teachers.',
    user_id: 4
  },
  {
    blog_title: 'Fitness: A Lifestyle With No Finish Line',
    blog_text: 'Fitness is not about being better than someone else. It\'s about being better than you used to be.',
    user_id: 5
  },
];

const seedBlogs = () => BlogPosts.bulkCreate(blogData);

module.exports = seedBlogs;