const router = require("express").Router();
const { User, BlogPosts, Comments } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });

    if (!userData) {
      res.status(400).json({ message: "Incorrect login, please try again." });
      return;
    }
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: `Incorrect login, please try again.` });
      return;
    }

    req.session.save(() => {
      req.session.username = userData.username;
      req.session.logged_in = true;

      res.json({ message: `You're logging in!` });
    });
  } catch (error) {
    res.status(400).json(`Error: `, error);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await BlogPosts.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comments,
          attributes: ["comment_text", "comment_date"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));
    console.log(posts);

    res.render("dashboard", {
      posts,
      // not sure if I need these here? SURE DO!
      logged_in: req.session.logged_in,
      username: req.session.username,
    });
  } catch (error) {
    console.error("Something went wrong: ", error);
    res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
