import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { IPost } from "../../../../app/models/IPost";
import { useStore } from "../../../../app/stores/store";

interface Props {
    post: IPost
}

export default function PostListItem({ post }: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${post.id}`} style={{ marginTop: '2.5vh' }}>
                                {post.title}
                            </Item.Header>
                            <Item.Description>Hosted by username</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    {/* <Icon name='calendar outline' /> {format(activity.date!, 'dd / MMMM / yyyy ')}
                    <Icon name='clock outline' style={{ marginLeft: '1vw' }} /> {format(activity.date!, 'h:mm aa')} */}
                    
                    <Icon name='calendar outline' /> {post.date}
                    <Icon name="map marker alternate" style={{ marginLeft: '1vw' }} /> {post.venue}
                </span>
            </Segment>
            <Segment secondary id='attendee-back'>
                Attendees go here
            </Segment>
            <Segment clearing>
                <span>{post.description}</span>
                <Button
                    as={Link}
                    to={`/post/${post.id}`}
                    color='teal'
                    floated="right"
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}