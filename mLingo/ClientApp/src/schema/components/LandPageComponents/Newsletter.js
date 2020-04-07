import React from 'react';
import left from '../../../img/leftsquare.svg';
import right from '../../../img/rightsquare.svg'
import FormField from '../FormComponents/FormField';

class Newsletter extends React.Component {

    constructor(props){
        super(props);
        this.state = {};
    }


    render(){
        return(
            <section id="newsletter-section">
                <img src={left} className="left-circle"/>
                <div className="newsletter-subscribe">
                    <h2>newsletter</h2>
                    <p>awesome content once a week.</p>
                    <p>{"No spam, we promise :)"}</p>
                    <input type="email" className="text" placeholder="email"/>
                    <br/>
                    <button className="green-button px-5">sign me up</button>
                </div>
                <img src={right} className="right-circle"/>
            </section>
        )
    }
}

export default Newsletter;