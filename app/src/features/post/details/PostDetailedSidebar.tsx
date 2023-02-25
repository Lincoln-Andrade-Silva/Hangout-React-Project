import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image, Popup, Header } from "semantic-ui-react";
import { IPost } from "../../../app/models/IPost";
import ProfileCard from "../../profile/ProfileCard";

interface Props {
    post: IPost
}

export default observer(function PostDetailedSideba({ post: { attendees, host } }: Props) {
    if (!attendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none', backgroundColor: '#405c9c', color: 'white' }}
                attached='top'
                secondary
            >
                <Header style={{ color: 'white', fontSize: 16 }}>
                    {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
                </Header>
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {attendees.map(attendee => (
                        <Popup
                            hoverable
                            position="left center"
                            key={attendee.username}
                            trigger={
                                <Item style={{ position: 'relative' }} key={attendee.username}>
                                    {attendee.username === host?.username &&
                                        <Label
                                            color="violet"
                                            style={{ position: 'absolute' }}
                                            ribbon='right'
                                        >
                                            Host
                                        </Label>
                                    }
                                    <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                                    <Item.Content verticalAlign='middle' style={{ color: "#405c9c", fontWeight: 600 }}>
                                        <Item.Header as='h3'>
                                            <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
                                        </Item.Header>
                                        {attendee.following &&
                                            <Item.Extra>Following</Item.Extra>}
                                    </Item.Content>
                                </Item>}>
                            <Popup.Content>
                                <ProfileCard profile={attendee} />
                            </Popup.Content>
                        </Popup>
                    ))}
                </List>
            </Segment>
        </>

    )
})