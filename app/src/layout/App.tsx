import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
import { IPost } from '../models/IPost';
import NavBar from './NavBar';

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  
  useEffect(() => {
    axios.get<IPost[]>('http://localhost:5000/Post')
      .then(response => {
        setPosts(response.data)
      })
  }, [])

  return (
    <div>
      <NavBar />
      
      <List>
        {posts.map(post => (
          <List.Item key={post.id}>
            {post.title}
          </List.Item>
        ))}
      </List>
    </div>
  )
}

export default App;
