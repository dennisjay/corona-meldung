import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Anleitung from "../containers/Anleitung"

type AnleitungPageProps = {}

const AnleitungPage: React.FunctionComponent<AnleitungPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="Anleitung"
        description="Anleitung für google-takeout."
      />

      <Anleitung />
    </Layout>
  )
}

export default AnleitungPage
