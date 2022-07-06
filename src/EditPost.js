import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";


const EditPost = ( { posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle }) => {
    const { id } = useParams(); //to get the destructured id attribute that will be pulled from the Route via useParams(), whcih is triggered by the <Link> within the PostPage component
    const post = posts.find((post) => (post.id).toString() === id) //need to use toString() to use ===

    useEffect(() => {
        if (post) {
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    }, [post, setEditTitle, setEditBody])
    return ( 
        //copied from the PostPage
        <main className="NewPost">
            {editTitle && 
                <>
                    <h2>Edit Post</h2>
                    <form className="newPostForm" onSubmit={(e) => e.preventDefault()}>
                    <label htmlFor="postTitle">Title:</label>
                    <input
                        id="postTitle"
                        type="text"
                        required
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                    />
                    <label htmlFor="postBody">Post:</label>
                    <textarea
                        id="postBody"
                        type="text"
                        required
                        value={editBody}
                        onChange = {(e) => setEditBody(e.target.value)}
                    />
                    <button type="submit" onClick={() => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>Well, that's a shame about Ray</p>
                    <p>
                        <Link to='/'>Go to homepage here</Link>
                    </p>
                </>
                }
        </main>
  )
}

export default EditPost