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
                <Box p={2}>

                    

                    <TableContainer>
                        <Table>
                            <TableBody variant="footer">
                                <TableRow>
                                    <TableCell colspan={2}>
                                        <Typography variant="h6"><b>Personenbezogene Daten</b></Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Mail</b></TableCell>
                                    <TableCell>{d.mail}</TableCell>
                                </TableRow>
                                {d.gebJahr!=="" && (
                                    <TableRow>
                                        <TableCell><b>Geburtsjahr</b></TableCell>
                                        <TableCell>{d.gebJahr}</TableCell>
                                    </TableRow>
                                )}
                                {d.plz!=="" && (
                                    <TableRow>
                                        <TableCell><b>Postleitzahl</b></TableCell>
                                        <TableCell>{d.plz}</TableCell>
                                    </TableRow>
                                )}
                                
                                <TableRow>
                                    <TableCell colspan={2}>
                                        <Typography variant="h6"><b>Medizinische Daten</b></Typography>
                                    </TableCell>
                                </TableRow>
                                {d.kontakt!==undefined && (
                                    <TableRow>
                                        <TableCell><Typography style={{fontSize: 11, maxWidth: 200}}>Hattest Du <b>Kontakt</b> (min. 15min, unter 1,5 Meter Entfernung) zu einer nachweislich an COVID-19 erkrankten Person?</Typography></TableCell>
                                        <TableCell>{d.kontakt ? ("Ja") : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.erkrankt!==undefined && (
                                    <TableRow>
                                        <TableCell><Typography style={{fontSize: 11, maxWidth: 200}}>Bist Du nachweislich an COVID-19 <b>erkrankt</b>?</Typography></TableCell>
                                        <TableCell>{d.erkrankt ? ("Ja") : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.quarantaene!==undefined && (
                                    <TableRow>
                                        <TableCell><Typography style={{fontSize: 11, maxWidth: 200}}>Wurde dir vom Arzt <b>Quarantäne verordnet</b>?</Typography></TableCell>
                                        <TableCell>{d.quarantaene ? ("Ja") : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.begleiterkrankungen!==undefined && (
                                    <TableRow>
                                        <TableCell><b>Begleiterkrankungen?</b></TableCell>
                                        <TableCell>{d.begleiterkrankungen ? ("Ja") : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                {d.berufstaetig!==undefined && (
                                    <TableRow>
                                        <TableCell><b>Berufstätig?</b></TableCell>
                                        <TableCell>{d.berufstaetig ? ("Ja") : ("Nein")}</TableCell>
                                    </TableRow>
                                )}
                                
                                {d.files!==null && d.files.length>0 && (
                                    <TableRow>
                                        <TableCell colspan={2}>
                                            <Typography variant="h6"><b>Standortdaten</b></Typography>
                                        </TableCell>
                                    </TableRow>
                                )}
                                {d.files!==null && d.files.length>0 ? (        
                                    <TableRow>
                                        <TableCell><b>Uploads</b></TableCell>
                                        <TableCell>die hochgeladenen Daten</TableCell>
                                    </TableRow>
                                    
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2}><br />
                                            Du hast <b>keine Standortdaten</b> hinzugefügt.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>

                    </TableContainer>

                </Box>
              </Paper>
            )
        }
    }
)