import { Box, Button } from "@material-ui/core";
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";


class WizardNavigation extends React.Component {
  constructor() {
    super();
    this.state  = {
      processingStep: false
    }

  }


  executeWeiter = async () => {
    this.setState({processingStep:true});
    await this.props.validateWeiter();
    this.setState({processingStep:false});
  };

  render() {
    return (
      <>
        <Box style={{ marginTop: 25 }}>
          <center>
            <Button
              disabled={this.props.activeStep === 0}
              onClick={this.props.goBack}
              variant="outlined"
              style={{ marginRight: 30, textTransform: "none" }}
            >
              zurück
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.executeWeiter}
              style={{ textTransform: "none" }}
            >
              WEITER
            </Button>
          </center>
        </Box>
        {this.state.processingStep && (
          <Box style={{marginTop: 25 }}>
            <center>
              <CircularProgress/>
            </center>
          </Box>
        )}
        </>
      );
    }
}

export default WizardNavigation;
