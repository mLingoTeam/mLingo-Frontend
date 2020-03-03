import React from "react";
import UserPanelLayout from '../layouts/UserPanelLayout'
import UserHead from '../UserPanelComponents/UserHead'

class UserPanel extends React.Component {


  render() {
    return (
      <UserPanelLayout>
        <UserHead />
      </UserPanelLayout>
    )
  }
}

export default UserPanel;
