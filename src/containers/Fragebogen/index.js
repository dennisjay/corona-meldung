import React, { Component } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import { Divider, Button, Box,Typography } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Dropzone from "react-dropzone";
import { lightGreen } from "@material-ui/core/colors";

export default (
    class CodeView extends Component {
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
                files: []
            }
        }

        onDrop = () => {return true}

        render() {
            return (    
                <>
                    
                    <h2>Fragebogen</h2>

                    <TextField variant="outlined" label="Vorname" />&nbsp;&nbsp;
                    <TextField variant="outlined" label="Nachname" /><br /><br />

                    <TextField variant="outlined" label="Mail" /><br /><br />

                    <TextField variant="outlined" label="Geburtsdatum" /><br /><br />

                    <TextField variant="outlined" label="Wohnort" /><br /><br />

                    <TextField variant="outlined" label="Telefonnummer" /><br />

                    <br />
                    <Divider />
                    <br />
            
                    {/* <FormControl component="fieldset">
                        <FormLabel component="legend">Waren Sie in den letzten 14 Tagen in einem <b>Risikogebiet</b>?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja, in China: in Hubei, z.B. in Wuhan" />
                            <FormControlLabel control={<Radio />} value ="2" label="Ja, im Iran: in Ghom, Stadt Teheran" />
                            <FormControlLabel control={<Radio />} value ="3" label="Ja, in Italien: Region Emilia-Romagna, Region Lombardei, oder in der Stadt Vo (Provinz Padua, Venetien)" />
                            <FormControlLabel control={<Radio />} value ="4" label="Ja, in Südkorea: in Gyeongsangbuk-do (Nord-Gyeongsang)" />
                        </RadioGroup>
                    </FormControl>

                    <br />
                    <Divider />
                    <br /> */}

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
                    <Box mb={1} />
                    <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <section className="container">
                        <div {...getRootProps({ className: 'dropzone' })}
                            style={{ minHeight: 30, width: 450, alignItems: "center", borderWidth: 1, borderRadius: 3, borderColor: "#eeeee", borderStyle: "dashed", backgroundColor: "#fafafa", color: "#bdbdbd", transition: "border .24s ease-in-out", cursor: "pointer" }}
                        >
                            <input {...getInputProps()} />
                            {/* <Typography align="center" style={{marginTop: 3}}><AttachFileIcon fontSize="small" style={{width: 20, verticalAlign:"middle"}}/> Drop the <b>data</b> here, or click to select.</Typography> */}
                            {this.state.files.length!==0 ? (<Typography variant="body2" style={{marginLeft: 15, marginTop: 5, color: lightGreen["800"]}}><b>erfolgreich hochgeladen!</b></Typography>) : (<Typography align="center" style={{marginTop: 3}}><AttachFileIcon fontSize="small" style={{width: 20, verticalAlign:"middle"}}/> Klicken, um <b>Dateien</b> hochzuladen, oder hierein ziehen.</Typography>)}
                        </div>
                        </section>
                    )}
                    </Dropzone>

                    <br />

                    <Button variant="contained"><b>senden</b></Button>
                </>
            )
        }
    }
)