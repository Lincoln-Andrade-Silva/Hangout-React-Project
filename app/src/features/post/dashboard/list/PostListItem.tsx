import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
import { IPost } from "../../../../app/models/IPost";
import PostListItemAttendee from "../../details/PostListItemAttendee";

interface Props {
    post: IPost
}

export default function PostListItem({ post }: Props) {

    return (
        <Segment.Group>
            <Segment>
                {post.isCancelled &&
                    <Label attached="top" color="red" content='Cancelled' style={{ textAlign: 'center' }} />
                }
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={post.host?.image || '/assets/user.png'} />
                        <Item.Content>
                            {post.isHost && (
                                <Item.Description style={{ position: 'relative' }}>
                                    <Label color="yellow" ribbon='right' style={{ position: 'absolute' }}>
                                        You are hosting
                                    </Label>
                                </Item.Description>
                            )}
                            {!post.isHost && post.isGoing && (
                                <Item.Description style={{ position: 'relative' }}>
                                    <Label color="green" ribbon='right' style={{ position: 'absolute' }}>
                                        You are going
                                    </Label>
                                </Item.Description>
                            )}
                            <Item.Header as={Link} to={`/activities/${post.id}`} style={{ marginTop: '2.5vh' }}>
                                {post.title}
                            </Item.Header>
                            <Item.Description>Hosted by <Link to={`/profile/${post.host?.username}`}> {post.host?.username}</Link></Item.Description>
                            <Item.Extra>{post.category}</Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='calendar outline' /> {format(post.date, 'dd/mm/yyyy ')}
                    <Icon name='clock outline' style={{ marginLeft: '1vw' }} /> {format(post.date, 'h:mm aa')}
                    <Icon name="map marker alternate" style={{ marginLeft: '1vw' }} /> {post.venue}
                </span>
            </Segment>
            <Segment secondary id='attendee-back'>
                <PostListItemAttendee attendees={post.attendees} />
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