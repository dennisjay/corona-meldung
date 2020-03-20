import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Fragebogen from "../containers/Fragebogen"

import {
    AboutWrapper,
    AboutImage,
    AboutPageTitle,
    AboutDetails,
    SocialProfiles,
} from "../containers/About/style"

type FragebogenPageProps = {}

const FragebogenPage: React.FunctionComponent<FragebogenPageProps> = props => {

    return (
        <Layout>
            <SEO
                title="Frageboben"
                description=""
            />

            <AboutWrapper>
                <AboutPageTitle>
                    
                    <Fragebogen />

                </AboutPageTitle>
            </AboutWrapper>

        </Layout>
    )
}

export default FragebogenPage