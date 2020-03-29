import React from "react";
import { user_count } from "../../lib/auth_helpers";

class UserCount extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        'user_count': 'Eine unbekannte Anzahl '
      };

      user_count().then((user_count) => {
        this.setState({
          'user_count': user_count
        })
      });
  }

  render() {
    return (
      <span><b>{this.state.user_count}</b> Benutzer haben ihre Daten bereits gespendet.</span>
    )

  }
}


export default UserCount;
