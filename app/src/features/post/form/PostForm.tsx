import { observer } from 'mobx-react-lite';
import { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

export default observer(function PostForm() {

    const { postStore } = useStore();
    const { selectedPost, closeForm, createPost, editPost, loading } = postStore;

    const initialState = selectedPost ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [post, setPost] = useState(initialState);

    function handleSubmit() {
        post.id ? editPost(post) : createPost(post);
    }

    function handleOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setPost({ ...post, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' name='title' value={post.title} onChange={handleOnChange} />
                <Form.TextArea placeholder='Description' name='description' value={post.description} onChange={handleOnChange} />
                <Form.Input placeholder='Category' name='category' value={post.category} onChange={handleOnChange} />
                <Form.Input type="date" placeholder='Date' name='date' value={post.date} onChange={handleOnChange} />
                <Form.Input placeholder='City' name='city' value={post.city} onChange={handleOnChange} />
                <Form.Input placeholder='Venue' name='venue' value={post.venue} onChange={handleOnChange} />

                <Button loading={loading} floated="right" type="submit" color="green" content="Save" />
                <Button onClick={closeForm} floated="right" content='Cancel' />
            </Form>
        </Segment>
    )
})