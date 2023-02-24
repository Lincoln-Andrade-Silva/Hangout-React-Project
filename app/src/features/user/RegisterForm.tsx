import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header, Image } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/components/MyTextInput";
import { useStore } from "../../app/stores/store";
import ValidationErrors from "../errors/ValidationErrors";
import LoginForm from "./LoginForm";

export default observer(function RegisterForm() {
    const { userStore, modalStore } = useStore();

    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) => userStore.register(values).catch(error =>
                setErrors({ error }))}
            validationSchema={Yup.object({
                displayname: Yup.string().required(),
                username: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (


                <Form className="ui form error" onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h3' color="black" textAlign="center" style={{ marginBottom: 30 }}>
                        <Image src='/assets/logo.png' alt='logo'
                            style={{ marginBottom: 10, width: 80, height: 80, marginTop: 2 }} />
                        <br />
                        Create a new Account
                    </Header>

                    <MyTextInput name="displayname" placeholder="Display Name" />
                    <MyTextInput name="username" placeholder="Username" />
                    <MyTextInput name="email" placeholder="Email" />
                    <MyTextInput name="password" placeholder="Password" type='password' />
                    <ErrorMessage
                        name="error" render={() =>
                            <ValidationErrors errors={errors.error} />}
                    />
                    <Header align='center' style={{ margin: 9, marginTop: 20 }}>
                        <Button
                            loading={isSubmitting}
                            positive
                            content='Register'
                            type="submit"
                            color="yellow"
                            size="small"
                            disabled={!isValid || !dirty || isSubmitting}
                            fluid
                        />
                    </Header>
                    <Header
                        style={{ marginTop: 10, marginBotom: 4, cursor: 'pointer' }}
                        as='h5'
                        content='Already have an Account'
                        onClick={() => modalStore.openModal(<LoginForm />)}
                        textAlign="center"
                        color="yellow"
                    />

                </Form>
            )}
        </Formik>
    )
})