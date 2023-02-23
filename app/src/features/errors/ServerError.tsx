import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Header, Icon, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

export default observer(function ServerError() {
    const { commonStore } = useStore();
    return (
        <Container>
            <Header as='h2' size='huge' style={{ marginBottom: 50 }}>
                <Icon name='hdd' color='red' />
                <Header.Content>
                    Server Error
                    <Header.Subheader content={commonStore.error?.message} />
                </Header.Content>
            </Header>

            {commonStore.error?.details &&
                <Segment>
                    <Header as='h4' content='Stack Trace' color="teal" />
                    <code style={{ marginTop: '10px' }}>{commonStore.error.details}</code>
                </Segment>
            }
        </Container>
    )
})