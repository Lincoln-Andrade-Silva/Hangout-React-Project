import axios from 'axios';
import { useState } from 'react';
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    axios.defaults.baseURL = 'http://localhost:5000';
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get('buggy/not-found');
    }

    function handleBadRequest() {
        axios.get('buggy/bad-request');
    }

    function handleServerError() {
        axios.get('buggy/server-error');
    }

    function handleUnauthorised() {
        axios.get('buggy/unauthorised');
    }

    function handleBadGuid() {
        axios.get('buggy/not-a-guid');
    }

    function handleValidationError() {
        axios.post('post', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h2' icon textAlign='center' size='huge' style={{marginBottom:50}}>
                <Icon name='warning sign' color='red' />
                <Header.Content>
                    Errors Component
                    <Header.Subheader> Test the Exeptions </Header.Subheader>
                </Header.Content>
            </Header>

            <Segment position='right' size='huge'>
                <Button.Group widths="6" size='large'>
                    <Button onClick={handleNotFound} content='Not Found' color='teal' />
                    <Button.Or />
                    <Button onClick={handleBadRequest} content='Bad Request' color='olive' />
                    <Button.Or />
                    <Button onClick={handleValidationError} content='Validation Error' color='orange' />
                    <Button.Or />
                    <Button onClick={handleServerError} content='Server Error' color='blue' />
                    <Button.Or />
                    <Button onClick={handleUnauthorised} content='Unauthorized' color='yellow' />
                    <Button.Or />
                    <Button onClick={handleBadGuid} content='Bad Guid' color='red' />
                </Button.Group>
            </Segment>
            {errors &&
                <ValidationErrors errors={errors} />}
        </>
    )
}
