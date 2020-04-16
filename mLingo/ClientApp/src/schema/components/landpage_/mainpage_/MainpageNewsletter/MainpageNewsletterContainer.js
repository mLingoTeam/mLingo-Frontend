import React from 'react';

import validate from '../../../../../services/validate'
import { authentication_service } from '../../../../../services/authentication/authentication';

import View from './MainpageNewsletterView';

class MainpageNewsletterContainer extends React.Component {

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
        if(validate.email(mail)){
           const resp = await authentication_service.newsletter.subscribe({email: mail})
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
            <View state={this.state}/>
        )
    }
}

export default MainpageNewsletterContainer;