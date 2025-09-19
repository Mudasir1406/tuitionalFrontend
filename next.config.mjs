import path from "path";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  swcMinify: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
  },

  webpack: (config, { isServer }) => {
    // Audio file handling
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/audio/",
          outputPath: "static/audio/",
          name: "[name].[ext]",
          esModule: false,
        },
      },
    });

    // Tree shaking optimization
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };

      // Optimize chunk splitting
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          mui: {
            name: 'mui',
            test: /[\\/]node_modules[\\/](@mui|@emotion)[\\/]/,
            priority: 30,
            reuseExistingChunk: true,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: false,
    contentDispositionType: 'attachment',
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.icons8.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/tr**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/features", destination: "/", permanent: true },
      { source: "/community", destination: "/", permanent: true },
      { source: "/support", destination: "/", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
      { source: "/$", destination: "/", permanent: true },
      { source: "/lists", destination: "/", permanent: true },
      { source: "/company", destination: "/contact", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-modern-2", destination: "/contact", permanent: true },
      {
        source: "/sitemap_index.xml",
        destination: "/sitemap.xml",
        permanent: true,
      },
      {
        source: "/testimonials-carousel",
        destination: "/testimonials",
        permanent: true,
      },
      {
        source: "/portfolio/portfolio-title-26",
        destination: "/testimonials",
        permanent: true,
      },
      { source: "/about-us-modern-2", destination: "/about", permanent: true },
      {
        source: "/portfolio-grid-zooming",
        destination: "/testimonials",
        permanent: true,
      },
      { source: "/open-google-map", destination: "/", permanent: true },
      { source: "/home-creative-designer", destination: "/", permanent: true },
      {
        source: "/home-classic-innovation-agency",
        destination: "/",
        permanent: true,
      },
      {
        source: "/portfolio-category/category-17",
        destination: "/",
        permanent: true,
      },
      { source: "/open-vimeo-video", destination: "/", permanent: true },
      {
        source: "/portfolio-category/category-13",
        destination: "/",
        permanent: true,
      },
      { source: "/2017/08/18/post-title-5", destination: "/", permanent: true },
      {
        source: "/2017/08/31/blog-post-layout-04",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/support-2/navigating-igcse-subject-choices-a-guide-for-students-and-parents",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source: "/support-2/how-to-ace-your-exams-in-one-month",
        destination: "/",
        permanent: true,
      },
      {
        source: "/how-to-ace-your-exams-in-one-month",
        destination: "/",
        permanent: true,
      },
      {
        source:
          "/support-2/cbse-vs-igcse-unravelling-the-best-fit-for-your-education",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source:
          "/support-2/conquer-your-igcse-exams-with-confidence-essential-tips-tricks-guide-2024",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source:
          "/support-2/taking-the-igcse-in-the-uae-how-many-subjects-do-you-need",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source:
          "/support-2/igcse-exam-countdown-when-should-you-start-studying",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source:
          "/conquer-your-igcse-exams-with-confidence-essential-tips-tricks-guide-2024",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source:
          "/support-2/level-up-your-learning-a-guide-to-o-levels-and-a-levels",
        destination: "/online/caie-o-level-math-tutors",
        permanent: true,
      },
      {
        source:
          "/2024/01/26/how-to-achieve-your-best-grades-in-igcse-a-comprehensive-guide",
        destination: "/online/caie-igcse-math-tutors",
        permanent: true,
      },
      {
        source:
          "/2022/01/18/4-new-zoom-features-enhance-virtual-teaching-learning",
        destination: "/",
        permanent: true,
      },
      {
        source: "/wp-admin/admin-ajax.php",
        has: [{ type: "query", key: "action", value: "process_simple_like" }],
        destination: "/",
        permanent: true,
      },
      // Add remaining URL mappings similarly
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
