import { observer } from "mobx-react-lite";
import { SyntheticEvent, useState } from "react";
import { Button, Card, Grid, Header, Image, Popup, Tab } from "semantic-ui-react";
import PhotoUpdloadWidget from "../../app/common/photo/PhotoUploadWidget";
import { IPhoto, IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: IProfile;
}

export default observer(function ProfileIPhotos({ profile }: Props) {
    const { profileStore: { isCurrentUser, uploading, loading, addPhotoMode, setAddPhotoMode, updloadPhoto, setMainPhoto, deletePhoto } } = useStore();
    const [target, setTarget] = useState('');


    function handlePhotoUpload(file: Blob) {
        updloadPhoto(file).then(() => setAddPhotoMode(false))
    }

    function handleSetMainPhoto(photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    }

    function handleDeletePhoto(photo: IPhoto, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    }

    return (
        <Tab.Pane style={{ backgroundColor: '#000017', borderRadius: 10, boxShadow: '2px 2px 2px 1px #17234a', border: 'none' }}>
            <Grid style={{ marginLeft: 20, marginRight: 20 }}>
                <Grid.Column width={16} style={{ marginTop: 10 }}>
                    <Header icon='image' content='Photos' floated="left" style={{ color: 'white' }} />
                    {isCurrentUser && !addPhotoMode && (
                        <Button
                            style={{ color: 'white' }}
                            floated="right"
                            content={'Add Photo'}
                            color={'facebook'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUpdloadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id} style={{ boxShadow: "none" }}>
                                    <Popup
                                        style={{ backgroundColor: 'transparent', border: 'none' }}
                                        hoverable
                                        basic
                                        trigger={
                                            <Image src={photo.url} />
                                        }>
                                        {isCurrentUser && (
                                            <Popup.Content className="photoButtons">
                                                <Button
                                                    className="photoButt"
                                                    color="facebook"
                                                    content="Main"
                                                    name={photo.url}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.url && loading}
                                                    onClick={e => handleSetMainPhoto(photo, e)}
                                                />
                                                <Button
                                                    className="photoButt"
                                                    color="red"
                                                    icon="trash"
                                                    name={photo.id}
                                                    disabled={photo.isMain}
                                                    loading={target === photo.id && loading}
                                                    onClick={e => handleDeletePhoto(photo, e)}
                                                />
                                            </Popup.Content>
                                        )}
                                    </Popup>
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane >
    )
})