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
          (...)
        </p>
      </AboutPageTitle>
    </AboutWrapper>

    </Layout>
  )
}

export default ImpressumPage