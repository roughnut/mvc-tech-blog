const router = require("express").Router();
const { User, BlogPosts, Comments } = require("../../models");
const { format } = require("date-fns");

// single blog route
router.get("/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.render("login");
  } else {
    try {
      const postData = await BlogPosts.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
          {
            model: Comments,
            attributes: ["comment_text", "comment_date", "user_id", "blogpost_id"],
            include: [
                {
                    model: User,
                    attributes: ["username"],
                }
            ],
          },
        ],
      });
      
      const post = postData.get({ plain: true });
      post.blog_date = format(post.blog_date, "d MMMM, yyyy");
      post.comments.forEach(comment => {
        comment.comment_date = format(comment.comment_date, "d MMMM, yyyy");
      });

      res.render("post", {
        post,
        logged_in: req.session.logged_in,
        user_id: req.session.user_id,
        username: req.session.username,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }
});

// new blog form
router.get("/new", (req, res) => {
  if (!req.session.logged_in) {
    res.render("login");
  } else {
    res.render("new-blog", {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username,
    });
  }
});

// new comment form
router.get("/comment/:id", async (req, res) => {
    if (!req.session.logged_in) {
        res.render("login");
    } else {
        
    }
})

module.exports = router;
