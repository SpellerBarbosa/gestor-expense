// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  css:['~/assets/css/main.css'],
  modules:['@pinia/nuxt'],
  vite:{
    plugins:[
      tailwindcss(),
    ],
  },
  app:{
    pageTransition:{ name: 'page', mode: 'out-in'},
    head:{
      link:[
        {
          rel:"stylesheet",
          href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        }
      ]
    }
  }
});
