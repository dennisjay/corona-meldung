import React from "react";
import { Box, Grid, Link, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import WizardNavigation from "../navigation";

class Personal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gebJahr: "",
      plz: "",
      berufstaetig: "",
      beruf: "",
      ...this.props.personal
    }




  }

  validateWeiter = () =>{
    this.props.handleWeiter("personal", this.state);
  }

  render() {
    return (
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


          <WizardNavigation validateWeiter={this.validateWeiter} goBack={this.props.handleBack} activeStep={this.props.activeStep}/>

        </Box>
      </Grid>
    );
  }

}

export default Personal;
