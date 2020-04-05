import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton, WhatsappShareButton
} from "react-share";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';



class ThankYou extends React.Component {
  constructor() {
    super();

    this.state = {
      gAccount: undefined,
      files: []
    }


  }

  render() {
    const promoMessage = "Forscher finden effektiver Maßnahmen gegen COVID-19 dank deinen anonymisierten Standortdaten."


    return (
      <>

        <Grid container>
          <Box style={{margin: "auto"}}>
            <center>
              <CheckCircleIcon style={{fontSize: 100, color: "#81c784"}} />
              <Typography variant="h4" style={{color: "#388e3c"}}>Herzlichen Dank!</Typography><br />
              <Typography style={{color: "#757575"}}>Deine Daten wurden erfolgreich und sicher übermittelt.</Typography><br />
              <Typography style={{color: "#757575"}}>Du kannst zusätzlich helfen, indem du<br /> das Projekt in deinem Umfeld bekannt machst.</Typography><br />
              <Typography style={{color: "#7986cb", marginBottom: 5}} variant="subtitle1"><strong>Teilen über:</strong></Typography>
              <Box style={{display: "flex"}}>
                <FacebookShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Facebook</Button></FacebookShareButton>
                <EmailShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>E-Mail</Button></EmailShareButton>
                <TwitterShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Twitter</Button></TwitterShareButton>
                <LinkedinShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Linkedin</Button></LinkedinShareButton>
                <TelegramShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Telegram</Button></TelegramShareButton>
                <WhatsappShareButton url={"https://corona-meldung.de"} title={promoMessage}><Button size="small" variant="outlined" color="primary" style={{textTransform: "none", margin: 3}}>Whatsapp</Button></WhatsappShareButton>
              </Box>
              <br />

              <Button variant="outlined" size="small" onClick={this.props.handleReset} style={{marginTop: 30, textTransform: "none", color: "#9e9e9e"}}>eine weitere Person hinzufügen</Button>
            </center>
          </Box>
        </Grid>

      </>
    )
  }


}


export default ThankYou;
