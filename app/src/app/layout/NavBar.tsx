import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Icon, Image, Menu, Segment } from "semantic-ui-react";
import { useStore } from '../stores/store';

export default function NavBar() {
    const { userStore: { user, logout } } = useStore();

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
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' as={Link} to={`/profile/${user?.username}`} style={{ marginRight: 10 }} />
                    <Dropdown
                        text={user?.displayName || 'User'}
                        style={{fontWeight: 900}}
                    >
                        <Dropdown.Menu style={{ marginTop: 16, fontSize: 13 }}>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`}>
                                <Image src={user?.image || '/assets/user.png'} avatar floated='left' style={{ height: 18, width: 18 }} /> Profile
                            </Dropdown.Item>
                            <Dropdown.Item onClick={logout} style={{ fontSize: 13 }} >
                                <Icon name='power off' floated='left' color='grey' /> Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu >
    )
}