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
                        <Typography variant="h6">Personenbezogene Daten</Typography>
                        <Table>
                            <TableBody variant="footer">
                                <TableRow>
                                    <TableCell><b>Mail</b></TableCell>
                                    <TableCell>{d.mail}</TableCell>
                                </TableRow>
                                {d.gebJahr!=="" && (
                                    <TableRow>
                                        <TableCell><b>Mail</b></TableCell>
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
                                    <Typography variant="h6">Medizinische Daten</Typography>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Mail</b></TableCell>
                                    <TableCell>abc</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><b>Mail</b></TableCell>
                                    <TableCell>abc</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </TableContainer>

                </Box>
              </Paper>
            )
        }
    }
)