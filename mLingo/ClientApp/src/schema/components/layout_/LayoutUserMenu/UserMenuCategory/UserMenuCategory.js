import React from 'react';
import { Link } from 'react-router-dom';
import { authentication_service } from "../../../../../services/authentication/authentication";

const logout = () => {
    authentication_service.user.logout();
    //it works because localStorage is empty imidiately
    window.location.reload();
  };

const UserMenuCategory = (props) => {

    return (
        <div className="usermenu__category" key={props.text}>
            <props.icon />
            <Link className="usermenu__link" to={props.link} onClick={props.leave ? logout : null}>{props.text}</Link>
        </div>
    )
}

export default UserMenuCategory;