import * as React from "react";
import PersonalBlogWrapper from "./style";
import Intro from "./Intro";
import Posts from "./Posts";
import FeaturedPosts from "./FeaturedPost";
import Button from "../../components/Button/Button";

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
            <h2>Mit Daten leben retten</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Herauszufinden, wer wann wo und wie lange war hilft den Weg des
              Virus nachzuvollziehen und die Effektivität von Gegenmaßnahmen zu
              messen. Mit einer ausreichend großen Menge an Daten können
              Forschungseinrichtungen besser gegen COVID-19 vorgehen.
            </p>
          </SectionContent>
        </SectionText>
        <SectionImage>
          <p>Image</p>
        </SectionImage>
      </SectionWrapper>

      <SectionWrapper>
        <SectionImage>
          <p>Image</p>
        </SectionImage>
        <SectionText>
          <SectionTitle>
            <h2>Neue Möglichkeiten zur Virusbekämpfung</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Data Science und machinelles Lernen ist seit dem Aufkommen hoher
              Rechenleistung in den letzten Jahren möglich. Damit haben wir als
              Gesamtgesellschaft heute neue Werkzeuge um gegen eine Pandemie
              vorzugehen als jemals zuvor. Zugleich stehen wir mit der
              Corona-Krise vor einem Virus wie niemals zuvor. Kämpfen wir also
              gegen einen neuen Virus nicht mit alten Mitteln sondern nutzen wir
              neue Wege der Forschung und des Handelns.
            </p>
          </SectionContent>
        </SectionText>
      </SectionWrapper>

      <SectionWrapper>
        <SectionText>
          <SectionTitle>
            <h2>Deutsche Datenschutz mit Anwalt und Zertifizierung</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Datenschutz ist unsere Priorität. Bewegungsdaten sind hochsensible
              und sehr persönliche Auskünfte über uns selbst. Deswegen werden
              diese nur anonymisiert gespeichert. Diese für die Forschung bereit
              zu stellen gibt uns eine hohe Verantwortung der wir Bewusst
              begegnen. Wir sind deshalb in ständigem Austausch mit
              Datenschutz-Anwälten und Internet-Verbänden und arbeiten streng
              nach deutschen Datenschutzrichtlinien. Die Daten werden
              zeilenweise verlüsselt wobei der Schlüssel unabhänig von den Daten
              gespeichert werden. Nur renomierte Forschungsinstitutionen haben
              Zugriff auf die Daten. Für Fragen zum Datenschutz stehen wir unter
              Datenschutz@corona.mx zur vollen Verfügung.]
            </p>
          </SectionContent>
        </SectionText>
        <SectionImage>
          <p>Image</p>
        </SectionImage>
      </SectionWrapper>

      <SectionWrapper>
        <SectionImage>
          <p>Image</p>
        </SectionImage>
        <SectionText>
          <SectionTitle>
            <h2>Wer sind wir?</h2>
          </SectionTitle>
          <SectionContent>
            <p>
              Wir, das sind Dennis, Tim, Tobias und Paul, sind
              Softwareentwickler, die einen Beitrag zur Bekämpfung von COVID-19
              liefern wollen. Wir haben bereits in verschiedenen Projekten für
              die Industrie zusammengearbeitet und arbeiten jetzt das erste Mal
              vollends remote an einem Projekt zusammen. Wenn Ihr Mithelfen
              wollt modernste Technologie gegen Corona zu nutzen, dann
              kontaktiert uns gerne unter corona@corona.mx]
            </p>
          </SectionContent>
        </SectionText>
      </SectionWrapper>

      <Button title="Jetzt Daten spenden"></Button>

      <FeaturedPosts />
      <Posts />
    </PersonalBlogWrapper>
  );
};

export default PersonalBlog;
