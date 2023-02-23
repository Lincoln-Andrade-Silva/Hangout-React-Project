import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    type?: string;
    label?: string;
}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);
    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ width:300, margin:"auto", marginBottom:10  }}>
            <label>{props.label}</label>
            <input {...field} {...props} />
        </Form.Field>
    )
}