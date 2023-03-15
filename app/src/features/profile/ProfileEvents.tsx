import { observer } from "mobx-react-lite";
import { Segment } from "semantic-ui-react";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } },
];

export default observer(function ProfileEvents() {

    return (
        <Segment style={{ height: 500, backgroundColor: '#000017', borderRadius: 10, boxShadow: '2px 2px 2px 1px #17234a' }}>
        </Segment>
    )

})