import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';

import { Button, Box, Typography,  Grid } from '@material-ui/core';

import HelpIcon from '@material-ui/icons/Help';
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from '@material-ui/core/CircularProgress'
import { uploadFiles, postData } from '../../lib/upload_helpers';

import {
    EmailShareButton,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
  } from "react-share";

import { decrypt, encrypt } from "../../lib/encrypt_helpers";
import Email from "./Steps/email";
import Verification from "./Steps/verfication";
import Medical from "./Steps/medical";
import Personal from "./Steps/personal";
import SendConfirm from "./Steps/sendConfirm";
import Upload from "./Steps/upload";
import ThankYou from "./Steps/thankYou";



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

const EMAIL_VALIDATION_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/


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

        /*
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
            eingewilligt: false,
            gAccount: undefined
        };*/
        this.defaultState = {
            activeStep: 0,
            user: {},
            personal: {},
            medical: {},
            files: {}
        };

        this.state = this.defaultState;
    }

  handleReset = () => {
      this.setState(this.defaultState);
    };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
    });
  }

  handleWeiter = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
    window.scrollTo(0,0);



      /*
      case 0:
        if (!this.state.mail.match(EMAIL_VALIDATION_REGEX)) {
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
          login_confirm(this.state.mail, this.state.code.trim())
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
          auth_confirm(this.state.mail, Number(this.state.code.trim()))
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
    }      */
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
                {activeStep===0 && ( <Email
                    handleWeiter={this.handleWeiter}
                    handleBack={this.handleBack}
                    activeStep={this.state.activeStep} /> )}

                {/* step 2: enter mail verification code */}
                {activeStep===1 && ( <Verification
                  handleWeiter={this.handleWeiter}
                  handleBack={this.handleBack}
                  activeStep={this.state.activeStep} /> )}

                {/* step 3: data: */}
                {activeStep===2 && ( <Personal
                  handleWeiter={this.handleWeiter}
                  handleBack={this.handleBack}
                  activeStep={this.state.activeStep} /> )}

                {/* step 4: medical info */}
                {activeStep===3 && <Medical
                  handleWeiter={this.handleWeiter}
                  handleBack={this.handleBack}
                  activeStep={this.state.activeStep} />}

              {activeStep===4 && <Upload
                handleWeiter={this.handleWeiter}
                handleBack={this.handleBack}
                activeStep={this.state.activeStep} />}



              {activeStep===5 && <SendConfirm
                handleWeiter={this.handleWeiter}
                handleBack={this.handleBack}
                activeStep={this.state.activeStep}
              />}


                {/* thank you page */}
                {activeStep===6 && (<ThankYou
                    handleReset={this.handleReset}
                  />
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
