// next.config.js

import nextMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkCodeTitles from './src/lib/remark-code-title.mjs'
import rehypePresetMinify from 'rehype-preset-minify'
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['jsx', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    newNextLinkBehavior: true,
    scrollRestoration: true,
  },
}

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkCodeTitles],
    rehypePlugins: [rehypePrismPlus, rehypePresetMinify],
    providerImportSource: '@mdx-js/react',
  },
})

// Including image domain configuration
const finalConfig = {
  ...withMDX(nextConfig),
  images: {
    domains: ['yt3.googleusercontent.com'], // Add the hostname here
  },
};

export default finalConfig;
