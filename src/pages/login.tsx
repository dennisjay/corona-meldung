import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Login from "../containers/Login"

type LoginPageProps = {}

const LoginPage: React.FunctionComponent<LoginPageProps> = props => {
  return (
    <Layout>
      <SEO
        title="Login"
        description=""
      />

      <Login />
    </Layout>
  )
}

export default LoginPage
