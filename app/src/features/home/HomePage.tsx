import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

export default function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/assets/logo.png' alt='logo' style={{ marginBottom: 12, width: '110px', height: "110px" }} />
                    Sunflower
                </Header>
                {userStore.IsLoggedIn ? (
                    <>
                        <Header inverted as='h2' content='Welcome to Sunflower' />
                        <Button as={Link} to='/dashboard' size='huge' style={{ marginTop: "3vh" }} inverted>
                            Go to Dashboard
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' style={{ width: '10vw', marginTop: "3vh" }} inverted>
                            Login
                        </Button>
                        <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' style={{ width: '10vw' }} inverted>
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
}