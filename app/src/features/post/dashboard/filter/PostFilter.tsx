import { observer } from "mobx-react-lite";
import { Button, Dropdown, Input } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";

export default observer(function PostFilter() {
    const { postStore } = useStore();
    const { predicate, setPredicate } = postStore;

    return (
        <Button.Group floated="left" style={{ marginLeft: 5 }} size="big">
            <Dropdown
                icon='filter'
                className='button icon'
                basic
            >
                <Dropdown.Menu>
                    <Dropdown.Item
                        content="All Posts"
                        active={predicate.has('all')}
                        onClick={() => setPredicate('all', 'true')}
                    />
                    <Dropdown.Item
                        content="I'm going"
                        active={predicate.has('isGoing')}
                        onClick={() => setPredicate('isGoing', 'true')}
                    />
                    <Dropdown.Item
                        content="I'm hosting"
                        active={predicate.has('isHost')}
                        onClick={() => setPredicate('isHost', 'true')}
                    />
                </Dropdown.Menu>
            </Dropdown>
        </Button.Group>
    )
})