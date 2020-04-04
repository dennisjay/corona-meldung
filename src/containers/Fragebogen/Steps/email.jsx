import React from "react";
import { Box, Grid, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import WizardNavigation from "../navigation";

class Email extends React.Component {
  constructor() {
    super();

    this.state = {
      mail: "",

    };




  }

  validateWeiter = () => {

    this.props.handleWeiter();


  }



  render() {
    return (
        <>
          <center><Typography variant="h5" color="primary" >Starte mit deiner Mail-Adresse:</Typography></center><br />

          <Grid container><Box style={{margin: "auto"}}><TextField variant="outlined" label="Mail" style={{minWidth: 300}} value={this.state.mail.trim()} onChange={event=> { this.setState({mail: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.validateWeiter() } }} /></Box></Grid>
          <center><Typography style={{marginTop: 10}}>Ich nehme die <Link href="https://corona-meldung.de/datenschutz" target="_blank">Datenschutzerklärung</Link> zur Kenntnis.</Typography></center>


          <WizardNavigation validateWeiter={this.validateWeiter} goBack={this.props.handleBack} activeStep={this.props.activeStep}/>
        </>


      );
    }

}


export default Email;
