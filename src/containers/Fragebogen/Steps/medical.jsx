import React from "react";
import { Box, Divider, Grid, Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Checkbox from "@material-ui/core/Checkbox";
import WizardNavigation from "../navigation";

class Medical extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      erkrankt: undefined,
      begleiterkrankungen: 0,
      quarantaene: undefined,
      kontaktWann: "",
      kontaktWo: "",
      quarantaeneAnordnung: "",
      quarantaeneBis: "",
      erkranktTest: "",
      erkranktSeit: "",
      begleiterkrankungenText: "",
      symptome: false,
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
      ...this.props.medical
      };
  }

  validateWeiter = () =>{
    this.props.handleWeiter("medical",this.state);
  }

  render() {
    return (
      <>
      <Grid container>
        <Box style={{margin: "auto"}}>
          <Typography variant="h5" color="primary" >Wie es dir geht</Typography><br />

          <br />

          <FormControl component="fieldset" onChange={event => { this.setState({ symptome: event.target.value.localeCompare("0")!==0 }) }}>
            <FormLabel component="legend">Hast du <b>Symptome</b>?</FormLabel>
            <RadioGroup>
              <FormControlLabel control={<Radio />} value="0" checked={!this.state.symptome} label="Ich fühle mich gesund." />
              <FormControlLabel control={<Radio />} value="1" checked={this.state.symptome} label="Ich habe Symptome." />
            </RadioGroup>
          </FormControl>



          {this.state.symptome && (
            <>
              <br />
              <Divider style={{marginTop: 15}} />
              <br/>

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

              <br /><br />
              <Divider fullWidth />
              <br />

              <FormLabel component="legend">Wann traten die <b>ersten Symptome</b> auf?</FormLabel>

              <br />

              <TextField variant="outlined"  placeholder="vor X Tagen..." style={{minWidth: 250}} value={this.state.symptomeSeit} onChange={event=> { this.setState({symptomeSeit: event.target.value}) }}/>

            </>
          )}


          <br />
          <Divider style={{marginTop: 15}} />
          <br/>



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
              <TextField variant="outlined" label="Wo?" style={{minWidth: 250}} value={this.state.kontaktWo} onChange={event=> { this.setState({kontaktWo: event.target.value}) }} />&nbsp;&nbsp;
              <TextField variant="outlined" label="Wann?" style={{minWidth: 250}} value={this.state.kontaktWann} onChange={event=> { this.setState({kontaktWann: event.target.value}) }} />
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
              <TextField style={{minWidth: 250}} variant="outlined" label="Wann wurdest Du getestet?" value={this.state.erkranktTest} onChange={event=> { this.setState({erkranktTest: event.target.value}) }} />&nbsp;&nbsp;
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
              <TextField variant="outlined" style={{marginBottom: 15, minWidth: 250}} label="Wann wurde sie verordnet?" value={this.state.quarantaeneAnordnung} onChange={event=> { this.setState({quarantaeneAnordnung: event.target.value}) }}/>&nbsp;&nbsp;
              <TextField variant="outlined" style={{marginBottom: 15, minWidth: 250}} label="Wann soll sie enden?" value={this.state.quarantaeneBis} onChange={event=> { this.setState({quarantaeneBis: event.target.value}) }} />
            </>
          )}

          <br />
          <Divider />
          <br />

          <FormControl component="fieldset" onChange={event => { this.setState({ begleiterkrankungen: Number(event.target.value) }) }}>
            <FormLabel component="legend">Weitere Erkrankungen?</FormLabel>
            <RadioGroup>
              <FormControlLabel control={<Radio />} value="0" checked={this.state.begleiterkrankungen === 0} label="Nein." />
              <FormControlLabel control={<Radio />} value ="1" checked={this.state.begleiterkrankungen === 1} label="Ja." />
              <FormControlLabel control={<Radio />} value ="2" checked={this.state.begleiterkrankungen === 2} style={{color: "grey"}} label="Keine Angabe." />
            </RadioGroup>
          </FormControl>

          <br />

          {(this.state.begleiterkrankungen === 1) && (
            <TextField variant="outlined" label="Welche?" style={{width: 400}} value={this.state.begleiterkrankungenText} onChange={event=> { this.setState({begleiterkrankungenText: event.target.value}) }}/>
          )}

        </Box>
      </Grid>
        <WizardNavigation validateWeiter={this.validateWeiter} goBack={this.props.handleBack} activeStep={this.props.activeStep}/>

      </>
    )}

}


export default Medical;
