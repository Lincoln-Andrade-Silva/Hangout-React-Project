import { useField } from "formik";
import { Form } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    transparent?: boolean;
    fontSize?: number;
    type?: string;
    label?: string;

}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name);

    if (props.transparent) {
        if (props.fontSize) {
            return (
                <Form.Field error={meta.touched && !!meta.error} style={{ fontSize: props.fontSize, marginTop: 10 }}>
                    <label>{props.label}</label>
                    <input {...field} {...props} style={{ backgroundColor: "transparent", color: "white", border: 0, width: 100, outline: "none", fontWeight: 700 }} />
                </Form.Field >
            )
        }
        return (
            <Form.Field error={meta.touched && !!meta.error} style={{ fontSize: 25, marginTop: 10 }}>
                <label>{props.label}</label>
                <input {...field} {...props} style={{ backgroundColor: "transparent", color: "white", border: 0, width: "auto", outline: "none", fontWeight: 700 }} />
            </Form.Field >
        )
    }

    return (
        <Form.Field error={meta.touched && !!meta.error} style={{ width: 300, margin: "auto", marginBottom: 10 }}>
            <label>{props.label}</label>
            <input {...field} {...props} />
        </Form.Field>
    )


}