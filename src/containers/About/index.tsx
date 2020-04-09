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
import TobiasBudig from "../../images/tobiasb.jpg"
import Tim from "../../images/tim.jpg"
import Malte from "../../images/malte.jpg"
import Dennis from "../../images/dennis.jpg"
import Florian from "../../images/florian.jpg"
import Bogdan from "../../images/bogdan.jpg"
import Nils from "../../images/nils.jpg"

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

interface AboutProps {}

const About: React.FunctionComponent<AboutProps> = props => {
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
        <h2>Über uns und das Projekt</h2>
        <p>
          Corona-Meldung.de ist als Non-Profit-Projekt enstanden, um einen positiven Beitrag zur aktuellen Situation leisten.
        </p>
      </AboutPageTitle>

    </AboutWrapper>

    <IntroWrapper>
      <IntroImage>
        {/* <Image fluid={} alt="author" /> */}
        <img src={Dennis} alt="Dennis" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Dennis Jöst
        </IntroTitle>
        <Desciption>Dennis Jöst ist Data Scientist, Cloud Expert und Lead Machine Learning Engineer bei DEFINE MEDIA und glaubt, dass neben Ärzten, Polizei und Pflegekräften auch die Data Science wichtige Beiträge im Kampf gegen das Coronavirus liefern kann.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        <img src={Tim} alt="Tim" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Tim Baumgartner
        </IntroTitle>
        <Desciption>Tim Baumgartner studiert Mathe und ist der Gründer von Unitedclasses.com. Er engagiert sich für das Projekt als Software-Entwickler, weil sich in seinen Augen der Data-Science-Ansatz in der aktuellen Situation praktisch aufdrängt.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        <img src={Bogdan} alt="Bogdan" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Bogdan Magureanu
        </IntroTitle>
        <Desciption>Bogdan Magureanu ist IT Unternehmer (bcmsolutions.de und Ferendia.com) und programmiert für sein Leben gern. Im Kampf gegen der Epidemie soll jeder helfen so gut er kann.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        <img src={Malte} alt="Malte" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Malte Dümeland
        </IntroTitle>
        <Desciption>Malte Dümeland ist Rechtsanwalt mit Schwerpunkt Datenschutz & IT Recht und zertifizierter Datenschutzbeauftragter. Je sensibler die Daten, desto wichtiger ist die Berücksichtigung der Rechte jedes einzelnen.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        {/* <Image fluid={} alt="author" /> */}
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Tobias Twardon
        </IntroTitle>
        <Desciption>Tobias Twardon ist IT Consultant im eCommerce-Bereich und medizinischer Informatik und unterstützt in diesem Projekt beratend sowie im Bereich Anforderungsanalyse und Projektmanagement.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        <img src={TobiasBudig} alt="Tobias" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Tobias Budig
        </IntroTitle>
        <Desciption>Tobias Budig studiert Wirtschaftsingenieurwesen am Karlsruher Institut für Technologie (KIT). Er ist außerdem selbständig im IT Bereich und will mit seiner Expertise im Kampf gegen Corona unterstützen.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        <img src={Florian} alt="Florian" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Florian Abel
        </IntroTitle>
        <Desciption>Florian Abel, Ingenieur und Softwareentwickler, möchte mit Software und Data Science helfen Pandemien besser verständlich und greifbarer zu machen.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>

    <IntroWrapper>
      <IntroImage>
        <img src={Nils} alt="Nils" />
      </IntroImage>
      <IntroInfo>
        <IntroTitle>
          Nils Larcher
        </IntroTitle>
        <Desciption>Nils Larcher ist Produktowner und Manager im Softwarebereich und hilft Firmen sich zu digitalisieren. Hier unterstützt er vor allem im Test und in der Gestaltung.</Desciption>
        {/* <SocialProfile items={SocialLinks} /> */}
      </IntroInfo>
    </IntroWrapper>




   </>
  )
}

export default About
