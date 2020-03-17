import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube, FaPodcast, FaFacebook, FaInstagram } from 'react-icons/fa';


const UserMenu = props => {
    return (
        <div className="UserMenu">
            <div className="navbar__buttons">
                {
                    localStorage.getItem("currentUser") ? <div className="navbar__buttons">
                        <div>
                            <Link className="signinbutton" to="/head">learn</Link>
                        </div>
                        <div>
                            <button className="navbar__registerbutton" >logout</button>
                        </div>
                    </div> : <div className="navbar__buttons"> <div>
                        <Link className="signinbutton" to="/Login">sign in</Link>
                    </div>
                            <div>
                                <Link className="navbar__registerbutton" to="/Register">sign up</Link>
                            </div>
                        </div>
                }
            </div>
        </div >
    );
};

export default UserMenu;