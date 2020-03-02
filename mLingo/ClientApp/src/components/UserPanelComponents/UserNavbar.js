import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
} from 'reactstrap';
import { Link } from "react-router-dom";

const UserNavbar = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand >{localStorage.getItem('currentUser')}</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link className="nav-link" to='/create/'>Create Collection</Link>
                        </NavItem>
                        <NavItem>
                            <Link className="nav-link" to='/search/'>Search Collections</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default UserNavbar;