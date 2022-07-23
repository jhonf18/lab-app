import metadata from './plugins/metadata/metadata'
import metadataDynamic from './plugins/metadata/metadata-dynamic'
import metadataStatic from './plugins/metadata/metadata-static'
import sitemaps from './plugins/utils/sitemaps'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: metadata.tags.title,
    titleTemplate: metadata.tags.titleTemplate,
    htmlAttrs: {
      lang: metadata.settings.locale,
    },
    meta: [...metadataStatic(), ...metadataDynamic()],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logos/favicon.ico' },
      // add montserrat font
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600,700,800'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  loading: {
    color: '#2AB4FC',
    height: '2px',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://www.npmjs.com/package/@nuxtjs/robots
    '@nuxtjs/robots',
    // https://sitemap.nuxtjs.org/guide/setup
    '@nuxtjs/sitemap',
    'bootstrap-vue/nuxt'
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      source: './static/icon.png',
      purpose: 'any'
    },
    meta: {
      name: metadata.tags.title,
      theme_color: metadata.settings.color,
      lang: metadata.settings.lang,
      ogSiteName: metadata.og.siteName,
      ogImage: metadata.og.image.url,
      ogUrl: metadata.og.url
    },
    manifest: {
      lang: metadata.settings.lang,
      name: metadata.tags.title,
      description: metadata.tags.description,
      short_name: metadata.tags.title,
      display: 'standalone',
      start_url: '/'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
        }
      ]
    },
  },

  //  Sitemap module configuration
  sitemap: {
    path: '/sitemap.xml',
    hostname: process.env.BASE_URL,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    exclude: metadata.settings.disallow.split(','),
    sitemaps: sitemaps()
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}