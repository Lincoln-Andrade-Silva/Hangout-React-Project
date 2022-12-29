import { Header, List } from 'semantic-ui-react';
import axios from 'axios';
import { useEffect, useState } from 'react'


function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/Post')
      .then(response => {
        setPosts(response.data)
      })
  }, [])

  return (
    <div className="App">
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

export default App
