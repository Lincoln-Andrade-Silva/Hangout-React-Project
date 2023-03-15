import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Divider, Grid, Header, Icon, Image, Item, Segment, Statistic } from "semantic-ui-react";
import { IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";
import FollowButtomProfile from "./FollowButtomProfile";

interface Props {
    profile: IProfile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    const [editMode, setEditMode] = useState(false);
    const { profileStore: { isCurrentUser } } = useStore();

    return (
        <Segment fluid style={{ backgroundColor: '#000017', borderRadius: 10, boxShadow: '2px 2px 2px 1px #17234a', paddingTop: 20, paddingBottom: 20 }}>
            <Grid>
                <Grid.Column width={1} />
                <Grid.Column width={3} >
                    <Image avatar size="big" src={profile.image || '/assets/user.png'} style={{ marginTop: 10 }} />
                </Grid.Column>
                <Grid.Column width={6}>
                    <Item.Group>
                        <Item>
                            <Item.Content verticalAlign="middle" >
                                <Header as='h2' content={profile.displayName} style={{ color: 'white', marginTop: 10 }} />
                                <Divider style={{ width: 110, color: 'white' }} />
                                <Header as='h3' style={{ color: 'white' }}>
                                    @{profile.username}
                                </Header>

                                <br></br>

                                <Header as='h4' content={profile.bio ? profile.bio : 'bio 🔥'} style={{ color: 'white', marginTop: 10 }} />
                                <Divider hidden />
                                <div style={{ display: 'flex' }}>
                                    <Icon name="linkify" style={{ color: 'white', fontSize: 15 }} />
                                    <u style={{ color: '#6f48eb', fontSize: 13 }}>www.instagram.com</u>

                                    <Icon name="calendar alternate outline" style={{ fontSize: 15, color: 'white', marginLeft: 10 }} />
                                    <a style={{ color: 'white', fontSize: 13 }}>Born November 1, 2002</a>
                                </div>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <div>
                    {isCurrentUser && (
                        <Button
                            style={{ color: 'white', position: 'absolute', marginLeft: 275, marginTop: 10 }}
                            size="mini"
                            floated="right"
                            icon={!editMode ? "pencil" : "x"}
                            color={!editMode ? 'facebook' : 'red'}
                            onClick={() => setEditMode(!editMode)}
                        />
                    )}
                </div>
                <Grid.Column width={1} />
                <Grid.Column style={{ marginTop: 45, color: 'white' }} width={4}>
                    <Statistic.Group size="tiny" widths={2}>
                        <Statistic class='statistic' label='Followers' value={profile.followersCount} />
                        <Statistic class='statistic' label='Following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButtomProfile profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment >
    )
})