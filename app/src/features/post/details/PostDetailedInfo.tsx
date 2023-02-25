import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { Grid, Icon, Segment } from "semantic-ui-react";
import { IPost } from "../../../app/models/IPost";

interface Props {
    post: IPost
}

export default observer(function PostDetailedInfo({ post }: Props) {

    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' style={{ color: "#405c9c" }} name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{post.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar outline' size='large' style={{ color: "#405c9c" }} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {format(post.date, 'MMMM dd, yyyy')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='clock outline' size='large' style={{ color: "#405c9c" }} />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>
                            {format(post.date, 'h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='map marker alternate' size='large' style={{ color: "#405c9c" }} />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{post.venue}, {post.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    );
})