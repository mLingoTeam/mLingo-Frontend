import React from "react";
import User_Layout from '../layouts/User_Layout'
import User_Head_Component from '../components/user_/user_components/User_Head_Component';

class User_Head extends React.Component {


  render() {
    return (
      <User_Layout>
          <User_Head_Component />
      </User_Layout>
    )
  }
}

export default User_Head;
