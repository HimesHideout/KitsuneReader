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
        "@/assets/css/theme.css",
        "primevue/resources/primevue.css",
        "primeicons/primeicons.css",
        "primeflex/primeflex.css",
        "@/assets/css/splide.css",
        "@/assets/css/main.css"
    ],
    image: {
        provider: "cloudinary",
        cloudinary: {
            baseURL: process.env.CLOUDINARY_URL
        }
    },
    runtimeConfig: {
        public: {
            CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
            CLOUDINARY_UPLOAD_PRESET: process.env.CLOUDINARY_UPLOAD_PRESET,
            CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY
        }
    },
    auth: {
        //origin: process.env.AUTH_ORIGIN,
    },
    build: {
        transpile: ["primevue"]
    },
    app: {
        pageTransition: {name: "page", mode: "out-in"}
    }
})
