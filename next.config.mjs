/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: async () => ([
        {
            source: "/api/(.*)",
            headers: [
                {
                    key: "Access-Control-Allow-Origin",
                    value: "*",
                }
            ],
        }
    ]),
};

export default nextConfig;
