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
            <section id="newsletter-section" className="col-12">
                <div className="left-circle-container col-6">
                    <img src={left} className="left-circle img-fluid"/>
                </div>
                <div className="newsletter-subscribe col-sm-10 col-md-4">
                    <h2 className="main-page-h2 mb-5">newsletter</h2>
                    <p>awesome content once a week.</p>
                    <p>{"No spam, we promise :)"}</p>
                    <input type="email" className="text my-5" placeholder="email"/>
                    <br/>
                    <button className="green-button px-5">sign me up</button>
                </div>
                <div className="right-circle-container col-6">
                    <img src={right} className="right-circle img-fluid"/>
                </div>
            </section>
        )
    }
}

export default Newsletter;