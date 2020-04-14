import React from 'react';
import { Link } from 'react-router-dom';

const User_Menu_Category = (props) => {

    return (
        <div class="category" key={props.text}>
            <props.icon />
            <Link to={props.link}>{props.text}</Link>
        </div>
    )
}

export default User_Menu_Category;