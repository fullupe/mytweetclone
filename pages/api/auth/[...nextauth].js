import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import TwitterProvider from "next-auth/providers/twitter"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GithubProvider({ // not in use for now
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // // ...add more providers here

    // GoogleProvider({ // not in use for now
    //     clientId: process.env.GOOGLE_CLIENT_ID,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    //   }),

      TwitterProvider({ // in use
        clientId: process.env.TWITTER_CLIENT_ID ,
        clientSecret: process.env.TWITTER_CLIENT_SECRET,
        version:'2.0', // opt-in to Twitter OAuth 2.0
      }),
  ],
})