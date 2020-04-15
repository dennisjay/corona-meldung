import { Box, Button, Divider, Grid, Link, Typography } from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import Dropzone from "react-dropzone";
import { lightGreen } from "@material-ui/core/colors";
import AttachFileIcon from "@material-ui/core/SvgIcon/SvgIcon";
import React from "react";
import WizardNavigation from "../navigation";
import WarningIcon from '@material-ui/icons/Warning';
import HelpIcon from "@material-ui/icons/Help";
import "./plyr.css";


class Upload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gAccount: undefined,
      files: [],
      ...this.props.location,
      showVideo: false
    }


  }

  onDrop = (files) => {
    this.setState({
      files: { files },
      noFilesWarning: false
    })
  };


  validateWeiter = () =>{
    if (this.state.files.length === 0 && !this.state.noFilesWarning && this.state.gAccount) {
      this.setState({ noFilesWarning: true })
    }
    else {
      this.props.handleWeiter('location', this.state);
    }
  };

  componentDidMount() {
    import('plyr').then((Plyr) => {
      this.setState({ Plyr : Plyr.default });
    });
  }


  render() {
    const {Plyr} = this.state;

    if( Plyr !== undefined) {
      new Plyr('#player', {});
    }

    return (
      <>
    <Grid container>
      <Box style={{ margin: "auto" }}>

        <Typography variant="h5" color="primary">Füge deine Bewegungsdaten hinzu</Typography>
        <Typography style={{ color: "#757575", textAlign: "center" }}>(optional)</Typography><br/>

        <FormControl component="fieldset" onChange={event => {
          this.setState({ gAccount: event.target.value.localeCompare("0") !== 0 })
        }}>
          <FormLabel component="legend">Hast du einen Google-Account?<br/><br/>(z.B. eine Mail-Adresse
            ***@googlemail.com)</FormLabel>
          <RadioGroup style={{ marginTop: 15 }}>
            <FormControlLabel control={<Radio/>} value="0" label="Nein"/>
            <FormControlLabel control={<Radio/>} value="1" checked={this.state.gAccount} label="Ja"/>
          </RadioGroup>
        </FormControl>

        {this.state.gAccount && (
          <>
            <br /><br />
            <Typography style={{ color: "#388e3c" }}><b>Dann kannst du Bewegungsdaten hinzufügen!</b></Typography><br />
            <Typography style={{ color: "#757575" }}>Deine Daten werden noch vor der Übertragung
              verschlüsselt.</Typography>
            <Typography style={{ color: "#757575", marginTop: 10 }}>Sie werden ausschließlich pseudonymisiert von
              renomierten<br/>Forschungseinrichtungen verarbeitet.</Typography><br/>

            {/* explanation: */}
            <Paper elevation={10} style={{ maxWidth: 450, backgroundColor: "#f7f9ff" }}>

              <Typography variant="subtitle1"
                          style={{ fontSize: 17, color: "#3f51b5", paddingTop: 10, paddingLeft: 10, paddingBottom: 5 }}><b>So
                einfach geht's</b></Typography><Divider/>

              <Typography style={{ color: "#5c6bc0", padding: 10 }}>
                Geh auf <Link href="https://takeout.google.com" target="_blank"
                              style={{ textDecoration: "underline" }}>takeout.google.com</Link>.&nbsp;&nbsp;<Button variant="outlined" style={{textTransform: "none"}} onClick={()=>{ this.setState({ showVideo: true }); this.forceUpdate() }} size="small">Video zeigen</Button>


                <div class="container" style={{marginTop: 10, marginBottom: 10}}>
                  <div id="player" data-plyr-provider="youtube" data-plyr-embed-id="pmd6ny5RqMs"></div>
                </div>

                Wähle <strong>Auswahl aufheben</strong> und setze nur bei <strong>Standortverlauf</strong> (fast ganz
                unten) einen Haken.<br/><br/>
                Klicke auf <strong>nächster Schritt</strong> und dann auf <strong>Export</strong>.<br/><br/>
                Klicke auf den Link in der <strong>Mail</strong>, die du max. 5 Minuten später erhälst.<br/><br/>
                Lade die zip-Datei dann hier hoch:
              </Typography>
            </Paper>
            <br/><br/>

            {/* Dropzone */}
            <Dropzone onDrop={this.onDrop}>
              {({ getRootProps, getInputProps }) => (
                <section className="container">
                  <div {...getRootProps({ className: 'dropzone' })}
                       style={{
                         minHeight: 30,
                         width: 450,
                         alignItems: "center",
                         borderWidth: 1,
                         borderRadius: 3,
                         borderColor: "#eeeee",
                         borderStyle: "dashed",
                         backgroundColor: "#edf2ff",
                         color: "#757575",
                         transition: "border .24s ease-in-out",
                         cursor: "pointer"
                       }}
                  >
                    <input {...getInputProps()} />
                    {this.state.files.length !== 0 ? (
                      <Box style={{ display: "flex", justifyContent: "space-around" }}><Typography variant="body2"
                                                                                                   style={{
                                                                                                     marginLeft: 15,
                                                                                                     marginTop: 5,
                                                                                                     color: lightGreen["800"]
                                                                                                   }}><b>erfolgreich
                        hochgeladen!</b></Typography>&nbsp;&nbsp;<Button disableElevation variant="contained"
                                                                         size="small" style={{ color: "#757575" }}
                                                                         onClick={() => {
                                                                           this.setState({ files: [] })
                                                                         }}>löschen</Button></Box>) : (
                      <Typography align="center" style={{ marginTop: 3 }}><AttachFileIcon fontSize="small" style={{
                        width: 20,
                        verticalAlign: "middle"
                      }}/> Klicken zum <strong>Auswählen</strong>, oder <strong>hierein ziehen.</strong></Typography>)}
                  </div>
                </section>
              )}
            </Dropzone>

            {/* soft no files warning: */}
            {this.state.noFilesWarning && (
              <Grid container style={{ marginTop: 10 }}>
                <div style={{
                  maxWidth: 450, borderWidth: 1, borderStyle: "solid", borderRadius: 3, backgroundColor: "#fff3e0",
                  color: "#ff9800", transition: "border .24s ease-in-out", margin: "auto"
                }}>
                  <Box display="flex" flexDirection="row" style={{ marginLeft: 10, marginTop: 7, marginBottom: 10 }}>
                    <WarningIcon fontSize="small" style={{ color: "#ff9800" }}/>&nbsp;
                    <Typography style={{ color: "#ff9800", fontSize: 13 }}><strong>Keine Daten
                      hochgeladen</strong></Typography>
                  </Box>
                  <Typography
                    style={{ color: "#ff9800", marginLeft: 10, marginRight: 10, marginBottom: 7, fontSize: 12 }}>Du hast
                    keine Bewegungsdaten hochgeladen. Du kannst das Formular zwar ohne Bewegungsdaten abschicken. Das
                    hilft der Forschung aber kaum, weil die Bewegungsdaten am wertvollsten für uns sind.</Typography>
                </div>
              </Grid>
            )}
          </>
        )}

        {this.state.gAccount !== undefined && !this.state.gAccount && (
          <center>
            <Typography style={{ color: "#757575", maxWidth: 350, textAlign: "center" }}>Da du keinen Google-Account
              hast, können wir aktuell technisch keine Bewegungsdaten von dir hinzufügen.</Typography>
          </center>
        )}


      </Box>
    </Grid>

    <WizardNavigation validateWeiter={this.validateWeiter} goBack={this.props.handleBack} activeStep={this.props.activeStep}/>

    <Grid container style={{marginTop: 80}}>
      <div style={{ maxWidth: 450, borderWidth: 1, borderStyle: "solid", borderRadius: 3, borderColor: "#eeeee",
        backgroundColor: "", color: "#c5cae9", transition: "border .24s ease-in-out", margin: "auto" }}>
        <Box display="flex" flexDirection="row" style={{ marginLeft: 10, marginTop: 7, marginBottom: 10}}>
          <HelpIcon fontSize="small" style={{color: "#5c6bc0"}} />&nbsp;
          <Typography style={{color: "#5c6bc0", fontSize: 13 }}><strong>Wie sorgen wir dafür, dass deine Daten sicher sind?</strong></Typography>
        </Box>
        <Typography style={{color: "#9fa8da", marginLeft: 10, marginRight: 10, marginBottom: 7, fontSize: 12 }}>Wir ordnen deinen Daten eine Identifikationsnummer zu und
          speichern diese verschlüsselt auf einem gesonderten Server in Deutschland. Dadurch können deine Gesundheits- und Bewegungsdaten bei der Auswertung nicht mit deiner E-Mailadresse in Verbindung gebracht werden. </Typography>
      </div>
    </Grid>


    </>
    )
  }


}


export default Upload;
