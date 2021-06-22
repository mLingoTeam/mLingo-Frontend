import React from "react";
import { Link } from 'react-router-dom';
import FormInput from "../FormInput/FormInput";

const FormpageLoginView = ( { state, fields, functions } ) => {

  return (

      <form
        className="form__form"
        onSubmit={ e => {
          e.preventDefault();
          functions.account_login();
        }}
      >
        <div className="form__title">sign in</div>
        {fields.map(element => (
          <FormInput set={element} />
        ))}

        {
          state.err != false ? <p>{state.err}</p> : null
        }

        <div className="form__remember">
          <span>
            <input className="form__checkbox" type="checkbox" id="remember"  />
            <label className="remember__label" for="remember">remember me</label>
          </span>
          <Link className="remember__forgotpassword" to="/forgot">forgot password?</Link>
        </div>


        <button className="form__getstarted green--button">
          get started
        </button>



        <div className="form__alreadyaccount">
          <div>Don't have an account? &nbsp; </div><Link to='/register'>sign up</Link>
        </div>
      </form>
  )
}

export default FormpageLoginView;
