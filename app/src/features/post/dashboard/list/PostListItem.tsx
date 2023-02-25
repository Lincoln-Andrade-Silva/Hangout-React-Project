import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment, Comment } from "semantic-ui-react";
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
                        <Item.Image size="tiny" avatar circular src={post.host?.image || '/assets/user.png'} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${post.id}`} style={{ marginTop: '2.5vh' }}>
                                {post.title}
                            </Item.Header>
                            {post.isHost && (
                                <Item.Description style={{ position: 'relative' }}>
                                    <Label color="blue" ribbon='right' style={{ position: 'absolute' }}>
                                        You are hosting
                                    </Label>
                                </Item.Description>
                            )}
                            {!post.isHost && post.isGoing && (
                                <Item.Description style={{ position: 'relative' }}>
                                    <Label color="violet" ribbon='right' style={{ position: 'absolute' }}>
                                        You are going
                                    </Label>
                                </Item.Description>
                            )}
                            <Item.Description>
                                Hosted by <Link to={`/profile/${post.host?.username}`}> {post.host?.username}</Link>
                            </Item.Description>
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
                <PostListItemAttendee post={post} />
            </Segment>
            <Segment clearing>
                <span>{post.description}</span>
                <Button
                    as={Link}
                    to={`/post/${post.id}`}
                    color='facebook'
                    floated="right"
                    content='View'
                />
            </Segment>
            <Segment>
                <Comment.Group>
                    <Comment>
                        <Comment.Avatar src='/assets/user.png' />
                        <Comment.Content>
                            <Comment.Author as='a'>Joe Henderson</Comment.Author>
                            <Comment.Metadata>
                                <div>5 days ago</div>
                            </Comment.Metadata>
                            <Comment.Text>Dude, this is awesome.</Comment.Text>
                            <Comment.Actions>
                                <Comment.Action>Reply</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                </Comment.Group>
            </Segment>
        </Segment.Group>
    )
}