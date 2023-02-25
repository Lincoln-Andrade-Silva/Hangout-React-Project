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
        <Card as={Link} to={`/profile/${profile.username}`} style={{ width: 160, textAlign: 'center' }}>
            {profile.image ?
                <Image src={profile.image} /> :
                <Image src={'assets/user.png'} />
            }
            <Card.Content>
                <Card.Header>{profile.displayName}</Card.Header>
                <Card.Description>{truncate(profile.bio)}</Card.Description>
            </Card.Content>
            {userStore.user?.username !== profile.username &&
                <Card.Content extra>
                    <FollowButtom profile={profile} />
                </Card.Content>
            }
        </Card>
    )
})