import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Image, List, Popup } from "semantic-ui-react";
import { IPost } from "../../../app/models/IPost";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
    post: IPost;
}

export default observer(function PostListAttendee({ post }: Props) {

    const styles = {
        borderColor: 'green',
        borderWidth: 1
    }

    const hostStyle = {
        borderColor: '#405c9c',
        borderWidth: 3
    }

    return (
        <List horizontal>
            {post.attendees.map(attendee => (
                <Popup
                    basic
                    hoverable
                    key={attendee.username}
                    position="top right"
                    positionFixed
                    style={{ backgroundColor: 'transparent', border: 0, boxShadow: 'none' }}
                    trigger={
                        <List.Item
                            key={attendee.username}
                            as={Link} to={`/profile/${attendee.username}`}
                        >
                            {attendee.username === post.hostUsername ?
                                (<Image
                                    size="mini"
                                    circular src={attendee.image || '/assets/user.png'}
                                    bordered
                                    style={hostStyle}
                                />) :
                                (<Image
                                    size="mini"
                                    circular src={attendee.image || '/assets/user.png'}
                                    bordered
                                    style={attendee.following ? styles : null}
                                />)}
                        </List.Item>}>
                    <Popup.Content >
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})