import Post from './Post';

const Feed = ({ posts }) => {
  return (
    <>
        {posts.map((post) => {
            return (
                <Post key={post.id} post={post} />
                //could change {} for () as () in arrow functionss are an implicit return
                )
        }
        )}
    </>
  )
}

export default Feed