import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { Divider, Button, Box, Typography, Link, Grid } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Dropzone from "react-dropzone";
import { lightGreen } from "@material-ui/core/colors";
import Checkbox from '@material-ui/core/Checkbox';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HelpIcon from '@material-ui/icons/Help';
import WarningIcon from '@material-ui/icons/Warning';
import CircularProgress from "@material-ui/core/CircularProgress";
import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
  

const styles = theme => ({
//   root: {
//     width: '90%',
//   },
//   button: {
//     marginTop: theme.spacing.unit,
//     marginRight: theme.spacing.unit,
//   },
//   actionsContainer: {
//     marginBottom: theme.spacing.unit * 2,
//   },
//   resetContainer: {
//     padding: theme.spacing.unit * 3,
//   },
//   connector: {
//     display: 'none',
//   },
//   step: {
//     marginBottom: theme.spacing.unit * 5,
//   },
  iconContainer: {
    transform: 'scale(2)',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ['Mail', 'Verifikation', 'Person', 'Fragen', 'Bewegungsdaten'];
}

class Fragebogen extends React.Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            this.setState({
                files: { files },
                noFilesWarning: false
            })
            };
        this.defaultState = {
            vorname: "",
            nachname: "",
            plz: "",
            mail: "",
            code: "",
            geburtTag: "",
            gebMonat: "",
            gebJahr: "",
            telefonnummer: "",
            gebiet: undefined,
            kontakt: undefined,
            erkrankt: undefined,
            begleiterkrankungen: undefined,
            berufstaetig: undefined,
            quarantaene: undefined,
            files: [],
            activeStep: 0,
            noFilesWarning: false
        }
        this.state = this.defaultState
    }

  handleNext = () => {
    this.setState(state => ({
        activeStep: state.activeStep + 1,
        }));
    window.scrollTo(0,0)
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleWeiter = () => {
    // input check:
    if (this.state.mail.length<5) {
        return window.confirm("Bitte gib eine gültige Mail-Adresse ein.")
    }
    else {
        if (this.state.activeStep===4 && this.state.files.length===0 && !this.state.noFilesWarning) {
            this.setState({ noFilesWarning: true })
        }
        else if( this.state.activeStep===4) {
          console.log("sending");
          this.handlePost(this.state);
          return this.handleNext();

        }
        else {
          return this.handleNext();
        }
    }
  }

  handlePost = (data) => {
      console.log(data);
      var endpoint = "https://data.corona-meldung.de/data";

      data['user_id'] = 5;
      let request = new XMLHttpRequest();
      let postString = JSON.stringify(data);
      request.open('POST', endpoint, true);
      request.setRequestHeader('Content-Type', 'application/json');
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          console.log(request.responseText);
          this.handleNext();
        }
      }
      request.send(postString);
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    const promoMessage = "Forscher finden effektiver Maßnahmen gegen COVID-19 dank deinen anonymisierten Standortdaten."

    return (
        <>
            {/* steps: */}
            <div className={classes.root}>
                <Stepper activeStep={activeStep} style={{marginBottom: 15}}>
                {steps.map((label) => {
                    return (
                    <Step key={label} className={classes.step}>
                        <StepLabel classes={{
                        iconContainer: classes.iconContainer
                        }}>
                        <Typography>{label}</Typography>
                        </StepLabel>
                    </Step>
                    );
                })}
                </Stepper>

                {/* get step content: */}
                {/* active step is zero based. */}

                {/* step 1: mail: */}
                {activeStep===0 && (
                    <>
                        <center><Typography variant="h5" color="primary" >Starte mit deiner Mail-Adresse:</Typography></center><br />
                        <Grid container><Box style={{margin: "auto"}}><TextField variant="outlined" label="Mail" style={{minWidth: 300}} onChange={event=> { this.setState({mail: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }} /></Box></Grid>
                        <center><Typography style={{marginTop: 10}}>Ich nehme die <Link href="https://corona-meldung.de/datenschutz" target="_blank">Datenschutzerklärung</Link> zur Kenntnis.</Typography></center>
                    </>
                )}

                {/* step 2: enter mail verification code */}
                {activeStep===1 && (
                    <Grid container>
                    <Box style={{margin: "auto"}}>
                        <Typography variant="h5" color="primary" >Schau in deine Mails</Typography><br />
                        <Typography> und gib den <b>Code</b> ein, den wir dir geschickt haben:</Typography><br />
                        <TextField variant="outlined" label="Code" style={{minWidth: 300}} onChange={event=> { this.setState({code: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }} />
                    </Box>
                  </Grid>

                )}

                {/* step 3: data: */}
                {activeStep===2 && (
                    <Grid container>
                        <Box style={{ margin: "auto" }}>
                            <Typography variant="h5" color="primary" >Über dich</Typography><br />

                            <TextField variant="outlined" label="Vorname" onChange={event=> { this.setState({vorname: event.target.value}) }} />&nbsp;&nbsp;
                            <TextField variant="outlined" label="Nachname" onChange={event=> { this.setState({nachname: event.target.value}) }} /><br /><br />

                            <Typography variant="caption" color="primary" style={{marginLeft: 3}}><b>Geburtsdatum:</b></Typography><br />
                            <TextField variant="outlined" label="Tag" style={{width: 66}} onChange={event=> { this.setState({gebTag: event.target.value}) }} />&nbsp;
                            <TextField variant="outlined" label="Monat" style={{width: 66}} onChange={event=> { this.setState({gebMonat: event.target.value}) }} />&nbsp;
                            <TextField variant="outlined" label="Jahr" style={{width: 68}} onChange={event=> { this.setState({gebJahr: event.target.value}) }} /><br /><br />

                            <TextField variant="outlined" label="Postleitzahl" onChange={event=> { this.setState({plz: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }}/><br /><br />
                        </Box>
                    </Grid>
                )}

                {/* step 4: medical info */}
                {activeStep===3 && (
                  <Grid container>
                    <Box style={{margin: "auto"}}>
                    <Typography variant="h5" color="primary" >Wie es dir geht</Typography><br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ kontakt: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Hattest Du <b>Kontakt</b> (min. 15min, unter 1,5 Meter Entfernung) zu einer nachweislich an COVID-19 erkrankten Person?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.kontakt && (
                            <>
                                <TextField variant="outlined" label="Wo?" />&nbsp;&nbsp;
                                <TextField variant="outlined" label="Wann?" />
                            </>
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ erkrankt: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Bist Du nachweislich an COVID-19 <b>erkrankt</b>?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.erkrankt && (
                            <>
                                <TextField variant="outlined" label="Wann wurdest Du getestet?" />&nbsp;&nbsp;
                                <TextField variant="outlined" label="Seit wann?" />
                            </>
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ quarantaene: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Wurde dir vom Arzt <b>Quarantäne verordnet</b>?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.quarantaene && (
                            <>
                                <TextField variant="outlined" label="Wann wurde sie verordnet?" />&nbsp;&nbsp;
                                <TextField variant="outlined" label="Wann soll sie enden?" />
                            </>
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Welche <b>Symptome</b> bestehen?</FormLabel>
                            {/* <RadioGroup> */}
                                <FormControlLabel control={<Checkbox />} value="0" label="Fieber" />
                                <FormControlLabel control={<Checkbox />} value ="1" label="Schnupfen" />
                                <FormControlLabel control={<Checkbox />} value ="2" label="Luftnot" />
                                <FormControlLabel control={<Checkbox />} value ="3" label="Husten" />
                                <FormControlLabel control={<Checkbox />} value ="4" label="Halsschmerzen" />
                                <FormControlLabel control={<Checkbox />} value ="5" label="Durchfall" />
                                <FormControlLabel control={<Checkbox />} value ="6" label="Übelkeit" />
                                <FormControlLabel control={<Checkbox />} value ="7" label="Erbrechen" />
                                <FormControlLabel control={<Checkbox />} value ="8" label="Brustenge" />
                                <FormControlLabel control={<Checkbox />} value ="9" label="Riechen oder Schmecken beeinträchtigt" />
                                <FormControlLabel control={<Checkbox />} value ="10" label="sonstige" />
                            {/* </RadioGroup> */}
                        </FormControl>

                        <br />
                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ begleiterkrankungen: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Begleiterkrankungen?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.begleiterkrankungen && (
                            <TextField variant="outlined" label="Welche?" style={{width: 400}} />
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ berufstaetig: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Berufstätig?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.berufstaetig && (
                            <TextField variant="outlined" label="Welcher Beruf?" />
                        )}

                    </Box>
                  </Grid>
                )}

                {/* step 3: upload */}
                {activeStep===4 && (
                    <Grid container>
                        <Box style={{margin: "auto"}}>

                            <Typography variant="h5" color="primary">Füge deine Bewegungsdaten hinzu</Typography><br />
                            <Typography style={{color: "#757575"}}>Deine Daten werden noch vor der Übertragung verschlüsselt.</Typography>
                            <Typography style={{color: "#757575", marginTop: 10}}>Sie werden ausschließlich pseudonymisiert von renomierten<br />Forschungseinrichtungen im Gesamtbild ausgewertet.</Typography><br />

                            {/* explanation: */}
                            <Paper elevation={10} style={{maxWidth: 450, backgroundColor: "#f7f9ff"}}>
                                <Typography variant="subtitle1" style={{fontSize: 17, color: "#3f51b5", paddingTop: 10, paddingLeft: 10, paddingBottom: 5 }}><b>So einfach geht's</b></Typography><Divider />
                                <Typography style={{color: "#5c6bc0", padding: 10}}>
                                    Geh auf <Link href="https://takeout.google.com" target="_blank" style={{textDecoration: "underline"}}>takeout.google.com</Link>.<br /><br />
                                    Wähle <strong>Auswahl aufheben</strong> und setze nur bei <strong>Standortverlauf</strong> (fast ganz unten) einen Haken.<br /><br />
                                    Klicke auf <strong>nächster Schritt</strong> und dann auf <strong>Export</strong>.<br /><br />
                                    Klicke auf den Link in der <strong>Mail</strong>, die du max. 5 Minuten später erhälst.<br /><br />
                                    Lade die zip-Datei dann hier hoch:
                                </Typography>
                            </Paper>
                            <br /><br />

                            {/* Dropzone */}
                            <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                            <section className="container">
                                <div {...getRootProps({ className: 'dropzone' })}
                                    style={{ minHeight: 30, width: 450, alignItems: "center", borderWidth: 1, borderRadius: 3, borderColor: "#eeeee", borderStyle: "dashed", backgroundColor: "#edf2ff", color: "#757575", transition: "border .24s ease-in-out", cursor: "pointer" }}
                                >
                                    <input {...getInputProps()} />
                                    {this.state.files.length!==0 ? (<Typography variant="body2" style={{marginLeft: 15, marginTop: 5, color: lightGreen["800"]}}><b>erfolgreich hochgeladen!</b></Typography>) : (<Typography align="center" style={{marginTop: 3}}><AttachFileIcon fontSize="small" style={{width: 20, verticalAlign:"middle"}}/> Klicken zum <strong>Auswählen</strong>, oder <strong>hierein ziehen.</strong></Typography>)}
                                </div>
                            </section>
                            )}
                            </Dropzone>

                            {/* soft no files warning: */}
                            {this.state.noFilesWarning && (
                                <Grid container style={{marginTop: 10}}>
                                    <div style={{ maxWidth: 450, borderWidth: 1, borderStyle: "solid", borderRadius: 3, backgroundColor: "#fff3e0",
                                                color: "#ff9800", transition: "border .24s ease-in-out", margin: "auto" }}>
                                        <Box display="flex" flexDirection="row" style={{ marginLeft: 10, marginTop: 7, marginBottom: 10}}>
                                            <WarningIcon fontSize="small" style={{color: "#ff9800"}} />&nbsp;
                                            <Typography style={{color: "#ff9800", fontSize: 13 }}><strong>Keine Daten hochgeladen</strong></Typography>
                                        </Box>
                                        <Typography style={{color: "#ff9800", marginLeft: 10, marginRight: 10, marginBottom: 7, fontSize: 12 }}>Du hast keine Bewegungsdaten hochgeladen. Du kannst das Formular zwar ohne Bewegungsdaten abschicken. Das hilft der Forschung aber kaum, weil die Bewegungsdaten am wertvollsten für uns sind.</Typography>
                                    </div>
                                </Grid>
                            )}


                        </Box>
                    </Grid>
                )}

                {/* upload progress */}
                {activeStep===5 && (
                    <Grid container>
                    <Box style={{margin: "auto"}}>
                        <center>
                            Deine Daten werden übermittelt.
                            <CircularProgress />
                        </center>
                    </Box>
                    </Grid>
                )}


                {/* thank you page */}
                {activeStep===6 && (
                  <Grid container>
                    <Box style={{margin: "auto"}}>
                        <center>
                            <CheckCircleIcon style={{fontSize: 100, color: "#81c784"}} />
                            <Typography variant="h4" style={{color: "#388e3c"}}>Herzlichen Dank!</Typography><br />
                            <Typography style={{color: "#757575"}}>Deine Daten wurden erfolgreich und sicher übermittelt.</Typography><br />
                            <Typography style={{color: "#757575"}}>Du kannst zusätzlich helfen, indem du<br /> das Projekt in deinem Umfeld bekannt machst.</Typography><br />
                            <Typography style={{color: "#7986cb", marginBottom: 5}} variant="subtitle1"><strong>Teilen über:</strong></Typography>
                            <Box style={{display: "flex"}}>
                                <FacebookShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Facebook</Button></FacebookShareButton>
                                <EmailShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>E-Mail</Button></EmailShareButton>
                                <TwitterShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Twitter</Button></TwitterShareButton>
                                <LinkedinShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Linkedin</Button></LinkedinShareButton>
                                <TelegramShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Telegram</Button></TelegramShareButton>
                                <WhatsappShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Whatsapp</Button></WhatsappShareButton>
                            </Box>
                            <br />

                            <Button variant="outlined" size="small" onClick={()=>{this.setState(this.defaultState)}} style={{marginTop: 30, textTransform: "none", color: "#9e9e9e"}}>eine weitere Person hinzufügen</Button>
                        </center>
                    </Box>
                  </Grid>
                )}

                {/* weiter und zurueck: */}
                {activeStep<5 && (
                    <Box style={{marginTop: 25 }}>
                        <center>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                            variant="outlined"
                            style={{marginRight: 30, textTransform: "none"}}
                        >
                            zurück
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { return this.handleWeiter() }}
                            className={classes.button}
                            style={{textTransform: "none"}}
                        >
                            {activeStep === steps.length - 1 ? 'ABSCHICKEN' : 'WEITER'}
                        </Button>
                        </center>
                    </Box>
                )}

                {/* further explanations: */}
                {activeStep===4 && (
                    <Grid container style={{marginTop: 80}}>
                        <div style={{ maxWidth: 450, borderWidth: 1, borderStyle: "solid", borderRadius: 3, borderColor: "#eeeee",
                                    backgroundColor: "", color: "#c5cae9", transition: "border .24s ease-in-out", margin: "auto" }}>
                            <Box display="flex" flexDirection="row" style={{ marginLeft: 10, marginTop: 7, marginBottom: 10}}>
                                <HelpIcon fontSize="small" style={{color: "#5c6bc0"}} />&nbsp;
                                <Typography style={{color: "#5c6bc0", fontSize: 13 }}><strong>Was bedeutet "pseudonymisiert"?</strong></Typography>
                            </Box>
                            <Typography style={{color: "#9fa8da", marginLeft: 10, marginRight: 10, marginBottom: 7, fontSize: 12 }}>Das heißt, dass wir deinen Daten eine Identifikationsnummer zuordnen. Es wird nur verarbeitet, dass z.B. jemand mit bestimmten
                            Symptomen ein bestimmtes Alter hat. Eine Verbindung zu dir persönlich wird nicht offengelegt.</Typography>
                        </div>
                    </Grid>
                )}
            </div>
        </>
    );
  }
}

Fragebogen.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Fragebogen);
