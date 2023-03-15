import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default observer(function PhotoUpdloadWidget({ loading, uploadPhoto }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    const { profileStore: { setAddPhotoMode, isCurrentUser } } = useStore();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!))
        }
    }



    useEffect(() => {
        if (!isCurrentUser) {
            setAddPhotoMode(false);
        }
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])
    return (
        <Grid className="ui form" style={{ textAlign: 'center', margin: 'auto' }}>
            {files && files.length > 0 &&
                <Grid.Column width={4} floated="right" style={{ marginLeft: 760, marginTop: -70, display: 'flex', position: 'absolute' }}>
                    <>
                        <Button
                            style={{ color: 'white', marginRight: 6 }}
                            color={'red'}
                            content="Cancel"
                            onClick={() => setAddPhotoMode(false)}
                        />
                        <Button
                            loading={loading}
                            onClick={onCrop}
                            color="green"
                            icon="check"
                        />
                    </>
                </Grid.Column>
            } :
            {files.length <= 0 &&
                <Grid.Column width={4} floated="right" style={{ marginLeft: 790, marginTop: -70, display: 'flex', position: 'absolute' }}>
                    <Button
                        style={{ color: 'white' }}
                        color={'red'}
                        content="Cancel"
                        onClick={() => setAddPhotoMode(false)}
                    />
                </Grid.Column>
            }
            < Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header style={{ color: 'white' }} content='Add Photo' size='medium' />
                {<PhotoWidgetDropzone setFiles={setFiles} />}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header style={{ color: 'white' }} content='Resize image' size='medium' />
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={4}>
                <Header style={{ color: 'white' }} content='Preview & Upload' size='medium' />
                {files && files.length > 0 &&
                    <>
                        <div className="img-preview" style={{ minHeight: 200, overflow: 'hidden' }} />
                    </>
                }
            </Grid.Column>
        </Grid >
    )
})