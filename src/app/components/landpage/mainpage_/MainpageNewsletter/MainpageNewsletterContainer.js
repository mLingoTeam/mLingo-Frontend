import React from 'react';
import validate from '../../../../../services/validate'
import { authentication_service } from '../../../../../services/authentication/authentication';
import handleResponse from '../../../../../services/handleResponse'

import View from './MainpageNewsletterView';

class MainpageNewsletterContainer extends React.Component {

    constructor(props){
        super(props);
        this.state = { email: "", err: false, success: false};

        this.handleChange = this.handleChange.bind(this);
        this.register = this.register.bind(this);
        this.functions = {
            handleChange: this.handleChange,
            register: this.register
        }
    }


    handleChange(event){

        this.setState({
                ...this.state,
                [event.target.name]: event.target.value
        })
    }

    async register(){
        const mail = this.state.email;
        if(validate.email(mail)){
           const resp = await handleResponse({request: authentication_service.newsletter.subscribe({email: mail})})
            if(resp === false){
                this.setState({
                    ...this.state,
                    err: " Error with our Newsletter... OOOPS :( "
                })
            }
            else{
                this.setState({
                    ...this.state,
                    success: true
                })
            }
        }
         else{
            this.setState({...this.state, err: " Invalid Email "})
         }

    }



    render(){
        return(
            <View state={this.state} functions={this.functions}/>
        )
    }
}

export default MainpageNewsletterContainer;