import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import {
    AboutWrapper,
    AboutImage,
    AboutPageTitle,
    AboutDetails,
    SocialProfiles,
} from "../containers/About/style"

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import TextField from '@material-ui/core/TextField';

type FragebogenPageProps = {}

const FragebogenPage: React.FunctionComponent<FragebogenPageProps> = props => {

    return (
        <Layout>
            <SEO
                title="Frageboben"
                description=""
            />

            <AboutWrapper>
                <AboutPageTitle>
                    <h2>Fragebogen</h2>

                    <TextField variant="outlined" label="Vorname" />&nbsp;&nbsp;
                    <TextField variant="outlined" label="Nachname" /><br /><br />

                    <TextField variant="outlined" label="Mail" /><br /><br />

                    <TextField variant="outlined" label="Geburtsdatum" /><br /><br />

                    <TextField variant="outlined" label="Telefonnummer" /><br />

                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Waren Sie in den letzten 14 Tagen in einem Risikogebiet?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja, in China: in Hubei, z.B. in Wuhan" />
                            <FormControlLabel control={<Radio />} value ="2" label="Ja, im Iran: in Ghom, Stadt Teheran" />
                            <FormControlLabel control={<Radio />} value ="3" label="Ja, in Italien: Region Emilia-Romagna, Region Lombardei, oder in der Stadt Vo (Provinz Padua, Venetien)" />
                            <FormControlLabel control={<Radio />} value ="4" label="Ja, im Iran: in Südkorea: in Gyeongsangbuk-do (Nord-Gyeongsang)" />
                        </RadioGroup>
                    </FormControl>

                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Waren Sie in den letzten 14 Tagen in einem Gebiet, in dem <b>COVID-19-Fälle aufgetreten</b> sind?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                        </RadioGroup>
                    </FormControl>
                    
                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Hatten Sie<b>Kontakt</b> (min. 15min, unter 2 Meter Entfernung) zu einer nachweislich an COVID-19 erkrankten Person?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                        </RadioGroup>
                    </FormControl>

                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Sind Sie erkrankt?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                        </RadioGroup>
                    </FormControl>

                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Welche Symptome bestehen?</FormLabel>
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

                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Begleiterkrankungen?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                        </RadioGroup>
                    </FormControl>

                    <br /><br />

                    <FormControl component="fieldset">
                        <FormLabel component="legend">Berufstätig?</FormLabel>
                        <RadioGroup>
                            <FormControlLabel control={<Radio />} value="0" label="Nein." />
                            <FormControlLabel control={<Radio />} value ="1" label="Ja." />
                        </RadioGroup>
                    </FormControl>

                </AboutPageTitle>
            </AboutWrapper>

        </Layout>
    )
}

export default FragebogenPage