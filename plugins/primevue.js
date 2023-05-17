import PrimeVue from 'primevue/config'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import Row from 'primevue/row'
import Sidebar from 'primevue/sidebar'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true})
    nuxtApp.vueApp.component("Accordion", Accordion)
    nuxtApp.vueApp.component("AccordionTab", AccordionTab)
    nuxtApp.vueApp.component('Button', Button)
    nuxtApp.vueApp.component("Card", Card)
    nuxtApp.vueApp.component("Column", Column)
    nuxtApp.vueApp.component("ColumnGroup", ColumnGroup)
    nuxtApp.vueApp.component("DataTable", DataTable)
    nuxtApp.vueApp.component("DataView", DataView)
    nuxtApp.vueApp.component("Row", Row)
    nuxtApp.vueApp.component("Sidebar", Sidebar)
})
