import React from "react";
import UserLayout from '../layouts/UserLayout'
import UserHead from '../components/pages-components/UserHead'

class User_Head extends React.Component {


  render() {
    return (
      <UserLayout>
        <UserHead />
      </UserLayout>
    )
  }
}

export default User_Head;
