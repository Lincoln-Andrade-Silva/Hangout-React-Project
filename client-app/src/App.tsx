import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Header, List } from 'semantic-ui-react';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/Post')
      .then(response => {
        setPosts(response.data)
      })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Sunflower' />
      
      <List>
        {posts.map((post : any) => (
          <List.Item key={post.id}>
            {post.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default App;
