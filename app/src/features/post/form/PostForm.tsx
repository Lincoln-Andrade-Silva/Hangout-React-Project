import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Header, Icon, Segment } from "semantic-ui-react";
import { v4 as uuid } from 'uuid';
import * as Yup from 'yup';
import MyDateInput from '../../../app/common/form/components/MyDateInput';
import MySelectInput from '../../../app/common/form/components/MySelectInput';
import MyTextAreaInput from '../../../app/common/form/components/MyTextAreaInput';
import MyTextInput from '../../../app/common/form/components/MyTextInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { IPost, PostFormValues } from '../../../app/models/IPost';
import { useStore } from "../../../app/stores/store";

export default observer(function PostForm() {

    const navigate = useNavigate();
    const { postStore } = useStore();
    const { id } = useParams<{ id: string }>();
    const { createPost, editPost, loadPost, loadingInitial } = postStore;
    const [post, setPost] = useState<PostFormValues>(new PostFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required(),
        description: Yup.string().required(),
        category: Yup.string().required(),
        date: Yup.string().required(),
        city: Yup.string().required(),
        venue: Yup.string().required()
    })

    function handleFormSubmit(post: PostFormValues) {
        if (!post.id) {
            let newPost = {
                ...post,
                id: uuid()
            };
            createPost(newPost as IPost).then(() => navigate(`/post/${newPost.id}`))
        } else {
            editPost(post as IPost).then(() => navigate(`/post/${post.id}`))
        }
    }

    useEffect(() => {
        if (id) loadPost(id).then(post => setPost(new PostFormValues(post)))
    }, [id, loadPost]);

    if (loadingInitial) return <LoadingComponent content='Loading form..' />

    return (
        <Segment clearing style={{ marginTop: 100, marginLeft: 350, marginRight: 350 }}>
            <Header style={{ marginBottom: 15, paddingLeft: 45, paddingTop: 20, fontSize: 18, display: 'flex' }}>
                {id ?
                    <Icon name='edit outline' style={{ fontSize: 22, marginLeft: 5 }} /> :
                    <Icon name='plus square outline' style={{ fontSize: 25 }} />}

                {id ? <span>Edit Post</span> : <span>Create Post</span>}
            </Header>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={post}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput placeholder='Title' name='title' />
                        <MyTextAreaInput rows={1} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            placeholderText='Date'
                            name='date'
                            showTimeSelect
                            timeCaption="time"
                            dateFormat={'MMMM, d ,yyyy  h: mm aa'}
                        />

                        <Header style={{ marginBottom: 15, paddingLeft: 50, fontSize: 18 }} content="Location Details" />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Submit'
                            size='tiny'
                            style={{ marginTop: 20, marginLeft: 10, marginRight: 10, width: 110 }} />
                        <Button
                            as={Link} to='/dashboard'
                            floated='right'
                            type='button'
                            content='Cancel'
                            size='tiny'
                            style={{ marginTop: 20, marginLeft: 10, marginRight: 10, width: 90 }} />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})