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

type ImpressumPageProps = {}

const ImpressumPage: React.FunctionComponent<ImpressumPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="Impressum"
        description=""
      />

    <AboutWrapper>
      <AboutPageTitle>
        <p>
          <h1>Impressum</h1>

          <h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
          <p>Corona-Meldung GbR<br />
            Gr&ouml;tzingerstr. 73<br />
            76227 Karlsruhe</p>

          <p><strong>Vertreten durch:</strong><br />
            Dennis J&ouml;st<br />
            Malte D&uuml;meland</p>

          <h2>Kontakt</h2>
          <p>Telefon: wird beantragt<br />
            Telefax: wird beantragt<br />
            E-Mail: djprivat@googlemail.com</p>

          <h2>Verantwortlich f&uuml;r den Inhalt nach &sect; 55 Abs. 2 RStV</h2>
          <p>Dennis J&ouml;st<br />
            Gr&ouml;tzingerstr 73<br />
            76227 Karlsruhe</p>

          <h2>EU-Streitschlichtung</h2>
          <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.<br /> Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>

          <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2><p>Wir nehmen an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teil. Zuständig ist die Universalschlichtungsstelle des Zentrums für Schlichtung e.V., Straßburger Straße 8, 77694 Kehl am Rhein (<a href="https://www.verbraucher-schlichter.de" rel="noopener noreferrer" target="_blank">https://www.verbraucher-schlichter.de</a>).</p>

          <h3>Haftung f&uuml;r Inhalte</h3> <p>Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.</p> <p>Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p> <h3>Haftung f&uuml;r Links</h3> <p>Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.</p> <p>Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p> <h3>Urheberrecht</h3> <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.</p> <p>Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.</p>

          <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
        </p>

        <p>(Name / Adresse ...)</p>

        <p><b>Mail:</b> (...)</p>

        <p><b>Tel.:</b> (...)</p>

        <p>Inhaltlicher Verantwortlicher gemäß § 6 MDStV: (...)</p>
      </AboutPageTitle>
    </AboutWrapper>

    </Layout>
  )
}

export default ImpressumPage
