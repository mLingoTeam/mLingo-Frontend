import React, { useState } from "react";
import { FaBookOpen, FaFolder, FaHouzz, FaRegFile, FaRegChartBar, FaCog } from 'react-icons/fa';
import UserMenuCategory from './UserMenuCategory/UserMenuCategory'
import { Collapse, NavbarToggler} from 'reactstrap';


const LayoutUserMenu = props => {

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

    const categoriesmapped = categories.map(el => <UserMenuCategory icon={el.icon} text={el.text} link={el.link} />)

    return (
        <div className="usermenu__container">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <div className="usermenu__title">menu</div>
                {categoriesmapped}
            </Collapse>

        </div >
    );
};

export default LayoutUserMenu;