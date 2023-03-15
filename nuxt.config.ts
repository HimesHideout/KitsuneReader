// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/image-edge",
        //"@nuxtjs/tailwindcss"
    ],
    typescript: {
        shim: false
    },
    css: [
        "normalize.css/normalize.css",
        "primevue/resources/themes/vela-orange/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css"
    ],
    build: {
        transpile: ["primevue"]
    }
})
