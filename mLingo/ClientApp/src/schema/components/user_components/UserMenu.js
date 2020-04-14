import React, { useState } from "react";
import { FaBookOpen, FaFolder, FaHouzz, FaRegFile, FaRegChartBar, FaCog } from 'react-icons/fa';
import Category from './UserMenuComponents/Category'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';


const UserMenu = props => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    const categories = [
        { "icon": FaBookOpen, "text": "learning plan", "link": "/head" },
        { "icon": FaFolder, "text": "study sets", "link": "/head" },
        { "icon": FaRegFile, "text": "collections", "link": "/collections" },
        { "icon": FaRegChartBar, "text": "stats", "link": "/head" },
        { "icon": FaHouzz, "text": "your profile", "link": "/head" },
        { "icon": FaCog, "text": "settings", "link": "/head" },
    ]

    const categoriesmapped = categories.map(el => <Category icon={el.icon} text={el.text} link={el.link} />)

    return (
        <div className="usermenu">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <h2>menu</h2>
                {categoriesmapped}
            </Collapse>

        </div >
    );
};

export default UserMenu;