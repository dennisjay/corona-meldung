import React from "react";
import { Box, Grid, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import WizardNavigation from "../navigation";
import { auth_register, login_request } from "../../../lib/auth_helpers";

const EMAIL_VALIDATION_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

class Email extends React.Component {
  constructor() {
    super();

    this.state = {
      mail: "",
      loginRequired: false

    };




  }

  validateWeiter = async () => {
    if (!this.state.mail.match(EMAIL_VALIDATION_REGEX)) {
      window.confirm("Bitte gib eine gültige Mail-Adresse ein.")
    } else {
      try {
        await auth_register(this.state.mail);
        this.props.handleWeiter('user', this.state);
      } catch (reason) {
        if (reason === 'already_registered') {
          this.setState({
            loginRequired: true
          });

          try {
            await login_request(this.state.mail);
            this.props.handleWeiter('user', this.state);
          } catch {
            window.confirm("Fehler bei Login.")
          }
        } else {
          window.confirm("Bitte gib eine gültige Mail-Adresse ein. Jede Mail-Adresse kann zudem nur einmal verwendet werden.")
        }
      }
    }
  };



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

};


export default Email;
