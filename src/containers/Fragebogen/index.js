import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
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

function getStepContent(step) {
  switch (step) {
    case 0:
      return `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`;
    case 1:
      return 'An ad group contains one or more ads which target a shared set of keywords.';
    case 2:
      return `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`;
    default:
      return 'Unknown step';
  }
}

class VerticalLinearStepper extends React.Component {
    constructor() {
        super();
        this.onDrop = (files) => {
            this.setState({ files: { files } })
            };
        this.defaultState = {
            vorname: "",
            nachname: "",
            mail: "",
            geburtsdatum: "",
            wohnort: "",
            telefonnummer: "",
            gebiet: undefined,
            kontakt: undefined,
            erkrankt: undefined,
            begleiterkrankungen: undefined,
            berufstaetig: undefined,
            quarantaene: undefined,
            files: [],
            activeStep: 0
        }
        this.state = this.defaultState
    }

    onDrop = () => {return true}

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

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

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
                        }}>{label}
                        </StepLabel>
                    </Step>
                    );
                })}
                </Stepper>

                {/* get step content: */}
                {/* active step is zero based. */}
                
                {/* step 1: mail: */}
                {activeStep===0 && (
                  <Grid container>  
                    <Box style={{margin: "auto"}}>
                        <Typography variant="h5" color="primary" >Starte mit deiner Mail-Adresse:</Typography><br />
                        <TextField variant="outlined" label="Mail" style={{minWidth: 300}} />
                        <Typography style={{marginTop: 10}}>Ich akzeptiere die <Link href="https://corona-meldung.de/datenschutz">Datenschutzerklärung</Link>.</Typography>
                    </Box>
                  </Grid>
                )}

                {/* step 2: enter mail verification code */}
                {activeStep===1 && (
                    <Grid container>  
                    <Box style={{margin: "auto"}}>
                        <Typography variant="h5" color="primary" >Schau in deine Mails</Typography><br />
                        <Typography> und gib den <b>Code</b> ein, den wir dir geschickt haben:</Typography><br />
                        <TextField variant="outlined" label="Code" style={{minWidth: 300}} />
                    </Box>
                  </Grid>

                )}

                {/* step 3: data: */}
                {activeStep===2 && (
                    <Grid container>
                        <Box style={{ margin: "auto" }}>
                            <Typography variant="h5" color="primary" >Über dich</Typography><br />
                            
                            <TextField variant="outlined" label="Vorname" />&nbsp;&nbsp;
                            <TextField variant="outlined" label="Nachname" /><br /><br />

                            <Typography variant="caption" color="primary"><b>Geburtsdatum:</b></Typography><br />
                            <TextField variant="outlined" label="Tag" style={{width: 66}} />&nbsp;
                            <TextField variant="outlined" label="Monat" style={{width: 66}} />&nbsp;
                            <TextField variant="outlined" label="Jahr" style={{width: 68}} /><br /><br />

                            <TextField variant="outlined" label="Postleitzahl" /><br /><br />
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
                            <FormLabel component="legend">Bist Du nachweislich an Covid-19 <b>erkrankt</b>?</FormLabel>
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
                            <TextField variant="outlined" label="Welche?" />
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
                        <Typography style={{color: "#757575", marginTop: 10}}>Sie werden ausschließlich pseudonymisiert von rennomierten<br />Forschungseinrichtungen im Gesamtbild ausgewertet.</Typography><br />

                            {/* Dropzone */}
                            <Box mb={1} />
                            <Dropzone onDrop={this.onDrop}>
                            {({ getRootProps, getInputProps }) => (
                                <section className="container">
                                <div {...getRootProps({ className: 'dropzone' })}
                                    style={{ minHeight: 30, width: 450, alignItems: "center", borderWidth: 1, borderRadius: 3, borderColor: "#eeeee", borderStyle: "dashed", backgroundColor: "#fafafa", color: "#bdbdbd", transition: "border .24s ease-in-out", cursor: "pointer" }}
                                >
                                    <input {...getInputProps()} />
                                    {this.state.files.length!==0 ? (<Typography variant="body2" style={{marginLeft: 15, marginTop: 5, color: lightGreen["800"]}}><b>erfolgreich hochgeladen!</b></Typography>) : (<Typography align="center" style={{marginTop: 3}}><AttachFileIcon fontSize="small" style={{width: 20, verticalAlign:"middle"}}/> Klicken, um <b>Dateien</b> hochzuladen, oder hierein ziehen.</Typography>)}
                                </div>
                                </section>
                            )}
                            </Dropzone>

                        </Box>
                    </Grid>
                )}

                {/* thank you page */}
                {activeStep===5 && (
                  <Grid container>  
                    <Box style={{margin: "auto"}}>
                        <center>
                            <CheckCircleIcon style={{fontSize: 100, color: "#81c784"}} />
                            <Typography variant="h4" style={{color: "#388e3c"}}>Herzlichen Dank!</Typography><br />
                            <Typography style={{color: "#757575"}}>Deine Daten wurden erfolgreich und sicher übermittelt.</Typography><br />
                            <Typography style={{color: "#757575"}}>Du kannst zusätzlich helfen, indem du<br /> das Projekt in deinem Umfeld bekannt machst.</Typography>
                        
                            <Button variant="outlined" size="small" onClick={()=>{this.setState(this.defaultState)}} style={{marginTop: 30, textTransform: "none"}}>eine weitere Person hinzufügen</Button>
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
                            onClick={this.handleNext}
                            className={classes.button}
                            style={{textTransform: "none"}}
                        >
                            {activeStep === steps.length - 1 ? 'ABSCHICKEN' : 'WEITER'}
                        </Button>
                        </center>
                    </Box>
                )}
            </div>
        </>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);