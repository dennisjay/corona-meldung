import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import SocialProfile from "../../components/SocialProfile/SocialProfile"
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoInstagram,
  IoLogoLinkedin,
} from "react-icons/io"
import {
  AboutWrapper,
  AboutImage,
  AboutPageTitle,
  AboutDetails,
  SocialProfiles,
  IntroWrapper,
  IntroImage,
  IntroTitle,
  Desciption,
  IntroInfo,
} from "./style"

const SocialLinks = [
  {
    icon: <IoLogoFacebook />,
    url: "https://www.facebook.com/redqinc/",
    tooltip: "Facebook",
  },
  {
    icon: <IoLogoInstagram />,
    url: "https://www.instagram.com/redqinc/",
    tooltip: "Instagram",
  },
  {
    icon: <IoLogoTwitter />,
    url: "https://twitter.com/redqinc",
    tooltip: "Twitter",
  },
  {
    icon: <IoLogoLinkedin />,
    url: "https://www.linkedin.com/company/redqinc/",
    tooltip: "Linked In",
  },
]

interface AnleitungProps {}

const Anleitung: React.FunctionComponent<AnleitungProps> = props => {
  const Data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/about.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1770, quality: 90) {
            ...GatsbyImageSharpFluid
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

  return (
   <> 
    <AboutWrapper>

      <AboutPageTitle>
        <h2>So geht's</h2>
      </AboutPageTitle>

    </AboutWrapper>
     
    <IntroWrapper>
      {/* <IntroImage>
        <img src={Dennis} alt="Dennis" />
      </IntroImage> */}
      <IntroInfo>
        <IntroTitle>
          Geh auf <a href="https://takeout.google.com/" target="_blank">takeout.google.com</a>
        </IntroTitle>
        <Desciption>und melde dich, wenn nötig, an. Achte ggf. darauf, den Account zu nehmen, den du hauptsächlich auf deinem Telefon nutzt.</Desciption>
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      {/* <IntroImage>
        <img src={Dennis} alt="Dennis" />
      </IntroImage> */}
      <IntroInfo>
        <IntroTitle>
          Wähle <i>,,Auswahl aufheben"</i>
        </IntroTitle>
        <Desciption>unter Produkte aus</Desciption>
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      {/* <IntroImage>
        <img src={Dennis} alt="Dennis" />
      </IntroImage> */}
      <IntroInfo>
        <IntroTitle>
          Setze einen Haken bei <i>Standortverlauf</i>
        </IntroTitle>
        <Desciption>(fast ganz unten)</Desciption>
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      {/* <IntroImage>
        <img src={Dennis} alt="Dennis" />
      </IntroImage> */}
      <IntroInfo>
        <IntroTitle>
          Klicke auf <i>nächster Schritt</i> und dann auf <i>Export erstellen</i>
        </IntroTitle>
        <Desciption>und warte auf die Mail (meist unter 5 Minuten, kann aber länger dauern).</Desciption>
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      {/* <IntroImage>
        <img src={Dennis} alt="Dennis" />
      </IntroImage> */}
      <IntroInfo>
        <IntroTitle>
          Klicke auf den Link in der Mail, die du erhälst
        </IntroTitle>
        <Desciption>und lade die ZIP-Datei herunter</Desciption>
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      {/* <IntroImage>
        <img src={Dennis} alt="Dennis" />
      </IntroImage> */}
      <IntroInfo>
        <IntroTitle>
          Fülle unser Formular aus
        </IntroTitle>
        <Desciption>und lade die ZIP-Datei hoch. Fertig!</Desciption>
      </IntroInfo>
    </IntroWrapper>


    
   </> 
  )
}

export default Anleitung
