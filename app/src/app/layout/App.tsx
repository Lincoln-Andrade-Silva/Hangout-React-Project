import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import PostDashboard from '../../features/post/dashboard/PostDashboard';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import NavBar from './NavBar';

function App() {
  const { postStore } = useStore();

  useEffect(() => {
    postStore.listPosts();
  }, [postStore])

  if (postStore.loadingInitial) return <LoadingComponent content='Loading app..' />

  return (
    <>
      <NavBar />
      <Container style={{ marginTop: '7em' }}>
        <PostDashboard />
      </Container>
    </>
  )
}

export default observer(App);