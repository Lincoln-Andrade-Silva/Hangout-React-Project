import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Icon, Segment } from "semantic-ui-react";

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header as='h2' icon size='huge' style={{ marginBottom: 50, marginTop: 50 }}>
                <Icon name='search' color='black' />
                <Header.Content>
                    Page not found
                    <Header.Subheader content="Oops - The page you are trying to access does not exist..." />
                </Header.Content>
            </Header>
            <Segment.Inline style={{ marginBottom: 50 }} >
                <Button as={Link} to='/dashboard' color="teal" size="large" circular>
                    Return Dashboard..
                </Button>
            </Segment.Inline>
        </Segment>
    )
}