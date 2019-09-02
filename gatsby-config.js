module.exports = {
  siteMetadata: {
    title: `Chaduvula Prasanth`,
    name: `Chaduvula Prasanth`,
    siteUrl: `https://chaduvulaprasanth.netlify.com/`,
    description: `This is my description that will be used in the meta tags and important for search results`,
    hero: {
      heading: `Let's explore the journey of life`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/chaduvula98`,
      },
      {
        name: `github`,
        url: `https://github.com/chaduvulaprasanth`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/chaduvulaprasanth/`,
      }
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
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
