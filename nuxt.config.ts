// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxt/image-edge",
        "@sidebase/nuxt-auth",
        "@nuxt/devtools"
    ],
    typescript: {
        shim: false
    },
    css: [
        "normalize.css/normalize.css",
        "primevue/resources/themes/vela-orange/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        "primeflex/primeflex.css",
        "@splidejs/splide/css/sea-green",
        "@/assets/css/main.css"
    ],
    image: {
        provider: "cloudinary",
        cloudinary: {
            baseURL: process.env.CLOUDINARY_URL
        }
    },
    auth: {
        origin: process.env.AUTH_ORIGIN,
        provider: {
            type: "authjs"
        },
    },
    build: {
        transpile: ["primevue"]
    }
})
