import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import DataView from 'primevue/dataview'
import Card from 'primevue/card'
import Sidebar from 'primevue/sidebar'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true})
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component("DataView", DataView)
    nuxtApp.vueApp.component("Card", Card)
    nuxtApp.vueApp.component("Sidebar", Sidebar)
    nuxtApp.vueApp.component("Accordion", Accordion)
    nuxtApp.vueApp.component("AccordionTab", AccordionTab)
})
