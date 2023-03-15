import { observer } from "mobx-react-lite";
import { Tab } from "semantic-ui-react";
import { IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";
import ProfileEvents from "./ProfileEvents";
import ProfileFollowings from "./ProfileFollowings";
import ProfilePhotos from "./ProfilePhotos";

interface Props {
    profile: IProfile;
}

export default observer(function ProfileContent({ profile }: Props) {

    const { profileStore } = useStore();

    const panes = [
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile} /> },
        { menuItem: 'Events', render: () => <ProfileEvents /> },
        { menuItem: 'Followers', render: () => <ProfileFollowings /> },
        { menuItem: 'Following', render: () => <ProfileFollowings /> },
    ]

    return (
        <Tab
            style={{ marginTop: 30 }}
            menu={{ fluid: true, tabular: true }}
            menuPosition='right'
            panes={panes}
            onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
        />

    )
})