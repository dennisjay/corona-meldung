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
import { Divider, Button, Box, Typography, Link } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Dropzone from "react-dropzone";
import { lightGreen } from "@material-ui/core/colors";

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
  return ['Mail', 'Daten', 'Fragen'];
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
        this.state = {
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
            files: [],
            activeStep: 0
        }
    }

    onDrop = () => {return true}

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
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
                <Stepper activeStep={activeStep}>
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
                    <Box>
                        <Typography>Wie wir dich erreichen können:</Typography>
                        <TextField variant="outlined" label="Mail" />
                        <Typography>Ich akzeptiere die <Link href="https://corona-meldung.de/datenschutz">Datenschutzerklärung</Link>.</Typography>
                    </Box>
                )}

                {/* step 2: data: */}
                {activeStep===1 && (
                    <Box>
                        <Typography>Über dich</Typography>
                        
                        <TextField variant="outlined" label="Vorname" />&nbsp;&nbsp;
                        <TextField variant="outlined" label="Nachname" /><br /><br />

                        <TextField variant="outlined" label="Mail" /><br /><br />

                        <TextField variant="outlined" label="Geburtsdatum" /><br /><br />

                        <TextField variant="outlined" label="Wohnort" /><br /><br />

                    </Box>
                )}

                {/* step 3: medical info */}
                {activeStep===2 && (
                    <Box>

                        <FormControl component="fieldset" onChange={event => { this.setState({ gebiet: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Waren Sie in den letzten 14 Tagen in einem <b>Gebiet</b>, in dem <b>COVID-19-Fälle aufgetreten</b> sind?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>
                        
                        <br />
                        <Divider />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ kontakt: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Hatten Sie <b>Kontakt</b> (min. 15min, unter 2 Meter Entfernung) zu einer nachweislich an COVID-19 erkrankten Person?</FormLabel>
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

                        <Divider />
                        <br />

                        <FormControl component="fieldset" onChange={event => { this.setState({ erkrankt: event.target.value.localeCompare("0")!==0 }) }}>
                            <FormLabel component="legend">Sind Sie <b>erkrankt</b>?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Nein." />
                                <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                            </RadioGroup>
                        </FormControl>

                        <br />

                        {this.state.erkrankt && (
                            <TextField variant="outlined" label="Seit wann?" />
                        )}

                        <Divider />
                        <br />

                        <FormControl component="fieldset">
                            <FormLabel component="legend">Welche <b>Symptome</b> bestehen?</FormLabel>
                            <RadioGroup>
                                <FormControlLabel control={<Radio />} value="0" label="Fieber" />
                                <FormControlLabel control={<Radio />} value ="1" label="Schnupfen" />
                                <FormControlLabel control={<Radio />} value ="2" label="Luftnot" />
                                <FormControlLabel control={<Radio />} value ="3" label="Husten" />
                                <FormControlLabel control={<Radio />} value ="4" label="Halsschmerzen" />
                                <FormControlLabel control={<Radio />} value ="5" label="Durchfall" />
                                <FormControlLabel control={<Radio />} value ="6" label="sonstige" />
                            </RadioGroup>
                        </FormControl>

                        <br />
                        <Divider />
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

                        <Divider />
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

                        {/* Dropzone */}
                        {/* <Box mb={1} />
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
                        </Dropzone> */}

                    </Box>
                )}

                {/* weiter und zurueck: */}
                <div style={{marginTop: 25}}>
                    <div>
                    <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                    >
                        Zurück
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                    >
                        {activeStep === steps.length - 1 ? 'Abschicken' : 'Weiter'}
                    </Button>
                    </div>
                </div>
            </div>
        </>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(VerticalLinearStepper);