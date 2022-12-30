import React from 'react';
import { Menu, Container, Button, Dropdown, Icon } from "semantic-ui-react"

export default function NavBar() {
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="../assets/logo.png" alt="[Logo]" style={{ marginRight: '1vw' }} />
                    Sunflower
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item name='Errors' />
                <Menu.Item>
                    <Button positive content='Create Post' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Icon enabled="true" name='user circle' size="big" avatar="true" spaced='right' />
                    <Dropdown pointing='top left' text='User' style={{ fontWeight: '900' }}>
                        <Dropdown.Menu>
                            <Dropdown.Item text='My Profile' icon='child' />
                            <Dropdown.Item text='Logout' icon='power off' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}