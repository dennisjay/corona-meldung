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
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from '@material-ui/core/CircularProgress'
import { uploadFiles, postData } from '../../lib/upload_helpers';
import Tooltip from "@material-ui/core/Tooltip";
import { auth_register, auth_confirm, login_request, login_confirm } from '../../lib/auth_helpers';
import Overview from "./overview";

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";
import UserCount from "./userCount";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import { decrypt, encrypt } from "../../lib/encrypt_helpers";



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

function getSteps() {
  return ['Mail', 'Verifikation', 'Person', 'Fragen', 'Bewegungsdaten', 'Prüfung'];
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
            gebJahr: "",
            gebiet: undefined,
            kontakt: undefined,
            erkrankt: undefined,
            begleiterkrankungen: undefined,
            berufstaetig: true,
            quarantaene: undefined,
            kontaktWann: "",
            kontaktWo: "",
            quarantaeneAnordnung: "",
            quarantaeneBis: "",
            erkranktTest: "",
            erkranktSeit: "",
            begleiterkrankungenText: "",
            beruf: "",
            files: [],
            activeStep: 0,
            noFilesWarning: false,
            uploadProgress: 0,
            jwk_key: "",
            loginRequired: false,
            processingStep: false,
            userPseudonym: '',
            symptom1: false,
            symptom2: false,
            symptom3: false,
            symptom4: false,
            symptom5: false,
            symptom6: false,
            symptom7: false,
            symptom8: false,
            symptom9: false,
            symptom10: false,
            symptom11: false,
            eingewilligt: false
        };
        this.state = this.defaultState
    }


  componentDidMount() {
    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });
  }

  handleNext = () => {
    this.setState(state => ({
        activeStep: state.activeStep + 1,
        processingStep: false
        }));
    window.scrollTo(0,0)
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
      processingStep: false
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      processingStep: false
    });
  };

  handleWeiter = () => {
    console.log(this.state.activeStep);

    this.setState(state => ({
      processingStep: true
    }));

    switch(this.state.activeStep)
    {
      case 0:
        if (this.state.mail.length < 5) {
          window.confirm("Bitte gib eine gültige Mail-Adresse ein.")
          this.setState({  processingStep: false });
        }
        else {
          auth_register(this.state.mail)
            .then(() => {
              console.log("register");
              this.handleNext();
            })
            .catch( (reason) => {
              if( reason === 'already_registered') {
                  this.setState(state => ({
                    loginRequired: true
                  }));

                  login_request(this.state.mail)
                  .then(() => {
                    console.log("login");
                    this.handleNext();
                  })
                  .catch( () => {
                    window.confirm("Fehler bei Login.")
                    this.setState({  processingStep: false });
                  });
              }

              else {
                window.confirm("Bitte gib eine gültige Mail-Adresse ein. Jede Mail-Adresse kann zudem nur einmal verwendet werden.")
                this.setState({  processingStep: false });
              }
            })
        }
        break;
      case 1:
        console.log( this.state.loginRequired );
        if( this.state.loginRequired ){
          login_confirm(this.state.mail, this.state.code)
            .then((result) => {
              console.log("login confirm", result);
              this.setState(state => ({
                userPseudonym: result.pseudonym,
                jwk_key: result.jwk_key
              }));

              this.handleNext();
            })
            .catch(() => {
              window.confirm("Das ist nicht der richtige Code.")
              this.setState({  processingStep: false });;
            });

        }
        else {
          auth_confirm(this.state.mail, Number(this.state.code))
            .then((result) => {
              console.log("register confirm", result);
              this.setState(state => ({
                userPseudonym: result.pseudonym,
                jwk_key: result.jwk_key
              }));

              this.handleNext();
            })
            .catch(() => {
              window.confirm("Das ist nicht der richtige Code.");
              this.setState({  processingStep: false });
            });
        }
        break;

      case 4:
        if (this.state.files.length === 0 && !this.state.noFilesWarning) {
          this.setState({ noFilesWarning: true, processingStep: false })
        }
        else {
          this.handleNext();
        }
        break;

      case 5:
          console.log("sending");
          this.handleNext();
          this.handlePost(this.state)
            .then(() => {
              this.handleNext();
            })
            .catch(() => {
              window.confirm("Fehler beim upload!");
              this.handleBack();
            });
          break;
      default:
        this.handleNext();
        break;
    }
  };




  handlePost = async (data) => {


    console.log("handlePost", data);
    let toSend = {
      'user_pseudonym': data.userPseudonym,
      'location_file_urls': [],
      'personal_data': {}
    };

    if( data.files.files && data.files.files.length > 0) {
      toSend.location_file_urls = await uploadFiles(data.userPseudonym, data.files.files, (progress, stats) => {
        this.setState(state => ({
          uploadProgress: progress * 100.0,
        }));
      });
    }

    for( let key of KEYS_TO_TRANSMIT ){
      toSend.personal_data[key] = data[key];
    }


    const jwk_key = JSON.parse(data.jwk_key);
    const encryped = await encrypt(jwk_key, JSON.stringify(toSend.personal_data));
    console.log("ENCRYPTED",  encryped);
    const decrypted = await decrypt(jwk_key, encryped);
    console.log("DECRYPTED", decrypted);

    toSend.personal_data = encryped;

    console.log("POSTING", toSend);
    return postData(data.userPseudonym, toSend);


  };

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

                        <Grid container><Box style={{margin: "auto"}}><TextField variant="outlined" label="Mail" style={{minWidth: 300}} value={this.state.mail} onChange={event=> { this.setState({mail: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }} /></Box></Grid>
                        <center><Typography style={{marginTop: 10}}>Ich nehme die <Link href="https://corona-meldung.de/datenschutz" target="_blank">Datenschutzerklärung</Link> zur Kenntnis.</Typography></center>
                    </>
                )}

                {/* step 2: enter mail verification code */}
                {activeStep===1 && (
                    <Grid container>
                    <Box style={{margin: "auto"}}>
                        <Typography variant="h5" color="primary" >Schau in deine Mails</Typography><br />
                        <Typography> und gib den <b>Code</b> ein, den wir dir geschickt haben:</Typography><br />
                        <TextField variant="outlined" label="Code" style={{minWidth: 300}} value={this.state.code} onChange={event=> { this.setState({code: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }} /><br />
                        <Typography variant="caption" style={{marginLeft: 15, marginTop: 10, color: "#bdbdbd"}}>Schau ggf. in deinen <b>Spam-Ordner</b>.</Typography><br />
                    </Box>
                  </Grid>

                )}

                {/* step 3: data: */}
                {activeStep===2 && (
                    <Grid container>
                        <Box style={{ margin: "auto" }}>
                            <Typography variant="h5" color="primary" >Über dich</Typography><br />

                            {/* <TextField variant="outlined" label="Vorname" onChange={event=> { this.setState({vorname: event.target.value}) }} />&nbsp;&nbsp;
                            <TextField variant="outlined" label="Nachname" onChange={event=> { this.setState({nachname: event.target.value}) }} /><br /><br /> */}

                            {/* <Typography variant="caption" color="primary" style={{marginLeft: 3}}><b>Geburtsdatum:</b></Typography><br /> */}
                            {/* <TextField variant="outlined" label="Tag" style={{width: 66}} onChange={event=> { this.setState({gebTag: event.target.value}) }} />&nbsp;
                            <TextField variant="outlined" label="Monat" style={{width: 66}} onChange={event=> { this.setState({gebMonat: event.target.value}) }} />&nbsp; */}

                            <TextField variant="outlined" label="Geburtsjahr" value={this.state.gebJahr} onChange={event=> { this.setState({gebJahr: event.target.value}) }} /><br />
                            <Tooltip arrow title="Das benötigen wir, um anhand einer Alterkategorisierung Informationen über die Ausdifferenzierung des Virus zu gewinnen.">
                                <Typography variant="caption" style={{marginLeft: 15, color: "#5c6bc0"}}>Warum ist das relevant?</Typography>
                            </Tooltip>
                            <br /><br />

                            <TextField variant="outlined" label="Postleitzahl" value={this.state.plz} onChange={event=> { this.setState({plz: event.target.value}) }} /><br />
                            <Tooltip arrow title="Damit fügen wir deinen Daten zusätzlich die Dimension deines Heimatgebiets hinzu.">
                                <Typography variant="caption" style={{marginLeft: 15, color: "#5c6bc0"}}>Warum ist das relevant?</Typography>
                            </Tooltip>
                            <br /><br />

                            <FormControl style={{marginLeft: 15}} component="fieldset" onChange={event => { this.setState({ berufstaetig: event.target.value.localeCompare("0")!==0 }) }}>
                                <FormLabel component="legend">Berufstätig?</FormLabel>
                                <RadioGroup style={{display: "flex", flexDirection: "row"}}>
                                    <FormControlLabel control={<Radio />} value="0" checked={!this.state.berufstaetig} label="Nein." />
                                    <FormControlLabel control={<Radio />} value ="1" checked={this.state.berufstaetig} label="Ja." />
                                </RadioGroup>
                            </FormControl><br />
                            <Tooltip arrow title="So können wir deine Gefährdung einordnen.">
                                <Typography variant="caption" style={{marginLeft: 15, color: "#5c6bc0"}}>Warum ist das relevant?</Typography>
                            </Tooltip>

                            <br /><br />

                            {this.state.berufstaetig && (
                                <TextField variant="outlined" label="Welcher Beruf?" value={this.state.beruf} onChange={event=> { this.setState({beruf: event.target.value}) }} onKeyDown={key=>{ if (key.keyCode===13) { this.handleWeiter() } }}/>
                            )}

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
                                <FormControlLabel control={<Radio />} value="0" checked={!this.state.kontakt} label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" checked={this.state.kontakt} label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.kontakt && (
                            <>
                                <TextField variant="outlined" label="Wo?" value={this.state.kontaktWo} onChange={event=> { this.setState({kontaktWo: event.target.value}) }} />&nbsp;&nbsp;
                                <TextField variant="outlined" label="Wann?" value={this.state.kontaktWann} onChange={event=> { this.setState({kontaktWann: event.target.value}) }} />
                            </>
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ erkrankt: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Bist Du nachweislich an COVID-19 <b>erkrankt</b>?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" checked={!this.state.erkrankt} label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" checked={this.state.erkrankt} label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.erkrankt && (
                            <>
                                <TextField variant="outlined" label="Wann wurdest Du getestet?" value={this.state.erkranktTest} onChange={event=> { this.setState({erkranktTest: event.target.value}) }} />&nbsp;&nbsp;
                                <TextField variant="outlined" label="Seit wann?" value={this.state.erkranktSeit} onChange={event=> { this.setState({erkranktSeit: event.target.value}) }} />
                            </>
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ quarantaene: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Wurde dir vom Arzt <b>Quarantäne verordnet</b>?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" checked={!this.state.quarantaene} label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" checked={this.state.quarantaene} label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.quarantaene && (
                            <>
                                <TextField variant="outlined" label="Wann wurde sie verordnet?" value={this.state.quarantaeneAnordnung} onChange={event=> { this.setState({quarantaeneAnordnung: event.target.value}) }}/>&nbsp;&nbsp;
                                <TextField variant="outlined" label="Wann soll sie enden?" value={this.state.quarantaeneBis} onChange={event=> { this.setState({quarantaeneBis: event.target.value}) }} />
                            </>
                        )}

                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Welche <b>Symptome</b> hast du?</FormLabel>
                            {/* <RadioGroup> */}
                                <FormControlLabel control={<Checkbox />} value ="0" label="Fieber" checked={this.state.symptom1} onChange={() => { this.setState({ symptom1: !this.state.symptom1 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="1" label="Schnupfen" checked={this.state.symptom2} onChange={() => { this.setState({ symptom2: !this.state.symptom2 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="2" label="Luftnot" checked={this.state.symptom3} onChange={() => { this.setState({ symptom3: !this.state.symptom3 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="3" label="Husten" checked={this.state.symptom4} onChange={() => { this.setState({ symptom4: !this.state.symptom4 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="4" label="Halsschmerzen" checked={this.state.symptom5} onChange={() => { this.setState({ symptom5: !this.state.symptom5 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="5" label="Durchfall" checked={this.state.symptom6} onChange={() => { this.setState({ symptom6: !this.state.symptom6 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="6" label="Übelkeit" checked={this.state.symptom7} onChange={() => { this.setState({ symptom7: !this.state.symptom7 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="7" label="Erbrechen" checked={this.state.symptom8} onChange={() => { this.setState({ symptom8: !this.state.symptom8 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="8" label="Brustenge" checked={this.state.symptom9} onChange={() => { this.setState({ symptom9: !this.state.symptom9 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="9" label="Riechen oder Schmecken beeinträchtigt" checked={this.state.symptom10} onChange={() => { this.setState({ symptom10: !this.state.symptom10 }) }} />
                                <FormControlLabel control={<Checkbox />} value ="10" label="sonstige" checked={this.state.symptom11} onChange={() => { this.setState({ symptom11: !this.state.symptom11 }) }} />
                            {/* </RadioGroup> */}
                        </FormControl>

                        <br />
                        <Divider style={{marginTop: 15}} />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ begleiterkrankungen: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Weitere Erkrankungen?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" checked={!this.state.begleiterkrankungen} label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" checked={this.state.begleiterkrankungen} label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.begleiterkrankungen && (
                            <TextField variant="outlined" label="Welche?" style={{width: 400}} value={this.state.begleiterkrankungenText} onChange={event=> { this.setState({begleiterkrankungenText: event.target.value}) }}/>
                        )}

                    </Box>
                  </Grid>
                )}

                {/* step 3: upload */}
                {activeStep===4 && (
                    <Grid container>
                        <Box style={{margin: "auto"}}>

                            <Typography variant="h5" color="primary">Füge deine Bewegungsdaten hinzu (optional)</Typography><br />
                            {/* Hast du einen Google Account -> Ja: Rest einblenden */}
                            <Typography style={{color: "#757575"}}>Deine Daten werden noch vor der Übertragung verschlüsselt.</Typography>
                            <Typography style={{color: "#757575", marginTop: 10}}>Sie werden ausschließlich pseudonymisiert von renomierten<br />Forschungseinrichtungen verarbeitet.</Typography><br />

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
                                    {this.state.files.length!==0 ? (<Box style={{display: "flex", justifyContent: "space-around"}}><Typography variant="body2" style={{marginLeft: 15, marginTop: 5, color: lightGreen["800"]}}><b>erfolgreich hochgeladen!</b></Typography>&nbsp;&nbsp;<Button disableElevation variant="contained" size="small" style={{color: "#757575"}} onClick={()=>{this.setState({ files: [] })}}>löschen</Button></Box>) : (<Typography align="center" style={{marginTop: 3}}><AttachFileIcon fontSize="small" style={{width: 20, verticalAlign:"middle"}}/> Klicken zum <strong>Auswählen</strong>, oder <strong>hierein ziehen.</strong></Typography>)}
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


              {activeStep===5 && (
                <>
                  <center><Typography color="primary" style={{marginBottom: 15}}>Folgende Daten werden nach Deiner Bestätigung übermittelt:</Typography></center>

                  <Overview data={this.state} />

                  <br />
                  <center><Typography variant="body" style={{color: "#bdbdbd"}}>Du kannst auf 'zurück' klicken und Änderungen vornehmen,<br />ohne dass du etwas nochmal ganz neu eingeben musst.</Typography></center>
                  <br /><br />
                  <Grid container>
                    <Paper elevation={5} style={{maxWidth: 1024, backgroundColor: "", margin: "auto", padding: 1}}>
                        <Typography style={{color: "#9e9e9e", padding: 5, textAlign: "justify"}}>
                            <Typography style={{fontSize: 16, marginBottom: "0.3em"}}>Einwilligung gemäß Art. 6 Abs. 1 Buchst. a, 9 Abs. 2 Buchst. a DSGVO in die Verarbeitung meiner personenbezogenen und besonderen personenbezogenen Daten</Typography>
                            <Divider />
                            <Typography variant="body2" style={{margin: "0.3em 0 0.3em 0"}}>Hiermit willige ich zu Zwecken der medizinischen Forschung im Bereich der Virologie und der Pandemieforschung in die Verarbeitung meiner personenbezogenen Daten und meiner besonderen personenbezogene Daten (siehe obige Zusammenfassung) ein.</Typography>
                            <Typography variant="body2" style={{margin: "0 0 0.3em 0"}}>Im Rahmen der Datenverarbeitung werden Ihre Daten erhoben, gespeichert, gegebenenfalls aggregiert, ausgewertet und an renommierte Forschungsinstitute übermittelt.</Typography>
                            <Typography variant="body2" style={{margin: "0 0 0.3em 0"}}>Soweit es zu einer Übermittlung Ihrer personenbezogenen Daten an Forschungsinstitute kommt, erfolgt diese Übermittlung dergestalt, dass den Forschungsinstituten Rückschlüsse auf Ihre Person unmöglich sind.</Typography>
                            <Typography variant="body2" style={{margin: "0 0 0.3em 0"}}>Sie können Ihre Einwilligung jederzeit und ohne Nachteile widerrufen. Den Widerruf können Sie formlos beispielsweise an datenschutz@corona-meldung.de richten.</Typography>
                            <Typography variant="body2" style={{margin: "0 0 0.3em 0"}}>Sobald Sie Ihre Einwilligung widerrufen, werden sämtliche bei uns gespeicherten personenbezogenen Daten und sämtliche bei uns gespeicherten besonderen personenbezogenen Daten vollständig anonymisiert, so dass auch für uns keinerlei Rückschlüsse mehr auf Ihre Person möglich sind.</Typography>
                            <Typography variant="body2" style={{margin: "0 0 0.3em 0"}}>Ein Widerruf Ihrer Einwilligungserklärung berührt nicht die Rechtmäßigkeit der Datenverarbeitungen bis zum Zeitpunkt Ihres Widerrufs. Soweit Ihre personenbezogenen Daten und besonderen personenbezogenen Daten bereits an Forschungsinstitute übermittelt wurden, wird diese Übermittlung rückwirkend ebenfalls nicht rechtswidrig.</Typography>
                        </Typography>
                      </Paper>
                  </Grid>
                  <br />
                  <center>
                    <Checkbox checked={this.state.eingewilligt} onClick={()=>{this.setState({eingewilligt: !this.state.eingewilligt})}} />
                    <Button color="primary" style={{textTransform: "none"}} onClick={()=>{this.setState({eingewilligt: !this.state.eingewilligt})}}><b>Ich erteile die obige Einwilligung.</b></Button>
                  </center>

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
                          disabled={!this.state.eingewilligt}
                          onClick={() => { return this.handleWeiter() }}
                          className={classes.button}
                          style={{textTransform: "none"}}
                      >
                          {activeStep === steps.length - 1 ? 'ABSCHICKEN' : 'WEITER'}
                      </Button>
                      </center>
                  </Box>
                </>
              )}


                {/* upload progress */}
                {activeStep===6 && (
                    <Grid container>
                    <Box style={{margin: "auto"}}>
                        <center>
                            Deine Daten werden übermittelt.
                            <LinearProgress value={this.state.uploadProgress} variant={'determinate'} />
                        </center>
                    </Box>
                    </Grid>
                )}


                {/* thank you page */}
                {activeStep===7 && (
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
                {activeStep<5 && !this.state.processingStep && (
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

              {activeStep<6 && this.state.processingStep && (
                <Box style={{marginTop: 25 }}>
                  <center>
                    <CircularProgress/>
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
                            Symptomen ein bestimmtes Alter hat. Eine Verbindung zu dir persönlich wird nicht offengelegt. </Typography>
                        </div>
                    </Grid>
                )}

              {/* usercount: */}
              {/* <Grid container style={{marginTop: 80}}>
                <Box p={1} style={{ maxWidth: 450, borderWidth: 1, borderStyle: "solid", borderRadius: 3, borderColor: "#eeeee",
                  backgroundColor: "", color: "green", transition: "border .24s ease-in-out", margin: "auto" }}>

                  <UserCount/>
                </Box>
              </Grid> */}

            </div>
        </>
    );
  }
}

Fragebogen.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Fragebogen);
