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
        // description="StoryHub is a beautiful Gatsby Blog theme designed to showcase your work in style. Perfect for designers, artists, photographers and developers to use for their portfolio website."
      />

      <Anleitung />
    </Layout>
  )
}

export default AnleitungPage
