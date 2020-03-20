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

type DatenschutzPageProps = {}

const DatenschutzPage: React.FunctionComponent<DatenschutzPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="Datenschutz"
        description=""
      />
    
    <AboutWrapper>
      <AboutPageTitle>
        <h2>Datenschutz</h2>
        <p>
          (...) 
        </p>
      </AboutPageTitle>
    </AboutWrapper>

    </Layout>
  )
}

export default DatenschutzPage