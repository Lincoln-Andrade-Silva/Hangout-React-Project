import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: IProfile;
}

export default observer(function FollowButton({ profile }: Props) {
    const { profileStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }

    return (
        <Button
            color={profile.following ? 'red' : 'facebook'}
            content={profile.following ? 'Unfollow' : 'Follow'}
            loading={loading}
            style={{ margin: 'auto', textAlign: 'center', fontSize: 10, borderRadius: 20, marginTop: 3 }}
            onClick={(e) => handleFollow(e, profile.username)}
            size='tiny'
        />
    )
})