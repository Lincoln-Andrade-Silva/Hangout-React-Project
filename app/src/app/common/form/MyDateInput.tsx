import { useField } from "formik";
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { Form } from "semantic-ui-react";

export default function MyDateInput(props: Partial<ReactDatePickerProps>) {
    const [field, meta, helpers] = useField(props.name!);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ width:300, margin:"auto", marginBottom:10  }}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
        </Form.Field>
    )
}