async function handleDeleteBlog (event) {
    event.preventDefault();

    const blogToDelete = event.target.getAttribute("data-id");

    if (!blogToDelete) {
        return alert("Can't delete blog (not found)");
    }

    const deleteBlog = await fetch(`/blogs/delete/${blogToDelete}`, {
        method: "DELETE"
    });

    if (deleteBlog.ok) {
        alert("Blog deleted.");
        window.location.reload();
    } else {
        return alert("Can't delete blog right now, sorry.");
    }
}

document
.getElementById("delete-blog")
.addEventListener("click", handleDeleteBlog);
