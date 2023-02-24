import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Form } from "react-router-dom";
import { Button, Header, Image, Label } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/components/MyTextInput";
import { useStore } from "../../app/stores/store";
import RegisterForm from "./RegisterForm";

export default observer(function LoginForm() {
    const { userStore, modalStore } = useStore();

    return (
        <Formik
            initialValues={{ email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.login(values).catch(error =>
                setErrors({ error: 'Invalid email or password' }))}
            validationSchema={Yup.object({
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (

                <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' color="black" textAlign="center" style={{ marginBottom: 30}}>
                        <Image src='/assets/logo.png' alt='logo'
                            style={{ marginBottom: 10, width: 80, height: 80, marginTop: 2 }} />
                        <br />
                        Login in Sunflower
                    </Header>
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <Header align='center'>
                        <ErrorMessage
                            name="error" render={() =>
                                <Label
                                    size="medium"
                                    style={{ marginTop: 0.5, marginBottom: 0.5, textAlign: 'center', width: '80%' }}
                                    basic color="red"
                                    content={errors.error}
                                />}
                        />
                    </Header>
                    <Header textAlign="center"  style={{ margin: 9 }}>
                        <Button
                            style={{ marginTop: '3vh' }}
                            loading={isSubmitting}
                            positive
                            disabled={!isValid || !dirty || isSubmitting}
                            content='Login'
                            type="submit"
                            color="yellow"
                            size="small"
                            fluid
                        />

                        <Header style={{ margin: 10, cursor: 'pointer' }}
                            as='h5'
                            textAlign="center"
                            content='Forget your Password'
                            color="yellow"
                        />

                        <Button
                            onClick={() => modalStore.openModal(<RegisterForm />)}
                            content=' New Account '
                            size="small"
                        />
                    </Header>
                </Form>
            )}
        </ Formik>
    )
})