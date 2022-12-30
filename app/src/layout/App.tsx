import axios from 'axios';
import logo from './logo.svg';
import React, { useEffect, useState } from 'react';
import { Header, List } from 'semantic-ui-react';
import { IPost } from '../models/IPost';

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
      <Header as='h2' icon='users' content='Sunflower' />
      
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
