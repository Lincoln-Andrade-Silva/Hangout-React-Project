import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Image } from "semantic-ui-react";
import { IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";
import FollowButtom from "./FollowButtom";

interface Props {
    profile: IProfile;
}

function truncate(str: string | undefined) {
    if (str) {
        return str.length > 20 ? str.substring(0, 15) + '...' : str;
    }
}

export default observer(function ProfileCard({ profile }: Props) {
    const { userStore } = useStore();

    return (
        <Card style={{ backgroundColor: '#000017', borderRadius: 10, boxShadow: '2px 2px 2px 1px #17234a' }}>
            <Card.Content>
                <div style={{ color: 'white', float: 'right', position: 'relative' }}>
                    {userStore.user?.username !== profile.username &&
                        <FollowButtom profile={profile} />
                    }
                </div>
                {profile.image ?
                    <Image floated="left" src={profile.image} avatar style={{ height: 50, width: 50 }} /> :
                    <Image floated="left" src={'assets/user.png'} avatar style={{ height: 50, width: 50 }} />
                }
                <Card.Header style={{ marginTop: 5, color: 'white' }}>{profile.displayName}
                </Card.Header>
                <Card.Meta style={{ color: 'grey' }}>@{profile.username}</Card.Meta>
                <Card.Description style={{ color: 'white', marginLeft: 5, marginTop: 5 }}>
                    {profile.bio ? truncate(profile.bio) : 'bio 🔥'}
                </Card.Description>
            </Card.Content>
            <Card.Content style={{ marginLeft: 5, color: 'grey' }}>
                <span style={{ marginRight: 12, color: 'white' }}>
                    {profile.followersCount ? profile.followersCount : 0}
                    <span style={{ marginLeft: 5, color: 'grey' }}>
                        Followers
                    </span>
                </span>
                <span style={{ marginRight: 12, color: 'white' }}>
                    {profile.followingCount ? profile.followingCount : 0}
                    <span style={{ marginLeft: 5, color: 'grey' }}>
                        Following
                    </span>
                </span>
            </Card.Content>
        </Card >
    )
})