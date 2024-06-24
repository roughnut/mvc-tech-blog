async function newBlogHandler (event) {
    event.preventDefault();

    const blog_title = document.getElementById("blog_title").value.trim();
    const blog_text = document.getElementById("blog_text").value.trim();

    console.log(blog_title, blog_text);

    if (!blog_title || !blog_text) {
        return alert("Please complete both title and text fields");
    }

    const postBlog = await fetch("/blogs/new", {
        method: "POST",
        body: JSON.stringify({blog_title, blog_text}),
        headers: {"Content-Type": "application/json"},
});
    
if (postBlog.ok) {
    document.location.replace("/users/dashboard");
} else {
    alert("Blog not posted. Please try again later.")
    return;
}
}


document
.querySelector(".new-blog-form")
.addEventListener("submit", newBlogHandler);