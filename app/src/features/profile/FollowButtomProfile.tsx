import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: IProfile;
}

export default observer(function FollowButtonProfile({ profile }: Props) {
    const { profileStore, userStore } = useStore();
    const { updateFollowing, loading } = profileStore;

    function handleFollow(e: SyntheticEvent, username: string) {
        e.preventDefault();
        profile.following ? updateFollowing(username, false) : updateFollowing(username, true);
    }
    
    if (userStore.user?.username === profile.username) return null;
    else
        return (
            <Reveal animated="move"  style={{ margin: '5px' }}>
                <Reveal.Content visible style={{ width: '100%' }}>
                    <Button
                        fluid
                        color="facebook"
                        content={profile.following ? "Following" : "Not Following"} />
                </Reveal.Content>
                <Reveal.Content hidden style={{ width: '100%' }}>
                    <Button
                        fluid
                        color={profile.following ? 'red' : 'blue'}
                        content={profile.following ? 'Unfollow' : 'Follow'}
                        loading={loading}
                        onClick={(e) => handleFollow(e, profile.username)} />
                </Reveal.Content>
            </Reveal>
        )
})