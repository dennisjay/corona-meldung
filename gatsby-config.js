require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  proxy: {
    prefix: "/data-api-v1",
    url: "https://pidgjtb7w0.execute-api.eu-central-1.amazonaws.com",
  },
  siteMetadata: {
    title: `Mit Deinen Daten Leben retten`,
    author: `Corona Meldung GbR`,
    about: `Forscher finden effektiver Maßnahmen gegen COVID-19 dank Deinen anonymisierten Standortdaten.`,
    description: `Forscher finden effektiver Maßnahmen gegen COVID-19 dank Deinen anonymisierten Standortdaten.`,
    siteUrl: `https://www.corona-meldung.de/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        minify: false, // Breaks styles if not set to false
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
              linkImagesToOriginal: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
            },
          },
          {
            resolve: `gatsby-remark-mermaid`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
          },

          {
            resolve: `gatsby-remark-copy-linked-files`,
          },
          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-sharp`,
    },
    {
      resolve: `gatsby-plugin-sharp`,
    },
  {
    resolve: `gatsby-plugin-google-analytics-gdpr`,
    options: {
      // The property ID; the tracking code won't be generated without it.
      trackingId: "UA-63084563-2",
      // Optional parameter (default false) - Enable analytics in development mode.
      enableDevelopment: true, // default false
      // Optional parameter (default true) - Some countries (such as Germany) require you to use the _anonymizeIP function for Google Analytics. Otherwise you are not allowed to use it.
      anonymizeIP: true,
      // Optional parameter (default false) - Starts google analytics with cookies enabled. In some countries (such as Germany) this is not allowed.
      autoStartWithCookiesEnabled: false,
      // Optional parameter - Configuration for react-ga and google analytics
      reactGaOptions: {
        debug: true,
        gaOptions: {
          sampleRate: 100
        }
      }
    },
  },
    {
      resolve: `gatsby-plugin-feed`,
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `StoryHub - Personal Blog Minimal`,
        short_name: `Corona-Meldung.de`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
    },
    {
      resolve: `gatsby-plugin-react-helmet`,
    },
    {
      resolve: `gatsby-plugin-typescript`,
    },
    {
      resolve: `gatsby-plugin-lodash`,
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: 'https://example.us10.list-manage.com/subscribe/post?u=b9ef2fdd3edofhec04ba9b930&amp;id=3l948gkt1d',
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        // username: ,
        // access_token: ,
        // instagram_id: ,
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Poppins`,
            variants: [`300`, `400`, `500`, `600`, `700`],
          },
          {
            family: `Fira Sans`,
            variants: [`100`, `300`, `400`, `500`, `600`, `700`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'corona-meldung'
      },
    },
  ],
}
