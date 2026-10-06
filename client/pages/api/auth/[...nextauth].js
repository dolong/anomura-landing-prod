import NextAuth from 'next-auth';
import Moralis from 'moralis';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from "@repositories/PrismaContext";
import { utils } from "ethers";

const {
    NEXTAUTH_SECRET,
    // NEXT_PUBLIC_DISCORD_CLIENT_ID,
    // DISCORD_CLIENT_SECRET,
    // NEXT_PUBLIC_TWITTER_CLIENT_ID,
    // TWITTER_CLIENT_SECRET,
} = process.env;

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'MoralisAuth',
            credentials: {
                message: {
                    label: 'Message',
                    type: 'text',
                    placeholder: '0x0',
                },
                signature: {
                    label: 'Signature',
                    type: 'text',
                    placeholder: '0x0',
                },
            },
            async authorize(credentials) {
                try {
                    const { message, signature, uathUser } = credentials;

                    await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

                    const { address, profileId, expirationTime } = (
                        await Moralis.Auth.verify({ message, signature, network: 'evm' })
                    ).raw;

                    if (!address || !profileId) {
                        throw new Error("Signature cannot be verified.");
                    }

                    const userDb = await prisma.whiteList.findFirst({
                        where: {
                            wallet: { equals: address, mode: "insensitive" },
                        },
                    });
                    console.log(uathUser)
                    if (uathUser && uathUser !== undefined && !userDb?.uathUser) {
                        //we cache this uath into whiteListUser table

                        const wallet = utils.getAddress(address)
                        await prisma.whiteList.upsert({
                            where: {
                                wallet,
                            },
                            create: {
                                wallet,
                                uathUser
                            },
                            update: {
                                uathUser
                            }
                        })
                    }

                    const user = { address, profileId, expirationTime, signature, uathUser };

                    return user;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log(e);
                    return null;
                }
            },
        }),
    ],
    // jwt: {
    //     signingKey: NEXT_PUBLIC_NEXTAUTH_SECRET,
    // },
    callbacks: {
        async jwt({ token, user }) {
            // eslint-disable-next-line no-unused-expressions
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            // session.expires = token.user.expirationTime; **** use nextauth expiretime, moralis expire time is null
            session.user = token?.user;
            return session;
        },
    },
    secret: NEXTAUTH_SECRET,
    session: {
        jwt: true,
        maxAge: 60, //  30 * 24 * 60 * 60  // 60 * 60 * 24 * 30
    },
}

export default (req, res) => {
    if (process.env.VERCEL) {
        // prefer NEXTAUTH_URL, fallback to x-forwarded-host
        req.headers["x-forwarded-host"] =
            process.env.NEXTAUTH_URL || req.headers["x-forwarded-host"];
    }
    return NextAuth(req, res, authOptions);
};