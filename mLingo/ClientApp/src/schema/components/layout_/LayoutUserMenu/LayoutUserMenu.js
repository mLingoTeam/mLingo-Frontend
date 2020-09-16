import React, { useState } from "react";
import { FaBookOpen, FaFolder, FaHouzz, FaRegFile, FaRegChartBar, FaCog, FaRoad, FaHome } from 'react-icons/fa';
import UserMenuCategory from './UserMenuCategory/UserMenuCategory'
import { Collapse, NavbarToggler} from 'reactstrap';


const LayoutUserMenu = props => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    const categories = [
        { "icon": FaHome, "text": "home", "link": "/head" },
        { "icon": FaBookOpen, "text": "learning plan", "link": "/head" },
        { "icon": FaFolder, "text": "study sets", "link": "/head" },
        { "icon": FaRegFile, "text": "collections", "link": "/collections" },
        { "icon": FaRegChartBar, "text": "stats", "link": "/head" },
        { "icon": FaHouzz, "text": "your profile", "link": "/head" },
        { "icon": FaCog, "text": "settings", "link": "/head" },
        { "icon": FaRoad, "text": "logout", "link": "/head", "leave": true },
    ]

    const categoriesmapped = categories.map(el => <UserMenuCategory icon={el.icon} text={el.text} link={el.link} leave={el.leave}/>)

    return (
        <div className={"usermenu__container " + ( props.navbar ? 'usermenu--dark' : '-' )}>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                { isOpen ? <NavbarToggler onClick={toggle} class="toggler--dark" /> : null}
                <div className="usermenu__title">menu</div>
                {categoriesmapped}
            </Collapse>

        </div >
    );
};

export default LayoutUserMenu;