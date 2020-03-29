import React, { Component } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Divider, Button, Box, Typography, Link, Grid } from '@material-ui/core';


export default (
    class Overview extends Component {
        constructor() {
            super();
        }

        render() {
            var d = this.props.data
            
            return (    
              <Paper elevation={5}>
                <Box p={2} style={{maxWidth: 620 }}>

                    <TableContainer>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell colspan={2} style={{backgroundColor: "#f7f9ff"}}>
                                        <Typography variant="h6"><b>Personenbezogene Daten</b></Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow style={{backgroundColor: "#ffffff"}}>
                                    <TableCell><b>Mail</b></TableCell>
                                    <TableCell>{d.mail}</TableCell>
                                </TableRow>
                                {d.gebJahr!=="" && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><b>Geburtsjahr</b></TableCell>
                                        <TableCell>{d.gebJahr}</TableCell>
                                    </TableRow>
                                )}
                                {d.plz!=="" && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><b>Postleitzahl</b></TableCell>
                                        <TableCell>{d.plz}</TableCell>
                                    </TableRow>
                                )}
                                {d.berufstaetig!==undefined && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><b>Berufstätig?</b></TableCell>
                                        <TableCell>{d.berufstaetig ? (<>Ja: {d.beruf}</>) : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                
                                <TableRow style={{backgroundColor: "#f7f9ff"}}>
                                    <TableCell colspan={2}>
                                        <Typography variant="h6"><b>Medizinische Daten</b></Typography>
                                    </TableCell>
                                </TableRow>
                                {d.kontakt!==undefined && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><Typography style={{fontSize: 11, maxWidth: 230}}>Hattest Du <b>Kontakt</b> (min. 15min, unter 1,5 Meter Entfernung) zu einer nachweislich an COVID-19 erkrankten Person?</Typography></TableCell>
                                        <TableCell>{d.kontakt ? (<>Ja.<br /> Wo:&nbsp;{d.kontaktWo}<br />Wann:&nbsp;{d.kontaktWann}</>) : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.erkrankt!==undefined && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><Typography style={{fontSize: 11, maxWidth: 230}}>Bist Du nachweislich an COVID-19 <b>erkrankt</b>?</Typography></TableCell>
                                        <TableCell>{d.erkrankt ? (<>Ja.<br /> Seit:&nbsp;{d.erkranktSeit}<br />Getestet:&nbsp;{d.erkranktTest}</>) : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.quarantaene!==undefined && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><Typography style={{fontSize: 11, maxWidth: 230}}>Wurde dir vom Arzt <b>Quarantäne verordnet</b>?</Typography></TableCell>
                                        <TableCell>{d.quarantaene ? (<>Ja.<br /> Angeordnet:&nbsp;{d.quarantaeneAnordnung}<br />Bis:&nbsp;{d.quarantaeneBis}</>) : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.begleiterkrankungen!==undefined && (
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><b>Begleiterkrankungen?</b></TableCell>
                                        <TableCell>{d.erkrankt ? (<>Ja: {d.begleiterkrankungenText}</>) : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {/* Symptome: */}
                                <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><b>Symptome</b></TableCell>
                                        <TableCell>
                                        
                                            {d.symptom1 && ("Fieber, ")}
                                            {d.symptom2 && ("Schnupfen, ")}
                                            {d.symptom3 && ("Luftnot, ")}
                                            {d.symptom4 && ("Husten, ")}
                                            {d.symptom5 && ("Halsschmerzen, ")}
                                            {d.symptom6 && ("Durchfall, ")}
                                            {d.symptom7 && ("Übelkeit, ")}
                                            {d.symptom8 && ("Erbrechen, ")}
                                            {d.symptom9 && ("Brustenge, ")}
                                            {d.symptom10 && ("beeinträchtigtes Riechen oder Schmecken, ")}
                                            {d.symptom11 && ("sonstiges.")}
                                            
                                        </TableCell>
                                    </TableRow>
                                
                                {d.files!==null && d.files.length===undefined && (
                                    <TableRow style={{backgroundColor: "#f7f9ff"}}>
                                        <TableCell colspan={2} style={{backgroundColor: "#f7f9ff"}}>
                                            <Typography variant="h6"><b>Standortdaten</b></Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {d.files!==null && d.files.length===undefined ? (        
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell><b>Uploads</b></TableCell>
                                        <TableCell>die hochgeladenen Daten</TableCell>
                                    </TableRow>
                                    
                                ) : ( 
                                    <TableRow style={{backgroundColor: "#ffffff"}}>
                                        <TableCell colSpan={2} style={{borderStyle: "none"}}><br />
                                            <center>Du hast <b>keine Standortdaten</b> hinzugefügt.</center>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </TableContainer>

                    <Typography variant="body" style={{color: "#bdbdbd"}}>Du kannst auf 'zurück' klicken und Änderungen vornehmen, ohne dass du etwas nochmal ganz neu eingeben musst.</Typography><br />

                </Box>
              </Paper>
            )
        }
    }
)