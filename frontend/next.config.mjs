import path from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
        additionalData: `@import "src/styles/variables.scss"; @import "src/styles/mixins.scss";`,
    },
};

export default nextConfig;
