import { observer } from "mobx-react-lite";
import { Header, Menu } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";

export default observer(function PostFilter() {
    const { postStore } = useStore();
    const { predicate, setPredicate } = postStore;

    return (
        <>
            <Menu vertical size='large' style={{ width: 370, margin: 'auto', fontSize: 14 }}>
                <Header fluid icon={'filter'} color='violet' content='Filters' style={{ fontSize: 16, marginTop: 12, marginLeft: 10 }} />
                <Menu.Item
                    content="All Activities"
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')} />
                <Menu.Item
                    content="I'm going"
                    active={predicate.has('isGoing')}
                    onClick={() => setPredicate('isGoing', 'true')} />
                <Menu.Item
                    content="I'm hosting"
                    active={predicate.has('isHost')}
                    onClick={() => setPredicate('isHost', 'true')} />
            </Menu>
            <Header />
        </>
    )
})  