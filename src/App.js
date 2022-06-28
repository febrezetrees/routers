import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
// Above: imported Components will be the Components that stay on the page, even when the others change. They have dedicated <html> structure tags
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
//Above Components to be routed to/from as part of the main SPA
import Missing from './Missing';
//Above Component to route to when a 404 'Not Found' error


import { /*BrowserRouter as Router,*/ Routes, Route, useNavigate } from 'react-router-dom';
//Above updated for v6 react-router-dom (Cf. v5) changing Switch>Routes and component>element 
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 2,
      title: "My 2nd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 3,
      title: "My 3rd Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 11:17:36 AM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur expedita, assumenda similique non optio! Modi nesciunt excepturi corrupti atque blanditiis quo nobis, non optio quae possimus illum exercitationem ipsa!"
    }
  ])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const filteredResults = posts.filter((post) => // No {} means can only put one expression to the right, possibly connected with && or ||
        (((post.body).toLowerCase()).includes(search.toLowerCase()))
        || ((post.title).toLowerCase()).includes(search.toLowerCase()) // || = returns first truthy. &&= returns first falsy. 
        //If either one has something we want, will return to the filtered array 
      );
      setSearchResults(filteredResults.reverse()) //.reverse method to reverse array so first becomes last and ditto 
    }, [posts, search])
  
    const handleSubmit = (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1; //true gets id of last current post the adds id for new post w/ +1. False returns new id of 1
      const datetime = format(new Date(), 'MMM dd, yyyy pp');
      const newPost = { id, title: postTitle, datetime, body: postBody };
      const allPosts = [...posts, newPost];
      setPosts(allPosts);
      setPostTitle(''); //resets postTitle state for next one
      setPostBody(''); //resets postBody state for next one
      navigate('/');
    }

    const handleDelete = (id) => {
      const postsList = posts.filter((post) => post.id !== id); //filters out the post.id that is true, from the new returned array
      setPosts(postsList); //set true state without targeted id
      navigate('/');
  }
  
    return (
    <div className = "App">
      
        <Header title="RouterTitle" />
        <Nav 
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route path = "/" element = {<Home posts={searchResults} />} />
          <Route path = "/post" element = {
            <NewPost 
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />} 
          />
          <Route path = "/post/:id" element = {<PostPage posts={posts} handleDelete={handleDelete}/>} />
          <Route path = "/about" element = {<About />} />
          <Route path = "*" element = {<Missing />} />
        </Routes>
        <Footer />
      
    </div>
  );
}

export default App;
