import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord";

var userCredential = []
export const authOptions = {
    providers: [
        DiscordProvider({
            clientId: "1049204355531821096",
            clientSecret: "VGuWeQNI6c8ukCuynRLSeHEAoEdPCLCk",
        })
    ],
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            var condition = token.account?.provider
            if (condition === "discord") {
                userCredential = { auth_token: token.account.access_token }
                userCredential['provider']='discord'
            }
        },
        async session({ session, token, user }) {
            return userCredential
        }
    },

}

export default NextAuth(authOptions)