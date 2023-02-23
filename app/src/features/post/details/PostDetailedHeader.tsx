import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Button, Dropdown, Header, Icon, Image, Item, Segment } from "semantic-ui-react";
import { IPost } from '../../../app/models/IPost';

const postImageStyle = {
    filter: 'brightness(30%)'
};

const postImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    post: IPost
}

export default observer(function postDetailedHeader({ post }: Props) {

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }} >
                <Image src={`/assets/categoryImages/${post.category}.jpg`} fluid style={postImageStyle} />
                <Segment style={postImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={post.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{format(post.date, 'MM/dd/yyyy')}</p>
                                <p>
                                    Hosted by <strong> User </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <>
                    <Button color='teal'>Join Activity</Button>
                    <Button>Cancel attendance</Button>

                    <Dropdown
                        as={Button}
                        floated='right'
                        color='yellow'
                        text='Manage Post'
                        floating
                        labeled
                        className='button icon'
                    >
                        <Dropdown.Menu style={{ fontSize: 13 }}>
                            <Dropdown.Item as={Link} to={`/form/manage/${post.id}`}>
                                <Icon name='pencil' /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon name='trash' /> Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </>
            </Segment>
        </Segment.Group >
    )
})