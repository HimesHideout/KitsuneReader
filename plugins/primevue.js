import PrimeVue from 'primevue/config'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import DataView from 'primevue/dataview'
import Dropdown from 'primevue/dropdown'
import Image from 'primevue/image'
import InputNumber from 'primevue/inputnumber'
import InputSwitch from 'primevue/inputswitch'
import InputText from 'primevue/inputtext'
import OverlayPanel from 'primevue/overlaypanel'
import Row from 'primevue/row'
import Sidebar from 'primevue/sidebar'
import Skeleton from 'primevue/skeleton'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

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
    nuxtApp.vueApp.component("Dropdown", Dropdown)
    nuxtApp.vueApp.component("Image", Image)
    nuxtApp.vueApp.component("InputNumber", InputNumber)
    nuxtApp.vueApp.component("InputSwitch", InputSwitch)
    nuxtApp.vueApp.component("InputText", InputText)
    nuxtApp.vueApp.component("OverlayPanel", OverlayPanel)
    nuxtApp.vueApp.component("Row", Row)
    nuxtApp.vueApp.component("Sidebar", Sidebar)
    nuxtApp.vueApp.component("Skeleton", Skeleton)
    nuxtApp.vueApp.use(ToastService)
    nuxtApp.vueApp.component("Toast", Toast)
})
