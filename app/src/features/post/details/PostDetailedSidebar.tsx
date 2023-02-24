import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Segment, List, Item, Label, Image, Popup } from "semantic-ui-react";
import { IPost } from "../../../app/models/IPost";

interface Props {
    post: IPost
}

export default observer(function PostDetailedSideba({ post: { attendees, host } }: Props) {
    if (!attendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
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
                                            style={{ position: 'absolute' }}
                                            color='yellow'
                                            ribbon='right'
                                        >
                                            Host
                                        </Label>
                                    }
                                    <Image size='tiny' src={attendee.image || '/assets/user.png'} />
                                    <Item.Content verticalAlign='middle'>
                                        <Item.Header as='h3'>
                                            <Link to={`/profile/${attendee.username}`}>{attendee.displayName}</Link>
                                        </Item.Header>
                                        {attendee.following &&
                                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                                    </Item.Content>
                                </Item>}>
                        </Popup>
                    ))}
                </List>
            </Segment>
        </>

    )
})