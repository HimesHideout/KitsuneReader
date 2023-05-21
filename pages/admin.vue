<script setup>
definePageMeta({
  middleware: "auth"
})

import { useToast } from 'primevue/usetoast'
useHead({script: [{src: "https://upload-widget.cloudinary.com/global/all.js", type: "text/javascript"}]})

const { signOut } = useAuth()
const config = useRuntimeConfig()
const expandedRows = ref([])
const editingRows = ref([])
const editingExpandedRows = ref([])
let upload_widget = null
const toast = useToast()

let {data: chapters} = await useFetch("/api/all")


function onRowReorder(event, isPage=false) { 
  if (!isPage) {
    chapters.value = event.value
    for (let i = 0; i < chapters.value.length; i++) {
      chapters.value[i].chapter_number = i + 1
    }
  } else {
    chapters.value[event.value[0].chapter_number - 1].pages = event.value
    for (let i = 0; i < chapters.value[event.value[0].chapter_number - 1].pages.length; i++) {
      chapters.value[event.value[0].chapter_number - 1].pages[i].page_number = i + 1
    }
  }
}

function onRowEditSave(event, values=null) {
  let { newData, index } = event
  if (values == null) {
    chapters.value[index] = newData
  } else {
    values[index] = newData
  }
}

function addPage(pages) {
  pages.push({
    page_number: pages.length + 1,
    image: "",
    effects: ""
  })
}

function removePage(page, index) {
  chapters.value[page.chapter_number - 1].pages.splice(index, 1)
  for (let i = 0; i < chapters.value[page.chapter_number - 1].pages.length; i++) {
    chapters.value[page.chapter_number - 1].pages[i].page_number = i + 1
  }
}

function uploadImage() {
  upload_widget.open()
}

function uploadCallback(error, result) {
  if (error) {
    console.log(error)
    return
  } else if (result.event === "success") {
    console.log(result.info)
  }
}

onMounted(() => {
  upload_widget = cloudinary.createUploadWidget({
    cloudname: config.public.CLOUDINARY_CLOUD_NAME,
    upload_preset: config.public.CLOUDINARY_UPLOAD_PRESET,
  }, uploadCallback)

})

</script>

<template>
  <div>
    <header>
      <NuxtLink to="/cover" id="link-back-chapters" class="absolute mt-3 ml-3">
          <Button label="Sign out" @click="signOut({callbackUrl: '/'})" class="forefront" />
      </NuxtLink>
      <div class="flex align-items-center justify-content-around">
        <h2>ADMIN</h2>
      </div>
  </header>
    <DataTable :value="chapters" editMode="row" @rowReorder="onRowReorder" v-model:expandedRows="expandedRows" v-model:editingRows="editingRows" 
    @row-edit-save="onRowEditSave" dataKey="_id" stripedRows>
      <Column rowReorder></Column>
      <Column expander></Column>
      <Column field="chapter_number" header="Chapter"></Column>
      <Column field="title" header="Title">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template>
      </Column>
      <Column field="cover" header="Cover">
        <template #body="slotProps">
          <nuxt-img :src="slotProps.data.cover" sizes="5vw sm:5vw"></nuxt-img>
        </template>
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template>
      </Column>
      <Column field="type" header="Type">
        <template #editor="{ data, field }">
          <InputText v-model="data[field]"/>
        </template></Column>
      <Column field="type_number" header="Type Number">
        <template #editor="{ data, field }">
          <InputNumber v-model="data[field]" :min="1" :allowEmpty="false" :maxFractionDigits="0" showButtons />
        </template>
      </Column>
      <Column :rowEditor="true" v-if="editingExpandedRows.length == 0"></Column>
      <template #expansion="slotProps">
        <div>
          <DataTable :value="slotProps.data.pages" editMode="row" @rowReorder="(event) => onRowReorder(event, true)" v-model:editingRows="editingExpandedRows" 
          @row-edit-save="(event) => onRowEditSave(event, slotProps.data.pages)" dataKey="_id" stripedRows>
            <Column rowReorder></Column>
            <Column field="page_number" header="Page"></Column>
            <Column field="image" header="Image">
              <template #editor="{ data, field }">
                <InputText v-model="data[field]"/>
              </template>
            </Column>
            <Column field="effects" header="Effects"></Column>
            <Column :rowEditor="true" v-if="editingRows.length == 0"></Column>
            <Column>
              <template #body="slotProps">    
                <Button icon="pi pi-times" text @click="removePage(slotProps.data, slotProps.index)"/>
              </template>
            </Column>
          </DataTable>
          <Button label="Add page" @click="addPage(slotProps.data.pages)" />
        </div>
      </template>
    </DataTable>
  </div>
</template>

<style scoped></style>
