import React from "react";

const UserSection = props => {

    return (
        <section class="UserSection">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {props.children}
        </section>
    );
}

export default UserSection;