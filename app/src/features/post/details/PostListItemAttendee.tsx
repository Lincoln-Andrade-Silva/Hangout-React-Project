import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { List, Popup, Image } from "semantic-ui-react";
import { IProfile } from "../../../app/models/IProfile";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
    attendees: IProfile[];
}

export default observer(function PostListAttendee({ attendees }: Props) {

    const styles = {
        borderColor: 'green',
        borderWidth: 2
    }

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup
                    hoverable
                    key={attendee.username}
                    position="top center"
                    trigger={
                        <List.Item
                            key={attendee.username}
                            as={Link} to={`/profile/${attendee.username}`}
                        >
                            <Image
                                size="mini"
                                circular src={attendee.image || '/assets/user.png'}
                                bordered
                                style={attendee.following ? styles : null}
                            />
                        </List.Item>}>
                    <Popup.Content>
                        <ProfileCard profile={attendee} />
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})