import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import WizardNavigation from "../navigation";
import { auth_confirm, login_confirm } from "../../../lib/auth_helpers";

class Verification extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.user,
      code: ''
    };
  }


  validateWeiter = async () => {

    console.log( this.state.loginRequired );
    if( this.state.loginRequired ){
      try {
        const result = await login_confirm(this.state.mail, this.state.code);
        console.log("login confirm", result);
        this.setState({
          userPseudonym: result.pseudonym,
          jwk_key: result.jwk_key
        } );
        this.props.handleWeiter('user', this.state);
      }
      catch {
        window.confirm("Das ist nicht der richtige Code.");
      }
    }
    else {
      try {
        const result = await auth_confirm(this.state.mail, this.state.code);
        console.log("login confirm", result);
        this.setState({
          userPseudonym: result.pseudonym,
          jwk_key: result.jwk_key
        });
        this.props.handleWeiter('user', this.state);
      } catch {
        window.confirm("Das ist nicht der richtige Code.");
      }
    }
  };

  render() {
    return (
      <>
        <Grid container>
          <Box style={{margin: "auto"}}>
            <Typography variant="h5" color="primary" >Schau in deine Mails</Typography><br />
            <Typography> und gib den <b>Code</b> ein, den wir dir geschickt haben:</Typography><br />
            <TextField variant="outlined" label="Code" style={{minWidth: 300}} value={this.state.code.trim()} onChange={event=> { this.setState({code: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.validateWeiter() } }} /><br />
            <Typography variant="caption" style={{marginLeft: 15, marginTop: 10, color: "#bdbdbd"}}>Schau ggf. in deinen <b>Spam-Ordner</b>.</Typography><br />
          </Box>
        </Grid>

        <WizardNavigation validateWeiter={this.validateWeiter} goBack={this.props.handleBack} activeStep={this.props.activeStep}/>
      </>
  );
  }

}

export default Verification;
