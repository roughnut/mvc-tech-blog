const router = require("express").Router();
// const withAuth = require("../utils/auth");
const { BlogPosts, User, Comments } = require("../models");
const { format } = require('date-fns');

// no login required to see the landing page
router.get("/", async (req, res) => {

  try {
    const blogData = await BlogPosts.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "id"],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));
    posts.forEach(post => {
      post.blog_date = format(post.blog_date, 'd MMMM, yyyy');
    })
    
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
      user_id: req.session.user_id,
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json(error);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/users/dashboard");
    return;
  } else {
    res.render("login");
  }
});

router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/users/dashboard");
    return;
  } else {
    res.render("signup");
  }
});

module.exports = router;
