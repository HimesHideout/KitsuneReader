// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    typescript: {
        shim: false
    },
    css: [
        "primevue/resources/themes/vela-orange/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css"
    ],
    build: {
        transpile: ["primevue"]
    }
})
