const router = require("express").Router();
// const withAuth = require("../utils/auth");
const { BlogPosts, User, Comments } = require("../models");

// no login required to see the landing page
router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/users/dashboard");
    return;
  }

  try {
    const blogData = await BlogPosts.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      username: req.session.username,
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
