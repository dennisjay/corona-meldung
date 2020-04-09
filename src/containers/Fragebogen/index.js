import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { Typography } from '@material-ui/core';

import Email from "./Steps/email";
import Verification from "./Steps/verfication";
import Medical from "./Steps/medical";
import Personal from "./Steps/personal";
import SendConfirm from "./Steps/sendConfirm";
import Upload from "./Steps/upload";
import ThankYou from "./Steps/thankYou";
import ReactGA from 'react-ga';


const styles = theme => ({
  iconContainer: {
    transform: 'scale(2)',
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 3
  }
});

function getSteps() {
  return ['Mail', 'Verifikation', 'Person', 'Fragen', 'Bewegungsdaten', 'Prüfung'];
}

class Fragebogen extends React.Component {
  constructor() {
    super();
    this.defaultState = {
      activeStep: 0,
      user: {},
      personal: {},
      medical: {},
      location: {}
    };

    this.state = this.defaultState;
  }

  componentDidMount() {
    let state = JSON.parse(localStorage.getItem('surveyContents')) || this.defaultState;

    //Hack do not cache steps further than 4 because file handles expire during refresh of page
    //TODO save files in IndexedDB
    if( state.activeStep > 4 && this.state.activeStep < 6 ){
      state.activeStep = 4;
      state.location = {};
    }

    this.setState(state);
  }


  setState(state) {
    super.setState(state, () =>{
      localStorage.setItem('surveyContents', JSON.stringify(this.state) );
    });
  }

  handleReset = () => {
    this.setState(this.defaultState);
  };

  handleBack = () => {
    if(this.state.activeStep <= 2){
      // Registration is atomic and cannot be divided
      this.handleReset();
    }
    else {
      this.setState({
        activeStep: this.state.activeStep - 1,
      });
    }
  };

  handleWeiter = (entered_data_key, entered_data) => {
    ReactGA.event({
      category: "Fragebogen",
      action: "Schritt" + this.state.activeStep + " abgeschlossen"
    });

    if(entered_data_key){
      let toUpdate = {};
      toUpdate[entered_data_key] = entered_data;
      this.setState(toUpdate);
    }
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
    if(this.state.activeStep >= 6){
      localStorage.clear(); //Clean up when form finished
    }

    window.scrollTo(0, 0);
  };


  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <>
        {/* steps: */}
        <div className={classes.root}>
          <Stepper activeStep={activeStep} style={{ marginBottom: 15 }}>
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
          {activeStep === 0 && (<Email
            handleWeiter={this.handleWeiter}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
          />)}

          {/* step 2: enter mail verification code */}
          {activeStep === 1 && (<Verification
            handleWeiter={this.handleWeiter}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            user={this.state.user}
          />)}

          {/* step 3: data: */}
          {activeStep === 2 && (<Personal
            handleWeiter={this.handleWeiter}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            personal={this.state.personal}
          />)}

          {/* step 4: medical info */}
          {activeStep === 3 && <Medical
            handleWeiter={this.handleWeiter}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            medical={this.state.medical}
          />}

          {activeStep === 4 && <Upload
            handleWeiter={this.handleWeiter}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            location={this.state.location}

          />}


          {activeStep === 5 && <SendConfirm
            handleWeiter={this.handleWeiter}
            handleBack={this.handleBack}
            activeStep={this.state.activeStep}
            user={this.state.user}
            personal={this.state.personal}
            medical={this.state.medical}
            location={this.state.location}
          />}


          {/* thank you page */}
          {activeStep === 6 && (<ThankYou
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
