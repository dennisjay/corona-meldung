import React from "react";
import { Box, Button, Divider, Grid, Typography } from "@material-ui/core";
import Overview from "../overview";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import LinearProgress from "@material-ui/core/LinearProgress";
import { postData, uploadFiles } from "../../../lib/upload_helpers";
import { decrypt, encrypt } from "../../../lib/encrypt_helpers";

const KEYS_TO_TRANSMIT = [
  'gebJahr', 'plz', 'berufstaetig', 'beruf',
  'kontakt', 'kontaktWo', 'kontaktWann',
  'erkrankt', 'erkranktSeit', 'erkranktTest',
  'quarantaene', 'quarantaeneAnordnung', 'quarantaeneBis',
  'begleiterkrankungen', 'begleiterkrankungenText',
  'userPseudonym',
  'symptom1',
  'symptom2',
  'symptom3',
  'symptom4',
  'symptom5',
  'symptom6',
  'symptom7',
  'symptom8',
  'symptom9',
  'symptom10',
  'symptom11'
];


class SendConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eingewilligt: false,
      uploading: false,
      ...this.props.user,
      ...this.props.medical,
      ...this.props.personal,
      ...this.props.location
    }
  }

  validateWeiter = async () =>{
    this.setState({
      uploading: true
    });
     try {
       await this.handlePost(this.state);
       this.props.handleWeiter();
     }
     catch(e) {
       console.error(e);
       window.confirm("Fehler beim upload!");
       this.setState({
         uploading: false
       })
     }
  };

  handlePost = async (data) => {
    console.log("handlePost", data);
    let toSend = {
      'user_pseudonym': data.userPseudonym,
      'location_file_urls': [],
      'personal_data': {}
    };

    if (data.files.files && data.files.files.length > 0) {
      toSend.location_file_urls = await uploadFiles(data.userPseudonym, data.files.files, (progress, stats) => {
        this.setState(state => ({
          uploadProgress: progress * 100.0,
        }));
      });
    }

    for (let key of KEYS_TO_TRANSMIT) {
      toSend.personal_data[key] = data[key];
    }


    const jwk_key = JSON.parse(data.jwk_key);
    const encryped = await encrypt(jwk_key, JSON.stringify(toSend.personal_data));
    console.log("ENCRYPTED", encryped);
    const decrypted = await decrypt(jwk_key, encryped);
    console.log("DECRYPTED", decrypted);

    toSend.personal_data = encryped;

    console.log("POSTING", toSend);
    return postData(data.userPseudonym, toSend);


  };

  render() {
    const uploading = this.state.uploading ;

    return (
      <>
      {uploading===false && (
        <>
        <center><Typography color="primary" style={{marginBottom: 15}}>Folgende Daten werden nach Deiner Bestätigung übermittelt:</Typography></center>

        <Overview data={this.state} />

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
              onClick={this.props.handleBack}
              variant="outlined"
              style={{marginRight: 30, textTransform: "none"}}
            >
              zurück
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!this.state.eingewilligt}
              onClick={this.validateWeiter}
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
