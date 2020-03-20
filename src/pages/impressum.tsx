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
        <h2>Impressum</h2>
        <p>
          nach § 5 Telemediengesetz
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