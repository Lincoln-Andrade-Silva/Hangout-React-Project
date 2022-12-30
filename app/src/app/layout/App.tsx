import React, { useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import PostDashboard from '../../features/post/dashboard/PostDashboard';
import { IPost } from '../models/IPost';
import NavBar from './NavBar';
import service from '../api/service';
import LoadingComponent from './LoadingComponent';
import { v4 as uuid } from 'uuid';

function App() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [selectedPost, setSelectedPost] = useState<IPost | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    if (post.id) {
      service.post.update(post).finally(() => {
        setPosts([...posts.filter(x => x.id !== post.id), post]);
        setEditMode(false);
        setSubmitting(false);
        setSelectedPost(post);
      })
    } else {
      post.id = uuid();
      service.post.create(post).finally(() => {
        setPosts([...posts, post]);
        setEditMode(false);
        setSubmitting(false);
        setSelectedPost(post);
      })
    }
  }

  function handleDeletePost(id: string) {
    setSubmitting(true);
    if (id) {
      service.post.delete(id).then(() => {
        setPosts([...posts.filter(x => x.id !== id)]);
        setSubmitting(false);
        setSelectedPost(undefined);
      })
    }
  }

  useEffect(() => {
    service.post.list().then(response => {
      let posts: IPost[] = [];
      response.forEach((post: IPost) => {
        post.date = post.date.split('T')[0];
        posts.push(post);
      })
      setPosts(posts);
      setLoading(false);
    })
  }, [])

  if (loading) return <LoadingComponent content='Loading app..' />

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
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App;
