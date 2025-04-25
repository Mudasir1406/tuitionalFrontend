import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
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

    return config;
  },
  images: {
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
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 3600,
  },

  // Modern webpack configuration
  webpack: (config, { isServer }) => {
    // Audio handling with asset modules
    config.module.rules.push({
      test: /\.(mp3|wav)$/,
      type: "asset/resource",
      generator: {
        filename: "static/audio/[name][ext]",
      },
    });

    // Code splitting for MUI
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      cacheGroups: {
        mui: {
          test: /[\\/]node_modules[\\/]@mui[\\/]/,
          name: "mui",
          chunks: "all",
          priority: 30,
        },
      },
    };

    return config;
  },

  // Performance and security headers
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
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

export default nextConfig;
