import React from "react";
import { Link } from "react-router-dom";
import { FaBookOpen, FaFolder, FaHouzz, FaRegFile, FaRegChartBar, FaCog } from 'react-icons/fa';
import Category from './UserMenuComponents/Category'


const UserMenu = props => {
    const categories = [
        { "icon": FaBookOpen, "text": "learning plan", "link": "/head" },
        { "icon": FaFolder, "text": "study sets", "link": "/head" },
        { "icon": FaRegFile, "text": "collections", "link": "/head" },
        { "icon": FaRegChartBar, "text": "stats", "link": "/head" },
        { "icon": FaHouzz, "text": "your profile", "link": "/head" },
        { "icon": FaCog, "text": "settings", "link": "/head" },
    ]

    const categoriesmapped = categories.map(el => <Category icon={el.icon} text={el.text} link={el.link} />)

    return (
        <div className="UserMenu">
            <h2>menu</h2>
            {categoriesmapped}
        </div >
    );
};

export default UserMenu;