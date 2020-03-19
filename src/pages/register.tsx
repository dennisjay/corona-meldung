import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Register from "../containers/Register"

type RegisterPageProps = {}

const RegisterPage: React.FunctionComponent<RegisterPageProps> = props => {
    return (
        <Layout>
            <SEO
                title="Register"
                description=""
            />

            <Register />
        </Layout>
    )
}

export default RegisterPage
