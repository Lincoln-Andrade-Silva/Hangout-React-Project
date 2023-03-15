import { Formik } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Form } from "react-router-dom";
import { Button, Divider, Grid, Header, Icon, Image, Item, Segment, Statistic } from "semantic-ui-react";
import * as Yup from 'yup';
import MyTextInput from "../../app/common/form/components/MyTextInput";
import { IProfile } from "../../app/models/IProfile";
import { useStore } from "../../app/stores/store";
import FollowButtomProfile from "./FollowButtomProfile";

interface Props {
    profile: IProfile;
}

export default observer(function ProfileHeader({ profile }: Props) {
    const [editMode, setEditMode] = useState(false);
    const [submitButt, setSubmitButt] = useState(false);
    const { profileStore: { isCurrentUser, updateProfile } } = useStore();

    return (
        <Segment fluid style={{ backgroundColor: '#000017', borderRadius: 10, boxShadow: '2px 2px 2px 1px #17234a', paddingTop: 20, paddingBottom: 20 }}>
            <Formik
                initialValues={{
                    displayName: profile?.displayName, bio:
                        profile?.bio
                }}
                onSubmit={(values) => {
                    if ((values.bio !== profile.bio || values.displayName !== profile.displayName) && submitButt) {
                        updateProfile(values).then(() => setEditMode(false))
                    }
                }
                }
                validationSchema={Yup.object({
                    displayName: Yup.string().required()
                })}
            >
                {({ handleSubmit, isValid, dirty }) => (
                    <Form onSubmit={handleSubmit}>
                        <Grid>
                            {editMode &&
                                <Button
                                    size="mini"
                                    icon="check"
                                    type='submit'
                                    float="right"
                                    content="Save"
                                    color="facebook"
                                    disabled={!isValid || !dirty}
                                    onClick={() => setSubmitButt(true)}
                                    style={{ marginLeft: 825, marginTop: 10, position: "absolute" }}
                                />
                            }ó

                            <Grid.Column width={1} />
                            <Grid.Column width={3} >
                                <Image avatar size="big" src={profile.image || '/assets/user.png'} style={{ marginTop: 10 }} />
                            </Grid.Column>
                            <Grid.Column width={6}>
                                <Item.Group>
                                    <Item>
                                        <Item.Content verticalAlign="middle" >
                                            {!editMode ?
                                                <Header as='h2' content={profile.displayName} style={{ color: 'white', marginTop: 10 }} />
                                                :
                                                <MyTextInput
                                                    placeholder=''
                                                    name='displayName'
                                                    transparent={true}
                                                />
                                            }
                                            <Divider style={{ width: 110, color: 'white' }} />
                                            <Header as='h3' style={{ color: 'white' }}>
                                                @{profile.username}
                                            </Header>

                                            <br></br>

                                            {!editMode ?
                                                <Header as='h4' content={profile.bio ? profile.bio : 'bio 🔥'} style={{ color: 'white', marginTop: 10 }} />
                                                :
                                                <MyTextInput
                                                    placeholder=''
                                                    name='bio'
                                                    fontSize={15}
                                                    transparent={true}
                                                />
                                            }
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
                    </Form>
                )}
            </Formik>
        </Segment >
    )
})