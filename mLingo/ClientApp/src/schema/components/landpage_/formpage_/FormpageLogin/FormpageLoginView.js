import React from "react";
import { Form } from "reactstrap";
import { Link } from 'react-router-dom';
import Form_Input from "../FormInput/FormInput";

const FormpageLoginView = ( { that } ) => {

  return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <Form
            className="col-12 offset-lg-3 col-lg-6"
            onSubmit={e => {
              e.preventDefault();
              that.account_login();
            }}
          >
            <h1 className="col-12 mb-5">sign in</h1>
            {that.fields.map(element => (
              <Form_Input set={element} />
            ))}

            {
              that.state.err != false ? <p>{that.state.err}</p> : null
            }

            <div className="col-12 remember">
              <span>
                <input type="checkbox" id="remember1" className="remembercheck" />
                <label for="remember1">remember me</label>
              </span>
              <Link to="/forgot">forgot password?</Link>
            </div>


            <button className="col-12 col-lg-4 btn green-button">
              get started
            </button>



            <div className="col-12 alreadyaccount">
              <p>Don't have an account? &nbsp; </p><Link to='/register'>sign up</Link>
            </div>
          </Form>
        </div>
      </div>
  )
}

export default FormpageLoginView;
