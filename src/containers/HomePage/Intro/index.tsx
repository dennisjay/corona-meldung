import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import SocialProfile from "../../../components/SocialProfile/SocialProfile"
import Button from "../../../components/Button/Button"

import img_mask from "../../../images/undraw_social_distancing_2g0u(1).svg";
import ButtonM from '@material-ui/core/Button';

import {
  IntroWrapper,
  IntroImage,
  IntroTitle,
  Desciption,
  IntroInfo,
} from "./style"
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoGithub,
} from "react-icons/io"

type IntroProps = {}

const SocialLinks = [
  {
    icon: <IoLogoFacebook />,
    url: "#",
    tooltip: "Facebook",
  },
  {
    icon: <IoLogoInstagram />,
    url: "#",
    tooltip: "Instagram",
  },
  {
    icon: <IoLogoTwitter />,
    url: "#",
    tooltip: "Twitter",
  },
  {
    icon: <IoLogoGithub />,
    url: "#",
    tooltip: "Github",
  },
]

const Intro: React.FunctionComponent<IntroProps> = props => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/author.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 210, maxHeight: 210, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
      site {
        siteMetadata {
          author
          about
        }
      }
    }
  `)

  //const { author, about } = Data.site.siteMetadata
  //const AuthorImage = Data.avatar.childImageSharp.fluid

  return (
    <IntroWrapper>
      <IntroImage>
        <img src={img_mask}></img>
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Mit Deinen Daten Leben retten
        </IntroTitle>
        <Desciption>Effiziente Forschung dank pseudonymisierter Standort- und Gesundheitsdaten.</Desciption>
        <ButtonM size="large" href="https://corona-meldung.de/fragebogen" variant="contained" color="primary" style={{textTransform: "none"}}>
          Jetzt Daten teilen
        </ButtonM>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>
  )
}

export default Intro
