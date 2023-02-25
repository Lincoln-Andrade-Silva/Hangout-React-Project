import { observer } from "mobx-react-lite";
import { Button, Icon } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import CalendarComponents from "./CalendarComponents";

export default observer(function PostFilter() {
    const { modalStore } = useStore();

    return (

        <Icon
            as={Button}
            icon='calendar'
            className='button icon'
            style={{ marginLeft: 5 }}
            onClick={() => modalStore.openModal(
                <CalendarComponents />
            )} size='big' />
    )
})