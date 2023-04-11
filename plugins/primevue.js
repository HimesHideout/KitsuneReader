import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import Card from 'primevue/card'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true})
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component("DataView", DataView)
    nuxtApp.vueApp.component("Card", Card)
})
