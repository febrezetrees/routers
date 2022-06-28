import { useParams, Link } from 'react-router-dom';

const PostPage = ({ posts, handleDelete }) => {
    const { id } = useParams();
    const post = posts.find((post) => {
        return (
            (post.id).toString() === id //to match the string 'id')
        )
        })
    return (
        <main className="PostPage">
            <article className="post">
                {post && 
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>
                            Delete Post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post Not Found</h2>
                        <p>Well, that's a shame about Ray</p>
                        <p>
                            <Link to='/'>Go to homepage here</Link>
                        </p>
                    </>
                }
            </article>
    </main>
  )
}

export default PostPage