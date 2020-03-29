import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import About from "../containers/About"

type AboutPageProps = {}

const AboutPage: React.FunctionComponent<AboutPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="Über uns"
        description="Über uns. Das corona-meldung.de Team stellt sich vor."
      />

      <About />
    </Layout>
  )
}

export default AboutPage
