import React from "react";
import UserLayout from '../layouts/UserLayout'
import UserHead from '../components/pages-components/UserHead'

class UserPanel extends React.Component {


  render() {
    return (
      <UserLayout>
        <UserHead />
      </UserLayout>
    )
  }
}

export default UserPanel;
