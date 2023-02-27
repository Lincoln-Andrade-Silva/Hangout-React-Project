import { observer } from "mobx-react-lite";
import Calendar from "react-calendar";
import { Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";

export default observer(function CalendarComponents() {
    const { postStore, modalStore } = useStore();
    const { predicate, setPredicate } = postStore;


    return (
        <Segment fluid style={{ backgroundColor: 'transparent', boxShadow: 'none', width: 400, margin: "auto" }}>
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