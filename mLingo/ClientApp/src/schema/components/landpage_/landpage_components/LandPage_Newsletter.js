import React from 'react';
import left from '../../../../img/leftsquare.svg';
import right from '../../../../img/rightsquare.svg'

import helpers from '../../../../services/helpers'
import { authenticationService } from '../../../../services/authentication';

class Landpage_Newsletter extends React.Component {

    constructor(props){
        super(props);
        this.state = { email: "", err: false, success: false};

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
    }


    handleChange(event){

        this.setState({
                ...this.state,
                [event.target.name]: event.target.value
        })
    }

    async register(){
        const mail = this.state.email;
        if(helpers.validateEmail(mail)){
           const resp = await authenticationService.register_newsletter(mail)
            if(resp.status == 200){
                this.setState({
                    ...this.state,
                    success: true
                })
            }
            else{
                this.setState({
                    ...this.state,
                    err: " Error with our Newsletter... OOOPS :( "
                })
            }
        }
         else{
            this.setState({...this.state, err: " Invalid Email "})
         }



    }



    render(){

        return(
            <section id="newsletter-section" className="col-12">
                <div className="left-circle-container col-6">
                    <img src={left} className="left-circle img-fluid"/>
                </div>
                {
                    this.state.success ?
                        <h2 className="newsletter-thanks col-10 col-sm-4">You have just registered successfully, Thank You!</h2> :
                        <div className="newsletter-subscribe col-sm-10 col-md-4">
                            <h2 className="main-page-h2 mb-5">newsletter</h2>
                            <p>awesome content once a week.</p>
                            <p>{"No spam, we promise :)"}</p>
                            <input type="email" className="text my-5" placeholder="email@email.com" name="email" value={this.state.email} onChange={this.handleChange} required/>
                            {
                                this.state.err ? <div>{this.state.err}</div> : null
                            }
                            <br/>
                            <input type="submit" className="green-button px-5" onClick={this.register} value="sign me up"/>
                        </div>

                }


                <div className="right-circle-container col-6">
                    <img src={right} className="right-circle img-fluid"/>
                </div>
            </section>
        )
    }
}

export default Landpage_Newsletter;