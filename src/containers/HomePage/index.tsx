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
              Data Science und machinelles Lernen ist seit dem Aufkommen hoher
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
            <h2>Deutscher Datenschutz mit Anwalt und Zertifizierung</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Datenschutz ist unsere Priorität. Bewegungsdaten sind hochsensible
              und sehr persönliche Auskünfte über uns selbst. Deswegen werden
              diese nur anonymisiert gespeichert. Diese für die Forschung bereitzustellen
              gibt uns eine hohe Verantwortung, der wir bewusst
              begegnen. Wir sind deshalb in ständigem Austausch mit
              Datenschutz-Anwälten und Internet-Verbänden und arbeiten streng
              nach deutschen Datenschutzrichtlinien. Die Daten werden
              zeilenweise (d.h. mit einem eigenen Schlüssel für jeden Nutzer) verlüsselt, wobei
              der Schlüssel unabhänig von den Daten
              gespeichert wird. Nur renomierte Forschungsinstitutionen haben
              Zugriff auf die Daten. Für Fragen zum Datenschutz stehen wir
              unter <a href={"mailto:datenschutz@corona-meldung.de"}>datenschutz@corona-meldung.de</a> jederzeit zur Verfügung.
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
              Wir, das sind Dennis, Tim, Bogdan, Malte, Tobias T., Tobias B. und Florian  sind
              Softwareentwickler (und ein Anwalt), die einen Beitrag zur Bekämpfung von COVID-19
              liefern wollen. Wir haben bereits in verschiedenen Projekten für
              die Industrie zusammengearbeitet und arbeiten jetzt das erste Mal
              vollends remote an einem Projekt zusammen. Wenn Ihr mithelfen
              wollt modernste Technologie gegen Corona zu nutzen, dann
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
