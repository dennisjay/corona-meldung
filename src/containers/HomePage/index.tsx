import * as React from "react";
import PersonalBlogWrapper from "./style";
import Intro from "./Intro";
import Button from "../../components/Button/Button";

import img_data from "../../images/undraw_data_xmfy.svg";
import img_map from "../../images/undraw_Map_light_3hjy.svg";
import img_security from "../../images/undraw_security_o890.svg";
import img_server from "../../images/undraw_server_cluster_jwwq.svg";
import ButtonM from '@material-ui/core/Button';


import {
  SectionWrapper,
  SectionText,
  SectionTitle,
  SectionContent,
  SectionImage
} from "./style";


type PersonalBlogProps = {};

const PersonalBlog: React.FunctionComponent<PersonalBlogProps> = ({
  ...props
}) => {

  return (
    <PersonalBlogWrapper {...props}>
      <Intro />

      <SectionWrapper>
        <SectionText>
          <SectionTitle>
            <h2>Mit Daten Leben retten</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Wir ermöglichen Nutzern Standortdaten zusammen mit einem kurzen medizinischen Fragebogen mit Forschungseinrichtungen der Pandemiebekämpfung zu teilen. Die Standortdaten können rückwirkend geteilt werden. So können Infektionsketten zurückverfolgt und Rückschlüsse auf die Wirksamkeit von Eindämmungsmaßnahmen auf die Virusausbreitung gezogen werden.

{/* 
              Herauszufinden, wer wann, wo und wie lange war, hilft den Weg des
              Virus' nachzuvollziehen und die Effektivität von Gegenmaßnahmen zu
              messen. Mit einer ausreichend großen Menge an Daten können
              Forschungseinrichtungen besser gegen COVID-19 vorgehen. */}
            </p>
          </SectionContent>
        </SectionText>
        <SectionImage>
          <img src={img_data} alt="Data"></img>
        </SectionImage>
      </SectionWrapper>

      <SectionWrapper>
        <SectionImage>
        <img src={img_server} alt="Server"></img>
        </SectionImage>
        <SectionText>
          <SectionTitle>
            <h2>Neue Möglichkeiten zur Virusbekämpfung</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Data Science und machinelles Lernen sind seit dem Aufkommen hoher
              Rechenleistung in den letzten Jahren möglich. Damit haben wir als
              Gesamtgesellschaft heute mehr neue Werkzeuge um gegen eine Pandemie
              vorzugehen als jemals zuvor. Zugleich stehen wir mit der
              Corona-Krise vor einem Virus wie niemals zuvor. Kämpfen wir also
              gegen einen neuen Virus nicht mit alten Mitteln, sondern nutzen wir
              neue Wege der Forschung und des Handelns.
            </p>
          </SectionContent>
        </SectionText>
      </SectionWrapper>

      <SectionWrapper>
        <SectionText>
          <SectionTitle>
            <h2>Datenschutz nach europäischen Standards</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Der Schutz und die Sicherheit Ihrer personenbezogenen Daten haben für uns höchste Priorität.
              Informationen zu Ihrem Gesundheitszustand und Bewegungsprofile sind hochsensible, persönliche Auskünfte und verdienen den bestmöglichen Schutz. Aus diesem Grund anonymisieren wir Ihre personenbezogenen Daten nach höchsten technischen Standards und verschlüsseln diese zeilenweise, so dass Dritten keinerlei Rückschlüsse auf Ihre Identität möglich sind. Sämtliche Schlüssel zu Ihren Daten speichern wir ausschließlich auf Hochsicherheitsservern innerhalb Deutschlands.
              Dennoch wollen wir zusammen mit Ihnen einen Beitrag zu der Bewältigung der COVID-19 Pandemie und der Forschung über die Ausbreitung von Infektionskrankheiten leisten. Wir stellen Ihre Daten daher in anonymisierter Form renommierten Forschungsinstituten zur Verfügung, so dass diese Institute wichtige Grundlagenforschung leisten können.
              Nähere Informationen zum Datenschutz finden Sie in unserer Datenschutzerklärung sowie in unseren FAQ Datenschutz. Sollten Sie Fragen haben stehen wir Ihnen jederzeit unter <a href={"mailto:datenschutz@corona-meldung.de"}>datenschutz@corona-meldung.de</a> zur Verfügung.
            </p>
          </SectionContent>
        </SectionText>
        <SectionImage>
        <img src={img_security} alt="Security"></img>
        </SectionImage>
      </SectionWrapper>

      <SectionWrapper>
        <SectionImage>
        <img src={img_map} alt="Data"></img>
        </SectionImage>
        <SectionText>
          <SectionTitle>
            <h2>Wer sind wir?</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Wir, sind
              Softwareentwickler und ein Rechtsanwalt, die einen Beitrag zur Bekämpfung von COVID-19
              liefern wollen. Wir haben bereits in verschiedenen Projekten für
              die Industrie zusammengearbeitet und arbeiten jetzt das erste Mal
              vollständig remote an einem Projekt zusammen. Wenn Ihr mithelfen
              wollt modernste Technologie gegen COVID-19 zu entwickeln, dann
              kontaktiert uns gerne unter <a href={"mailto:info@corona-meldung.de"}>info@corona-meldung.de</a>.
            </p>
          </SectionContent>
        </SectionText>
      </SectionWrapper>

      {/* <SectionWrapper> */}
        <center>
          <ButtonM size="large" href="https://corona-meldung.de/fragebogen" variant="contained" color="primary" style={{textTransform: "none"}}>
            &nbsp;&nbsp;Jetzt Daten teilen&nbsp;&nbsp;
          </ButtonM>
        </center>
      {/* </SectionWrapper> */}
      <br />


    </PersonalBlogWrapper>
  );
};

export default PersonalBlog;
