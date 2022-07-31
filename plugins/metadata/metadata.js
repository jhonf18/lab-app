const app = 'GIBIM'
const description = 'En FourP buscamos una mirada hacia lo diferente, transformando la educación actual y generando más oportunidades para nuestra comunidad.';

module.exports = {
  settings: {
    robots: 'index, follow',
    disallow: '/dashboard', //  separate pages with commas
    color: '#299C00',
    locale: 'es_CO',
    lang: 'es',
    // googleToken: process.env.GOOGLE_SITE_VERIFICATION_TOKEN,
  },
  tags: {
    title: app,
    titleTemplate: `%s | ${app}`,
    description,
    rating: 'general',
    keywords: ['fourp', 'educación', 'education', 'plataforma', 'cursos', 'asesorías', 'asesorias', 'trabajos', 'freelance', 'freelances', 'trabajo', 'jobs', 'oportunidades'],
    author: 'FourP',
    publisher: app,
    language: 'spanish',
  },
  og: {
    type: 'website',
    siteName: app,
    url: 'https://fourp.space',
    title: app,
    description,
    image: {
      url: 'https://fourp.blob.core.windows.net/images/assets/fourp-fb.png',
      width: 1280,
      height: 720,
      type: 'image/png'
    }
  },
  twitter: {
    creator: '@nuxt_js',
    site: '@nuxt_js',
    url: `https://twitter.com/nuxt_js`,
  },
}
