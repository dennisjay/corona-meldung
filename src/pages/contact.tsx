import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../containers/Contact"

type ContactPageProps = {}

const ContactPage: React.FunctionComponent<ContactPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="Kontaktformular"
        description="Kontaktformular."
      />

      <Contact />
    </Layout>
  )
}

export default ContactPage
