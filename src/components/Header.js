import React from 'react'
//Redex
import { useDispatch, useSelector } from 'react-redux'
//React Router Component
import { LinkContainer } from 'react-router-bootstrap'
//Template Components
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

//Components
import SearchBox from './SearchBox'
//Actions
import { logout } from '../actions/userActions'

function Header() {

    //select from state
    const userLogin = useSelector(state => state.userLogin)
    //de-structure state
    const { userInfo } = userLogin
    //trigger action
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }


    return (
        <header>
           <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               <Container>
                   <LinkContainer to='/'>
                        <Navbar.Brand>Onlineshop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <SearchBox />
                        <Nav className="mr-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ):(
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className="fas fa-user"></i>Login</Nav.Link>
                                </LinkContainer>
                            )}


                            {userInfo && userInfo.isAdmin && (
                                 <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    
                                </NavDropdown>
                            )}


                        </Nav>
                    </Navbar.Collapse>
               </Container>
            </Navbar>
        </header>
    )
}

export default Header