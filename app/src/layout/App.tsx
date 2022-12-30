import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import PostDashboard from '../features/post/dashboard/PostDashboard';
import { IPost } from '../models/IPost';
import NavBar from './NavBar';
import { v4 as uuid } from 'uuid';

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  function handleSelectPost(id: string) {
    setSelectedPost(posts.find(x => x.id === id))
  }

  function handleCancelSelectPost() {
    setSelectedPost(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectPost(id) : handleCancelSelectPost();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrUpdatePost(post: IPost) {
    post.id
      ? setPosts([...posts.filter(x => x.id !== post.id), post])
      : setPosts([...posts, { ...post, id: uuid() }]);

    setEditMode(false);
    setSelectedPost(post);
  }

  function handleDeletePost(id: string) {
    setPosts([...posts.filter(x => x.id !== id)])
  }

  useEffect(() => {
    axios.get<IPost[]>('http://localhost:5000/Post')
      .then(response => {
        setPosts(response.data)
      })
  }, [])

  return (
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <PostDashboard
          posts={posts}
          selectedPost={selectedPost}
          selectPost={handleSelectPost}
          cancelSelectPost={handleCancelSelectPost}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrUpdatePost={handleCreateOrUpdatePost}
          deletePost={handleDeletePost}
        />
      </Container>
    </>
  )
}

export default App;
