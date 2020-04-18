import React from 'react';
import { Link } from 'react-router-dom';

const UserMenuCategory = (props) => {

    return (
        <div className="usermenu__category" key={props.text}>
            <props.icon />
            <Link className="usermenu__link" to={props.link}>{props.text}</Link>
        </div>
    )
}

export default UserMenuCategory;