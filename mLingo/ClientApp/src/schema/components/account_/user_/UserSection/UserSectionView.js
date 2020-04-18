import React from "react";

const User_Section_Component = props => {

    return (
        <section className="userhead__section">
            <div className="section__title">{props.title}</div>
            <div className="section__description">{props.description}</div>
            {props.children}
        </section>
    );
}

export default User_Section_Component;