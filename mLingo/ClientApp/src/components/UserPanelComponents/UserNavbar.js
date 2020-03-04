import React from "react";
import Search from '../FormComponents/Search';
import { Link } from "react-router-dom";

const UserNavbar = props => {
    return (
        <div className="navbar--dark">
            <Link className="navbar__brand" to="/">
                <p className="navbar__brand--text">mLingo</p>
            </Link>
            <div className="navbar__buttons">
                <Search />
                <div>
                    <Link className="signinbutton" to="/create">create</Link>
                </div>
                <div>
                    <Link className="signinbutton" to="/head">learn</Link>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;
