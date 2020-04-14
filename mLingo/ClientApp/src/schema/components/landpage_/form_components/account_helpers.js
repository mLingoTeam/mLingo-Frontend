import { authentication_service } from "../../../../services/authentication";

export default account_helpers = {
    account_login,
    account_register
}

// Remember to bind (this) to these functions //

async function account_login() {
    const resolved = await authentication_service.user.login({username: this.state.username, password: this.state.password});

    //if there is not such an user
    const resstatus = (JSON.stringify(resolved.successful));

    if (resstatus == 'false') {
      const err = (JSON.stringify(resolved.errorMessage));
      this.setState({ ...this.state, err: err })

    } // if the user exist save they into the web
    else {
      authentication_service.setIntoLocalStorage({ name: "currentUser", value: resolved.response.username });
      authentication_service.setIntoLocalStorage({ name: "ID", value: resolved.response.id });
      authentication_service.setIntoLocalStorage({ name: "Token", value: resolved.response.token });
    }

    // TO RERENDER WHEN THE ITEM IS SET IN THE LOCALSTORAGE
    this.setState({
      ...this.state,
      isLoading: true
    })
    setTimeout(() => {
      this.setState({
        ...this.state,
        isLoading: false
      })
    }, 1000);

}



async function account_register() {
    const req = await authentication_service.register(
      this.state.username,
      this.state.email,
      this.state.password
    );

    this.sendLoginRequest();
}