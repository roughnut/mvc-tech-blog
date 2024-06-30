const router = require("express").Router();
const { User, BlogPosts, Comments } = require("../../models");
const { format } = require("date-fns");

// new blog form
router.get("/new", (req, res) => {
  if (!req.session.logged_in) {
    res.render("login");
    return;
  }

  try {
    res.render("new-blog", {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.get("/edit/:id", async (req, res) => {
  if (!req.session.logged_in) {
    res.render("login");
    return;
  }

  try {
    const postToEdit = await BlogPosts.findByPk(req.params.id);
    const post = postToEdit.get({plain:true});

    console.log(post.id);

    res.render("edit-blog", {
      post, 
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
      username: req.session.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

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
            attributes: [
              "comment_text",
              "comment_date",
              "user_id",
              "blogpost_id",
            ],
            include: [
              {
                model: User,
                attributes: ["username"],
              },
            ],
          },
        ],
      });

      const post = postData.get({ plain: true });
      post.blog_date = format(post.blog_date, "d MMMM, yyyy");
      post.comments.forEach((comment) => {
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


// new comment
router.post("/comment", async (req, res) => {
  if (!req.session.logged_in) {
    return res.render("login");
  }

  console.log(req.body);
  try {
    const newComment = await Comments.create({
      comment_text: req.body.comment_text,
      blogpost_id: req.body.blogpost_id,
      user_id: req.session.user_id,
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/new", async (req, res) => {
  if (!req.session.logged_in) {
    return res.render("login");
  }

  try {
      console.log(req.body, req.session.user_id);
      const newBlog = await BlogPosts.create({
        ...req.body,
        user_id: req.session.user_id
      });

      res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

router.post("/edit", async (req, res) => {
  console.log(req.body);
  const {id, blog_title, blog_text} = req.body;
  try {
    const editedBlog = await BlogPosts.update({
      blog_title,
      blog_text
    },
  {
    where: {
      id: id
    }
  });
    res.status(201).json(editedBlog );
  } catch (error) {
        console.error(error);
        res.status(500).json(error);
  }
})

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    const deleteBlog = await BlogPosts.destroy({
      where: {id: req.params.id}
    });
    if (deleteBlog) {
      res.status(204).end();
    } else {
      res.status(404).json({message: "Blog not found"});
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
})

module.exports = router;
