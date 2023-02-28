import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import { SyntheticEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Grid, Header, Segment, Tab, TabProps } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

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