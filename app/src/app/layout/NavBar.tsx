import { NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";

export default function NavBar() {

    return (
        <Menu inverted fixed='top' style={{ fontSize: 15 }}>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <Image src='/assets/icon.png' alt="Logo" style={{ marginRight: '1vw', width: 40 }} />
                    <span>Sunflower</span>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/dashboard' name='Posts' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/form/create' color='teal' content='Create Post' />
                </Menu.Item>
                <Menu.Item position='right'>
                    <Dropdown
                        as={Button}
                        color='teal'
                        text='User'
                        icon='id badge'
                        floating
                        labeled
                        className='button icon'
                    >
                        <Dropdown.Menu style={{ fontSize: 13 }}>
                            <Dropdown.Item><Icon name='user' />Profile</Dropdown.Item>
                            <Dropdown.Item><Icon name='power off' />Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}