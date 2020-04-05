import React from "react";
import { user_count } from "../../lib/auth_helpers";

class UserCount extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        'visible': false,
        'user_count': 'Eine unbekannte Anzahl '
      };
  }


  componentDidMount() {
    user_count()
      .then((user_count) => {
        this.setState({
          'visible': true,
          'user_count': user_count
        })
      })
      .catch( () => {
        this.setState({
          'visible': true,
          'user_count': 'Eine unbekannte Anzahl '
        })
      });
  }

  render() {
    if( this.state.visible ){
      return (
        <span><b>{this.state.user_count}</b> Benutzer haben ihre Daten bereits gespendet.</span>
      )
    }
    else {
      return (<div>&nbsp;</div>);
    }
  }
}


export default UserCount;
