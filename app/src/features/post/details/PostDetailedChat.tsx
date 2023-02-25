import { observer } from 'mobx-react-lite'
import React from 'react'
import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react'

interface Props {
    id: string
}

export default observer(function PostDetailedChat({ id }: Props) {

    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none', backgroundColor: '#405c9c' }}
                attached='top'
                secondary
            >
                <Header content="Chat" style={{ color: 'white', fontSize: 16 }} />
            </Segment>
            <Segment attached>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>Matt</Comment.Author>
                            <Comment.Metadata>
                                <div>Today at 5:42PM</div>
                            </Comment.Metadata>
                            <Comment.Text>How artistic!</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>5 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>

                    <Form reply>
                        <Form.TextArea />
                        <Button
                            content='Add Reply'
                            labelPosition='left'
                            icon='edit'
                            color='facebook'
                        />
                    </Form>
                </Comment.Group>
            </Segment>
        </>
    );
})