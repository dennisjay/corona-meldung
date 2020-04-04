import React from "react";
import { Box, Grid, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import WizardNavigation from "../navigation";

class Verification extends React.Component {
  constructor() {
    super();

    this.state = {
      code: ''
    }
  }


  validateWeiter = () => {

    this.props.handleWeiter();


  }

  render() {
    return (
      <>
        <Grid container>
          <Box style={{margin: "auto"}}>
            <Typography variant="h5" color="primary" >Schau in deine Mails</Typography><br />
            <Typography> und gib den <b>Code</b> ein, den wir dir geschickt haben:</Typography><br />
            <TextField variant="outlined" label="Code" style={{minWidth: 300}} value={this.state.code.trim()} onChange={event=> { this.setState({code: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }} /><br />
            <Typography variant="caption" style={{marginLeft: 15, marginTop: 10, color: "#bdbdbd"}}>Schau ggf. in deinen <b>Spam-Ordner</b>.</Typography><br />
          </Box>
        </Grid>

        <WizardNavigation validateWeiter={this.validateWeiter} goBack={this.props.handleBack} activeStep={this.props.activeStep}/>
      </>
  );
  }

}

export default Verification;
