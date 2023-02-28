import { observer } from "mobx-react-lite";
import { Divider, Grid, Header, Icon, Item, Segment, Statistic } from "semantic-ui-react";
import { IProfile } from "../../app/models/IProfile";
import FollowButtomProfile from "./FollowButtomProfile";

interface Props {
    profile: IProfile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    return (
        <Segment fluid style={{ backgroundColor: '#000017', borderRadius: 10, boxShadow: '2px 2px 2px 1px #17234a' }}>
            <Grid>
                <Grid.Column width={1} />
                <Grid.Column width={10}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size="small" src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign="middle" >
                                <Header as='h1' content={profile.displayName} style={{ color: 'white' }} />
                                <Divider style={{ width: 110, color: 'white' }} />
                                <Header as='h3' style={{ color: 'white' }}>
                                    @{profile.username}
                                </Header>
                            </Item.Content>
                        </Item>
                        <Item>
                            <Item.Content verticalAlign="middle" style={{ color: 'white', marginLeft: 170, fontSize: 15, marginTop: -5 }}>
                                {profile.bio ? profile.bio : 'bio 🔥'}
                                <Divider hidden />
                                <p style={{ fontSize: 15 }}>
                                    <Icon name="linkify" />
                                    <u style={{ color: '#6f48eb' }}>www.instagram.com</u>

                                    <Icon name="calendar alternate outline" style={{ color: 'white', marginLeft: 15 }} />
                                    Born November 1, 2002
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column style={{ marginTop: 25, color: 'white' }} width={4}>
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