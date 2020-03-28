import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import {
    AboutWrapper,
    AboutPageTitle,
  } from "../containers/About/style"

type IdeaPageProps = {}

const IdeaPage: React.FunctionComponent<IdeaPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="About Corona-Meldung.de"
        description=""
      />

    <AboutWrapper>
      <AboutPageTitle>
        <h1>Was ist Corona-Meldung.de?</h1>
        <p>Diese Plattform dient der schnellen und freiwilligen Unterstützung zur Bekämpfung der Corona Pandemie.</p>
        <p>Wir sind ein Team aus Medizinern, Rechtsanwälten und Softwareentwicklern aus Karlsruhe und wollen mit dieser Webseite 
           zur anonymen, freiwilligen und sicheren Weitergabe von präzisen 
          Standortdaten an Forschungsinstitute unter Einbehalt aktueller Datenschutzvorgaben beitragen.
        </p>
        <p>Konkret kannst Du über diese Webseite deinen aktuellen 
          Gesundheitszustand freiwillig und sicher an Forschungsinstitute zur Bekämpfung der Corona Pandemie 
          übermitteln. Über ein Webformular füllst Du Fragen aus, die den Fragen der 
          Gesundheitsämter im Falle einer COVID-19 Risikoabklärung gleichen. Diese Informationen werden 
          dann in elektronischer Form an Forschungsinstitute zur Bekämpfung der Pandemie weitergeleitet. 
          In erster Linie ist dies in Deutschland das Robert-Koch-Institut, weitere Institutionen sind denkbar, 
          wenn diese durch die Bundesregierung mit der Forschung beauftragt werden.
        </p>
        <p>Zusätzlich zu einem Fragebogen hast Du die Möglichkeit einen Google 
          Standortverlauf mit hochzuladen und diesen ebenfalls auf freiwilliger Basis zur Verfügung zu stellen. 
          Dies ermöglicht Forschern mit Hilfe von maschinellem Lernen mehr über das Virus und dessen Ausbreitung zu erfahren. 
          Um zukünftig nicht ausschließlich auf den Google Standortverlauf zurückgreifen zu müssen, planen wir 
          außerdem eine Corona Tracking App mit der Standortdaten unabhängig von Google zur Verfügung gestellt werden können.
        </p>
        <p>Jeder kann hiermit schnell und einfach einen Beitrag zur Rettung von Menschenleben leisten, in dem er auf freiwilliger
           Basis Informationen zum Gesundheitszustand und seinem Bewegungsprofil für Forschungszwecke zur Verfügung stellt.
        </p>
      </AboutPageTitle>
    </AboutWrapper>

    </Layout>
  )
}

export default IdeaPage
