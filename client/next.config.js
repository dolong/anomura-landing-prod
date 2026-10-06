const { DEEPSEACHALLENGER_HOST, MINT_BOWL_HOST } = process.env;

const securityHeaders = []
const ContentSecurityPolicy = ` 
  frame-src 'https://anomura-staging.vercel.app'; 
`
module.exports = {
    webpack: (config) => {
        config.experiments = config.experiments || {};
        config.experiments.topLevelAwait = true;
        return config;
    },
    swcMinify: true,
    images: {
        domains: ['res.cloudinary.com'],
    },

    async headers() {
        return [
            { // prevent click jacking
                //     // source: '/((?!embed).*)',
                source: '/',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Content-Security-Policy',
                        // value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
                        value: `default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self' https://anomura-staging.vercel.app; frame-src 'self' https://anomura-staging.vercel.app; prefetch-src 'self' https://anomura-staging.vercel.app;`
                        // value: ` frame-src https://* https://anomura-staging.vercel.app https://anomuragame.com/; prefetch-src https://anomura-staging.vercel.app;`
                    }
                ]
            },
            { // prevent click jacking
                source: '/roadmap',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    }
                ]
            },
            { // prevent click jacking
                source: '/about',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    }
                ]
            },
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    {
                        key: "Access-Control-Allow-Methods",
                        value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
                    },
                    {
                        key: "Access-Control-Allow-Headers",
                        value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
                    },
                ],
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/public/PrivacyPolicy.html",
                destination: "/pages/api/static/home/privacyPolicy.js",
            },
            {
                source: "/public/CCPANotice.html",
                destination: "/pages/api/static/home/ccpaNotice.js",
            },
            {
                source: "/public/TERMSANDCONDITIONS.html",
                destination: "/pages/api/static/home/termsAndConditions.js",
            },
            // rewrite to Deep Sea Challenger
            {
                source: "/:path*",
                destination: `/:path*`,
            },
            {
                source: "/challenger",
                destination: `${DEEPSEACHALLENGER_HOST}/challenger`,
            },
            {
                source: "/challenger/:path*",
                destination: `${DEEPSEACHALLENGER_HOST}/challenger/:path*`,
            },
            {
                source: "/challenger(.*)",
                destination: `${DEEPSEACHALLENGER_HOST}/challenger$1`,
            },
            {
                source: "/gallery",
                destination: `/imageviewer`,
            },
            {
                source: "/mint",
                destination: `${MINT_BOWL_HOST}/mint`,
            },
            {
                source: "/mint/:path*",
                destination: `${MINT_BOWL_HOST}/mint/:path*`,
            },
            {
                source: "/mint(.*)",
                destination: `${MINT_BOWL_HOST}/mint$1`,
            },
        ];
    }, async redirects() {
        return [
            {
                // do not include basePath in redirect here
                source: "/mediakit",
                destination: "https://ordinary-marimba-a0f.notion.site/Anomura-Media-Kit-8b28620e0c90401f97035a5cca07b7ed",
                permanent: false,
            },
        ];
    },
};
