async function editBlogHandler(event) {
  event.preventDefault();

  const id = document.getElementById("blogpost_id").value;
  const blog_title = document.getElementById("blog_title").value.trim();
  const blog_text = document.getElementById("blog_text").value.trim();

  console.log(id, blog_title, blog_text);

  if (!blog_title || !blog_text) {
    return alert("Please complete both title and text fields");
  }

  const postBlog = await fetch("/blogs/edit", {
    method: "POST",
    body: JSON.stringify({ id, blog_title, blog_text }),
    headers: { "Content-Type": "application/json" },
  });

  if (postBlog.ok) {
    document.location.replace("/users/dashboard");
  } else {
    alert("Blog not updated. Please try again later.");
    return;
  }
}

document
  .querySelector(".edit-blog-form")
  .addEventListener("submit", editBlogHandler);
