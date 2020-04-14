import React from "react";

const User_Section_Component = props => {

    return (
        <section class="UserSection">
            <h2>{props.title}</h2>
            <p>{props.description}</p>
            {props.children}
        </section>
    );
}

export default User_Section_Component;