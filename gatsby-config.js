module.exports = {
  siteMetadata: {
    title: `Chaduvula Prasanth`,
    name: `Chaduvula Prasanth`,
    siteUrl: `https://chaduvulaprasanth.netlify.com/`,
    description: `Building products passionate about | student fellow Altcampus | full stack web developer | Into Edutech & agriculture`,
    hero: {
      heading: `let's explore the journey of life`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/iamchaduvula`,
      },
      {
        name: `github`,
        url: `https://github.com/chaduvulaprasanth`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/chaduvulaprasanth/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Chaduvula Prasanth`,
        short_name: `Prasanth`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.jpeg`,
      },
    },
  ],
};
