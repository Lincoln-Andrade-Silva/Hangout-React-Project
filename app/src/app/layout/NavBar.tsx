import { NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Icon, Menu } from "semantic-ui-react";

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src='/assets/icon.png' alt="Logo" style={{ marginRight: '1vw' }} />
                    Sunflower
                </Menu.Item>
                <Menu.Item as={NavLink} to='/dashboard' name='Activities' />
                <Menu.Item name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/form/create' color='teal' content='Create Post' />
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