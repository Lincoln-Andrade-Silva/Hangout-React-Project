import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Dropdown, Icon, Image, Menu } from "semantic-ui-react";
import SearchBar from '../../features/post/dashboard/filter/SearchBar';
import LoginForm from '../../features/user/LoginForm';
import { useStore } from '../stores/store';

export default function NavBar() {
    const { userStore: { user, logout, IsLoggedIn }, modalStore } = useStore();

    return (
        <Menu inverted fixed='top' style={{ fontSize: 15 }}>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <Image src='/assets/icon.png' alt="Logo" style={{ marginLeft: 10, marginRight: 10, width: 40 }} />
                    <span>Hangout</span>
                </Menu.Item>
                <Menu.Item as={NavLink} to='/dashboard' name='Posts' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/form/create' color='facebook' content='Create Post' />
                </Menu.Item>
                <Menu.Item  >
                    <SearchBar />
                </Menu.Item>


                {IsLoggedIn ? (
                    <Menu.Item position='right'>
                        <Image src={user?.image || '/assets/user.png'} avatar spaced='right' as={Link} to={`/profile/${user?.username}`} style={{ marginRight: 10 }} />
                        <Dropdown
                            text={user?.displayName || 'User'}
                            style={{ fontWeight: 900 }}
                        >
                            <Dropdown.Menu style={{ marginTop: 16, fontSize: 16 }}>
                                <Dropdown.Item as={Link} to={`/profile/${user?.username}`}>
                                    <Icon name='user' floated='left' color='grey' /> Profile
                                </Dropdown.Item>
                                <Dropdown.Item onClick={logout} style={{ fontSize: 13 }} >
                                    <Icon name='power off' floated='left' color='grey' /> Logout
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Menu.Item>
                ) : (
                    <Menu.Item position='right'>
                        <Button
                            as={Link} to='/'
                            color='teal'
                            onClick={() => modalStore.openModal(<LoginForm />)}
                            content='Login'
                            size="small"
                        />
                    </Menu.Item>
                )}
            </Container>
        </Menu >
    )
}