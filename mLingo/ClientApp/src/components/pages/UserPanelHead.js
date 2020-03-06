import React from "react";
import Layout from '../layouts/Layout'
import UserHead from '../UserPanelComponents/UserHead'

class UserPanel extends React.Component {


  render() {
    return (
      <Layout>
        <UserHead />
      </Layout>
    )
  }
}

export default UserPanel;
