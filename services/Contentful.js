const contentful = require('contentful')

export const contentfulClient = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: "7hsopb1nqbwn",
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: "9qj5KHNZG6aMxeLyC5ogdUUBb8DED1HlZlguQXzbnRQ"
});