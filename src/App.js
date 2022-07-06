import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
// Above: imported Components will be the Components that stay on the page, even when the others change. They have dedicated <html> structure tags
import Home from './Home';
import NewPost from './NewPost';
import EditPost from './EditPost';
import PostPage from './PostPage';
import About from './About';
//Above Components to be routed to/from as part of the main SPA
import Missing from './Missing';
//Above Component to route to when a 404 'Not Found' error

import { /*BrowserRouter as Router,*/ Routes, Route, useNavigate } from 'react-router-dom';
//Above updated for v6 react-router-dom (Cf. v5) changing Switch>Routes and component>element 
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';

function App() {
  const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState('');
    const [postBody, setPostBody] = useState('');
    const [editTitle, setEditTitle] = useState('');
    const [editBody, setEditBody] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await api.get('/posts'); //define API endpoint route - for json-server, the endpoint pathway is the relevant object name in the data/db.json folder, eg. "posts"
          //axios has benefit over fetch by automatically converting to json within
          //axios also has benefit of automatically catching responses not in the 200 range
          //if (response && response.data) {setPosts(response.data)} - no need to do this
          setPosts(response.data);
        } catch (err) {
          if (err.response) {   
            //Not in the 200 response range - below copied from axios documentation - to be adjusted based on what the backend API is actually sending
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
          } else {
            console.log(`Error: ${err.message}`) // from axios documentation. Here we didn't get a response at all or a 404. Thsi is the catch all
          }
        }
      }
    fetchPosts();
    }, [])

    useEffect(() => {
      const filteredResults = posts.filter((post) => // No {} means can only put one expression to the right, possibly connected with && or ||
        (((post.body).toLowerCase()).includes(search.toLowerCase()))
        || ((post.title).toLowerCase()).includes(search.toLowerCase()) // || = returns first truthy (or last value if no truthies). &&= returns first falsy (or last value if no falsies)
        //If either one has something we want, will return to the filtered array 
      );
      setSearchResults(filteredResults.reverse()) //.reverse method to reverse array so first becomes last and ditto 
    }, [posts, search])
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const id = posts.length ? posts[posts.length - 1].id + 1 : 1; //true gets id of last current post the adds id for new post w/ +1. False returns new id of 1
      const datetime = format(new Date(), 'MMM dd, yyyy pp');
      const newPost = { id, title: postTitle, datetime, body: postBody };
      try {
        const response = await api.post('/posts', newPost);
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostTitle(''); //resets postTitle state for next one
        setPostBody(''); //resets postBody state for next one
        navigate('/');
      } catch (err) {
        console.logy(`Error: ${err.message}`);
      }
    }

    const handleEdit = async (id) => {
      const datetime = format(new Date(), 'MMM dd, yyyy pp');
      const updatedPost = { id, title: editTitle, datetime, body: editBody };
      try {
        const response = await api.put(`/posts/${id}`, updatedPost); //alternative could be patch if we were updating specific fields, rather than replacing the entire post
        setPosts(posts.map((post) => post.id === id ? {...response.data} : post )); //where post.id matches to id passed in, ...response.dat (essentially the API-returned updatedPost) is passed in for that post. The ... converts array into object
        setEditTitle('');
        setEditBody('');
        navigate('/');
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
    }

    const handleDelete = async (id) => {
      try {
        await api.delete(`/posts/${id}`);
        const postsList = posts.filter((post) => post.id !== id); //filters out the post.id that is true, from the new returned array
        setPosts(postsList); //set true state without targeted id
        navigate('/');
      } catch (err) {
        console.log(`Error: ${err.message}`)
      }
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
          {/*The below route's notional :id is defined from the associated inbound <Link> element (see PostPage component)*/}
          <Route path = "/edit/:id" element = { 
            <EditPost 
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />} 
          />
          {/*The below route's notional :id is defined from the associated inbound <Link> element (see Post component)*/}
          <Route path = "/post/:id" element = {<PostPage posts={posts} handleDelete={handleDelete}/> } /> 
          <Route path = "/about" element = {<About />} />
          <Route path = "*" element = {<Missing />} />
        </Routes>
        <Footer />
      
    </div>
  );
}

export default App;
