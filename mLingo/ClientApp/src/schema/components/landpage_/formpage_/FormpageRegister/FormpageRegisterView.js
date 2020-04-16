import React from "react";
import { Form } from "reactstrap";
import FormInput from "../FormInput/FormInput";
import { Link } from 'react-router-dom'
import { FaGoogle, FaFacebook } from 'react-icons/fa';

const FormpageRegisterView = ( { state, fields }) => {

    return (
      <div>
        <div className="registerForm2 col-12 d-flex jusify-content-center flex-wrap">
          <Form
            className="col-12 offset-lg-3 col-lg-6"
            onSubmit={e => {
              state.register_account();
              e.preventDefault();
            }}
          >
            <h1 className="col-12 mb-5">sign up</h1>
            {fields.map(element => (
              <FormInput set={element} />
            ))}

            <button className="col-12 offset-lg-4 col-lg-4 btn green-button registerbutton">
              get started
            </button>
            <div className="col-12">
              <button className="col-12 fbconnect"><FaFacebook /> Sign in with Facebook</button>
              <button className="col-12 ggconnect"><FaGoogle /> Sign in with Google</button>
            </div>
            <div className="col-12 alreadyaccount">
              <p>Already have an account? &nbsp; </p><Link to='/login'>sign in</Link>
            </div>
          </Form>
        </div>
      </div>
    )
}

export default FormpageRegisterView;
