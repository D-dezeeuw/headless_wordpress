// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	modules: ['@nuxtjs/apollo', '@pinia/nuxt', '@nuxtjs/tailwindcss'],
	components: true,
  apollo: {
    clients: {
			default: {
      	httpEndpoint: 'http://localhost:8888/graphql'
			}
    },
  },
  css: ["@/assets/styles/main.scss"],
	vite: {
    css: {
      preprocessorOptions: {
        scss: {
					additionalData: '@import "@/assets/styles/_variables.scss";'
        }
      }
    }
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lato' }
      ]
    }
  }
});
