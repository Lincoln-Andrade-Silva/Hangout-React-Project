import { observer } from "mobx-react-lite";
import { Grid, Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import Calendar from "react-calendar";

export default observer(function CalendarComponents() {
    const { postStore, modalStore } = useStore();
    const { predicate, setPredicate } = postStore;


    return (
        <Segment fluid>
            <Calendar
                onChange={(date: Date) => {
                    setPredicate('startDate', date as Date);
                    modalStore.closeModal()
                }
                }
                value={predicate.get('startDate' || new Date())}
            />
        </Segment>
    )
})