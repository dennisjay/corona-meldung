import React from "react";
import { Box, Button, Divider, Grid, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Overview from "../overview";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";

class SendConfirm extends React.Component {
  constructor() {
    super();
    this.state = {
      eingewilligt: false,
      uploading: false
    }
  }

  validateWeiter = () =>{
    this.props.handleWeiter();
  }

  render() {
    const uploading = this.state.uploading ;

    return (
      <>
      {uploading===false && (
        <>
        <center><Typography color="primary" style={{marginBottom: 15}}>Folgende Daten werden nach Deiner Bestätigung übermittelt:</Typography></center>

        {/*<Overview data={this.state} />*/}

        <br />
        <center><Typography variant="body" style={{color: "#bdbdbd"}}>Du kannst auf 'zurück' klicken und Änderungen vornehmen,<br />ohne dass du etwas nochmal ganz neu eingeben musst.</Typography></center>
        <br /><br />
        <Grid container>
          <Paper elevation={5} style={{maxWidth: 500, backgroundColor: "", margin: "auto", padding: 1}}>
            <Typography style={{color: "#9e9e9e", padding: 5, textAlign: "justify"}}>
              <Typography style={{fontSize: 15, marginBottom: "0.3em"}}>Einwilligung in die Verarbeitung meiner personenbezogenen und besonderen personenbezogenen Daten gemäß Art. 6 Abs. 1 Buchst. a, 9 Abs. 2 Buchst. a DSGVO</Typography>
              <Divider />
              <Typography variant="body2" style={{fontSize: 12, margin: "0.3em 0 0.3em 0"}}>Hiermit willige ich zu Zwecken der medizinischen Forschung im Bereich der Virologie und der Pandemieforschung in die Verarbeitung meiner personenbezogenen Daten und meiner besonderen personenbezogene Daten (siehe obige Zusammenfassung) ein.</Typography>
              <Typography variant="body2" style={{fontSize: 12,margin: "0 0 0.3em 0"}}>Im Rahmen der Datenverarbeitung werden Ihre Daten erhoben, gespeichert, gegebenenfalls aggregiert, ausgewertet und an renommierte Forschungsinstitute übermittelt.</Typography>
              <Typography variant="body2" style={{fontSize: 12,margin: "0 0 0.3em 0"}}>Soweit es zu einer Übermittlung Ihrer personenbezogenen Daten an Forschungsinstitute kommt, erfolgt diese Übermittlung dergestalt, dass den Forschungsinstituten Rückschlüsse auf Ihre Person unmöglich sind.</Typography>
              <Typography variant="body2" style={{fontSize: 12,margin: "0 0 0.3em 0"}}>Sie können Ihre Einwilligung jederzeit und ohne Nachteile widerrufen. Den Widerruf können Sie formlos beispielsweise an datenschutz@corona-meldung.de richten.</Typography>
              <Typography variant="body2" style={{fontSize: 12,margin: "0 0 0.3em 0"}}>Sobald Sie Ihre Einwilligung widerrufen, werden sämtliche bei uns gespeicherten personenbezogenen Daten und sämtliche bei uns gespeicherten besonderen personenbezogenen Daten vollständig anonymisiert, so dass auch für uns keinerlei Rückschlüsse mehr auf Ihre Person möglich sind.</Typography>
              <Typography variant="body2" style={{fontSize: 12,margin: "0 0 0.3em 0"}}>Ein Widerruf Ihrer Einwilligungserklärung berührt nicht die Rechtmäßigkeit der Datenverarbeitungen bis zum Zeitpunkt Ihres Widerrufs. Soweit Ihre personenbezogenen Daten und besonderen personenbezogenen Daten bereits an Forschungsinstitute übermittelt wurden, wird diese Übermittlung rückwirkend ebenfalls nicht rechtswidrig.</Typography>
            </Typography>
          </Paper>
        </Grid>
        <br />
        <center>
          <Checkbox checked={this.state.eingewilligt} onClick={()=>{this.setState({eingewilligt: !this.state.eingewilligt})}} />
          <Button color="primary" style={{textTransform: "none"}} onClick={()=>{this.setState({eingewilligt: !this.state.eingewilligt})}}><b>Ich willige ein.</b></Button>
        </center>

        <Box style={{marginTop: 25 }}>
          <center>
            <Button
              disabled={this.props.activeStep === 0}
              onClick={this.handleBack}
              variant="outlined"
              style={{marginRight: 30, textTransform: "none"}}
            >
              zurück
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.eingewilligt}
              onClick={() => { return this.validateWeiter() }}
              style={{textTransform: "none"}}
            >
              ABSCHICKEN
            </Button>
          </center>
        </Box>
        </>
        )}

        {uploading===true && (
          <Grid container>
            <Box style={{ margin: "auto" }}>
              <center>
                Deine Daten werden übermittelt.
                <LinearProgress value={this.state.uploadProgress} variant={'determinate'}/>
              </center>
            </Box>
          </Grid>
        )}
      </>
    );
  }

}

export default SendConfirm;
