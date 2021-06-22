import React from "react";
import LayoutUser from '../../layouts/LayoutUser'
import UserHead from '../../components/account/user/UserHead/UserHead';

class User_Head extends React.Component {


  render() {
    return (
      <LayoutUser>
        <UserHead />
      </LayoutUser>
    )
  }
}

export default User_Head;
