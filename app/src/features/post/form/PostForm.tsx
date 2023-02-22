import { observer } from 'mobx-react-lite';
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from "../../../app/stores/store";

export default observer(function PostForm() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { postStore } = useStore();
    const [target, setTarget] = useState('');
    const { createPost, editPost, loading, loadPost, loadingInitial, deletePost } = postStore;
    const [post, setPost] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    function handlePostDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name)
        deletePost(id);
    }

    useEffect(() => {
        if (id) loadPost(id).then(post => setPost(post!));
    }, [id, loadPost])

    function handleSubmit() {
        if (!post.id) {
            post.id = uuid();
            createPost(post).then(() => navigate(`/post/${post.id}`))
        } else {
            editPost(post).then(() => navigate(`/post/${post.id}`))
        }
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    }

    if (loadingInitial) return <LoadingComponent content='Loading form..' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={post.title} onChange={handleOnChange} />
                <Form.TextArea placeholder='Description' name='description' value={post.description} onChange={handleOnChange} />
                <Form.Input placeholder='Category' name='category' value={post.category} onChange={handleOnChange} />
                <Form.Input type="date" placeholder='Date' name='date' value={post.date} onChange={handleOnChange} />
                <Form.Input placeholder='City' name='city' value={post.city} onChange={handleOnChange} />
                <Form.Input placeholder='Venue' name='venue' value={post.venue} onChange={handleOnChange} />

                <Button loading={loading} onClick={() => handleSubmit()} floated="right" type="submit" color="green" content="Save" />
                {id && <Button
                    name={post.id}
                    loading={loading && target === post.id}
                    onClick={(e) => handlePostDelete(e, post.id)}
                    floated="right"
                    content='Delete' color='red'
                />}
                <Button as={Link} to={`/dashboard`} floated="right" content='Cancel' />
            </Form>
        </Segment>
    )
})