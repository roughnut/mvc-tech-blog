const commentHandler = async (event) => {
    event.preventDefault();
    const comment_text = document.getElementById("comment-text").value.trim();
    const blogpost_id = document.getElementById("blogpost_id").value.trim();

    console.log(comment_text, blogpost_id);

    if (!comment_text) {
        alert("No comment sumbitted.")
        return;
    } 

        const postComment = await fetch(`/blogs/comment`, {
            method: "POST",
            body: JSON.stringify({comment_text, blogpost_id}),
            headers: {"Content-Type": "application/json"},
        });
    

        if(postComment.ok) {
            document.location.replace(`/blogs/${blogpost_id}`);
        } else {
            alert("Comment not posted. Please try again later.");
            return;
        }
    };


// Get comment form input from comment-form.handlebars
document
.querySelector(".comment-form")
.addEventListener("submit", commentHandler);