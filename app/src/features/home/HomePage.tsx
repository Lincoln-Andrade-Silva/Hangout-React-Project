import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function HomePage() {

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image src='/assets/logo.png' alt='logo' style={{ marginBottom: 12, width: '110px', height: "110px" }} />
                    Sunflower
                </Header>
                <>
                    <Header inverted as='h2' content='Welcome to Sunflower' />
                    <Button as={Link} to='/dashboard' size='huge' style={{ marginTop: "3vh" }} inverted>
                        Go to Sunflower
                    </Button>
                </>
            </Container>
        </Segment>
    )
}